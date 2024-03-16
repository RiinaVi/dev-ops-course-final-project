terraform {
  backend "s3" {
    bucket         = "rd-state-bucket-arina"
    dynamodb_table = "state-lock-1"
    key            = "terraform.tfstate"
    encrypt        = true
    region         = "us-east-2"
  }
}

data "aws_ami" "ubuntu_ami" {
  filter {
    name   = "state"
    values = ["available"]
  }
  filter {
    name   = "name"
    values = ["*ubuntu*"]
  }
  filter {
    name   = "architecture"
    values = ["x86_64"]
  }
  most_recent = true
}

provider "aws" {
  region = "us-east-2"
}

module "network" {
  source          = "./modules/network"
  vpc_name        = "RD-VPC"
  vpc_cidr        = "10.0.0.0/16"
  av_zone         = ["us-east-2a", "us-east-2b"]
  public_subnets  = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnets = ["10.0.3.0/24", "10.0.4.0/24"]
}

module "security" {
  source        = "./modules/security"
  name_sg       = "public-sg"
  cidr_blocks   = "0.0.0.0/0"
  ingress_ports = [22, 8080]
  vpc_id        = module.network.vpc_id
}

module "jenkins" {
  source               = "./modules/server"
  ami                  = "ami-05fb0b8c1424f266b"
  instance_type        = "t3.small"
  subnet_id            = module.network.public_subnets_ids[0]
  security_groups_name = module.security.sg_id
  instance_name        = "jenkins-instance"
  instance_env         = "jenkins"
  instance_role        = "core"
  key_name = module.security.key_name
}

module "node_app" {
  source               = "./modules/server"
  ami                  = "ami-05fb0b8c1424f266b"
  instance_type        = "t2.micro"
  subnet_id            = module.network.public_subnets_ids[0]
  security_groups_name = module.security.sg_id
  instance_name        = "node-app-instance"
  instance_env         = "node-app"
  instance_role        = "core"
  key_name = module.security.key_name

}

resource "aws_volume_attachment" "ebs_att" {
  device_name = "/dev/sdh"
  volume_id   = aws_ebs_volume.server_storage.id
  instance_id = module.node_app.instance_id
}

resource "aws_ebs_volume" "server_storage" {
  availability_zone = "us-east-2a"
  size              = 20

  tags = {
    Name = "server-storage"
  }
}

resource "local_file" "jenkins_ip" {
  content  = module.jenkins.public_ip
  filename = "jenkins_ip.txt"
}

terraform {
  backend "s3" {
    bucket         = "rd-state-bucket-arina"
    dynamodb_table = "state-lock-1"
    key            = "terraform.tfstate"
    encrypt        = true
    region         = "us-east-2"
  }
}

provider "aws" {
  region = "us-east-2"
}

module "network" {
  source          = "./modules/network"
  vpc_name        = "RD-APP-VPC"
  vpc_cidr        = "10.1.0.0/16"
  av_zone         = ["us-east-2b"]
  public_subnets  = ["10.1.1.0/24"]
  private_subnets = ["10.1.2.0/24"]
}

module "security" {
  source        = "./modules/security"
  name_sg       = "public-app-sg"
  cidr_blocks   = "0.0.0.0/0"
  ingress_ports = [22, 8080]
  vpc_id        = module.network.vpc_id
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
  key_name = "jenkins_server_2_ec2_key"
}

module "monitoring" {
  source = "./modules/monitoring"
  ec2-instance = module.node_app.instance_id
}
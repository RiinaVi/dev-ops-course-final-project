resource "aws_instance" "ec2" {
  ami = var.ami
  instance_type = var.instance_type
  subnet_id = var.subnet_id
  security_groups = [var.security_groups_name]
  key_name = var.key_name
  associate_public_ip_address = true
  tags = {
    Name = var.instance_name
    Role = var.instance_role
    Env = var.instance_env
  }
  root_block_device {
    volume_size = 20
    volume_type = "gp2"
    encrypted   = true
  }
}

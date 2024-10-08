resource "aws_security_group" "sg" {
  name = var.name_sg
  description = "Allow inbound traffic"
  vpc_id = var.vpc_id

  dynamic "ingress" {
    for_each = var.ingress_ports
    content {
      from_port = ingress.value
      to_port = ingress.value
      protocol = "tcp"
      cidr_blocks = [var.cidr_blocks]
    }
  }

  egress {
    from_port = 0
    protocol  = "-1"
    to_port   = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = {
    Name = var.name_sg
  }
}

resource "aws_key_pair" "jenkins_server_ec2_key" {
  key_name = "jenkins_server_2_ec2_key"
  public_key = file("ec2_key.pub")
}

output "public_ip" {
  value = aws_instance.ec2.public_ip
}

output "instance_id" {
  value = aws_instance.ec2.id
}

output "key_name" {
  value = aws_instance.ec2.key_name
}

output "subnet_id" {
  value = aws_instance.ec2.subnet_id
}

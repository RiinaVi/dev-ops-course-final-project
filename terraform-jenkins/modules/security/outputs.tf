output "sg_id" {
  value = aws_security_group.sg.id
}
output "key_name" {
  value = aws_key_pair.jenkins_server_ec2_key.key_name
}

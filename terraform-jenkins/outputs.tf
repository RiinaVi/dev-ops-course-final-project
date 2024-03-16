output "jenkins_ip" {
  value = module.jenkins.public_ip
}

output "vpc_id" {
  value = module.network.vpc_id
}

output "key_name" {
  value = module.jenkins.key_name
}

output "subnet_id" {
  value = module.jenkins.subnet_id
}


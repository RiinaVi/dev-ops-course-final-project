output "jenkins_ip" {
  value = module.jenkins.public_ip
}

output "node_app_ip" {
  value = module.node_app.public_ip
}

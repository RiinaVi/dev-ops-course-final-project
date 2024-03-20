# Ansible configuration for Jenkins and Node app servers

## Prerequisites

- Applied Terraform infrastructure of [terraform-jenkins](../terraform-jenkins): it will generate `jenkins_ip.txt` file with Jenkins Server IP that can be used in the `ansible-playbook` below just for convenience
- RSA key that was used to apply Terraform infrastructure
- Ansible installed;
- In [templates](./roles/jenkins-controller/templates) directory such credentials files need to be created:
  1) `aws-key.j2` containing AWS secret key
  2) `dockerhub-token.j2` with Dockerhub token
  3) `ec2-key.j2` with private rsa key for EC2 instance
  4) `github-ssh.j2` with private rsa key for accessing GitHub (public part of this key pair needs to go to GitHub directly)
  5) `github-token.j2` with GitHub personal access token generated in GitHub
  6) `postgres-password.j2` with password for the PostgresQL database
  7) `gmail-password.j2` with Gmail account app password. To create it: go to Your Google Account -> Security -> 2-Step Verification -> App passwords -> Generate
- Generate `jenkins_password` encrypted value with `ansible-vault encrypt_string` command

To start the app run:

```sh
cd ./ansible
ansible-playbook jenkins-playbook.yml  -i  inventory.ini  --extra-vars "ansible_host=$(<../terraform-jenkins/jenkins_ip.txt )"  --diff --private-key=../terraform-jenkins/ec2_key
```

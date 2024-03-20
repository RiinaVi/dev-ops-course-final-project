<!-- BEGIN_TF_DOCS -->
## Requirements

- Terraform installed
- `ec2_key` rsa key pair generated and located in the root of `terraform-jenkins` directory
- [terraform-s3](../terraform-s3) configuration applied

## Providers

| Name                                                                                                 | Version |
|------------------------------------------------------------------------------------------------------|---------|
| <a name="provider_aws"></a> [aws](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) | 5.35.0  |

## Modules

| Name                                                                | Source               | Version |
|---------------------------------------------------------------------|----------------------|---------|
| <a name="module_jenkins"></a> [server](./modules/server)            | ./modules/server     | n/a     |
| <a name="module_network"></a> [network](./modules/network)          | ./modules/network    | n/a     |
| <a name="module_security"></a> [security](./modules/security)       | ./modules/security   | n/a     |

## Resources

No resources.

## Inputs

No inputs.

## Outputs

| Name                                                             | Description                                |
|------------------------------------------------------------------|--------------------------------------------|
| <a name="jenkins_ip"></a> [jenkins_ip](./outputs.tf)             | Output of Jenkins server: public IP        |
| <a name="jenkins_full_url"></a> [jenkins_full_url](./outputs.tf) | Full URL of Jenkins server for convenience |
| <a name="vpc_id"></a> [vpc_id](./outputs.tf)                     | VPC id                                     |
| <a name="subnet_id"></a> [subnet_id](./outputs.tf)               | Subnet id                                  |
| <a name="key_name"></a> [key_name](./outputs.tf)                 | Jenkins server EC2 key name                |
<!-- END_TF_DOCS -->

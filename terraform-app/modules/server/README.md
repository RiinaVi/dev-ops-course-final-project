<!-- BEGIN_TF_DOCS -->
# Server Module

## Requirements

No requirements.

## Providers

| Name                                                                                                 | Version |
|------------------------------------------------------------------------------------------------------|---------|
| <a name="provider_aws"></a> [aws](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) | 5.35.0  |

## Modules

No modules.

## Resources

| Name                                                                                                     | Description                        |
|----------------------------------------------------------------------------------------------------------|------------------------------------|
| [aws_instance.ec2](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance) | Provides an EC2 instance resource. |
## Inputs

| Name                                                                               | Description          | Type     | Default | Required |
|------------------------------------------------------------------------------------|----------------------|----------|---------|:--------:|
| <a name="input_ami"></a> [ami](./variables.tf)                                     | AMI                  | `string` | n/a     |   yes    |
| <a name="input_instance_env"></a> [instance\_env](./variables.tf)                  | Instance Env         | `string` | n/a     |   yes    |
| <a name="input_instance_name"></a> [instance\_name](./variables.tf)                | Instance Name        | `string` | n/a     |   yes    |
| <a name="input_instance_role"></a> [instance\_role](./variables.tf)                | Instance Role        | `string` | n/a     |   yes    |
| <a name="input_instance_type"></a> [instance\_type](./variables.tf)                | Instance type        | `string` | n/a     |   yes    |
| <a name="input_security_groups_name"></a> [security\_groups\_name](./variables.tf) | Security Groups Name | `string` | n/a     |   yes    |
| <a name="input_subnet_id"></a> [subnet\_id](./variables.tf)                        | Subnet ID            | `string` | n/a     |   yes    |
| <a name="input_key_name"></a> [key_name](./variables.tf)                           | Instance key name    | `string` | n/a     |   yes    |

## Outputs

| Name                                                      | Description      |
|-----------------------------------------------------------|------------------|
| <a name="public_ip"></a> [public_ip](./outputs.tf)        | Global IP of EC2 |
| <a name="instance_id"></a> [instance\_id](./variables.tf) | EC2 id           |
| <a name="key_name"></a> [key_name](./variables.tf)        | EC2 key name     |
| <a name="subnet_id"></a> [subnet_id](./variables.tf)      | Subnet id        |
<!-- END_TF_DOCS -->

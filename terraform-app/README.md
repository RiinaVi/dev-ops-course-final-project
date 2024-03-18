<!-- BEGIN_TF_DOCS -->
## Requirements

No requirements.

## Providers

| Name                                                                                                 | Version |
|------------------------------------------------------------------------------------------------------|---------|
| <a name="provider_aws"></a> [aws](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) | 5.35.0  |

## Modules

| Name                                                              | Source               | Version |
|-------------------------------------------------------------------|----------------------|---------|
| <a name="module_jenkins"></a> [server](./modules/server)          | ./modules/server     | n/a     |
| <a name="module_network"></a> [network](./modules/network)        | ./modules/network    | n/a     |
| <a name="module_security"></a> [security](./modules/security)     | ./modules/security   | n/a     |
| <a name="module_monitoring"></a> [security](./modules/monitoring) | ./modules/monitoring | n/a     |

## Resources

No resources.

## Inputs

No inputs.

## Outputs

| Name                                                        | Description                                   |
|-------------------------------------------------------------|-----------------------------------------------|
| <a name="output_jenkins"></a> [jenkins](./outputs.tf)       | Output of Jenkins server: public IP and ID    |
<!-- END_TF_DOCS -->

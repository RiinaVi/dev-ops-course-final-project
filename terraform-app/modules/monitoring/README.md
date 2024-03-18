<!-- BEGIN_TF_DOCS -->
# Monitoring Module

## Requirements

No requirements.

## Providers

| Name                                                                                                 | Version |
|------------------------------------------------------------------------------------------------------|---------|
| <a name="provider_aws"></a> [aws](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) | 5.35.0  |

## Modules

No modules.

## Resources

| Name                                                                                                                                             | Description                                  |
|--------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------|
| [aws_cloudwatch_dashboard.app-dashboard](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_dashboard)       | Provides a CloudWatch Dashboard resource.    |
| [aws_cloudwatch_metric_alarm.ec2-cpu-alarm](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_metric_alarm) | Provides a CloudWatch Metric Alarm resource. |
| [aws_cloudwatch_log_group](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group)                     | Provides a CloudWatch Log Group resource.    |

## Inputs

| Name                                                       | Description     | Type           | Default | Required |
|------------------------------------------------------------|-----------------|----------------|---------|:--------:|
| <a name="ec2-instance"></a> [ec2-instance](./variables.tf) | EC2 instance ID | `list(string)` | n/a     |   yes    |

## Outputs

No outputs.

<!-- END_TF_DOCS -->

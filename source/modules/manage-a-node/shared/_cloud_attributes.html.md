If you're working with an Amazon EC2, Microsoft Azure, or Google Compute Engine instance, replace the `ipaddress` part of the `--attribute ipaddress` argument with the corresponding entry from this table.

| Cloud provider | Attribute | Notes |
|----------------|-----------|-------|
| EC2            | `cloud.public_hostname` | Chef sets this attribute during the bootstrap process. |
| Azure          | `cloud.public_ip`       | This is the attribute you set in the previous part when you bootstrapped your node. |
| Compute Engine | `cloud_v2.public_ipv4`  | Chef sets this attribute during the bootstrap process. |

For example, if you're working with an EC2 instance, you would specify `--attribute cloud.public_hostname`.

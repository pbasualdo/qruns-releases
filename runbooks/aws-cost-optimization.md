---
id: aws-cost-optimization
title: AWS Cost Optimization Audit
shortDescription: Monthly review to identify and reduce AWS spend.
fullDescription: >-
  Detailed checklist for identifying underutilized resources, rightsizing
  instances, and leveraging savings plans.
service: PAAS
category: Cost
type: qrun
tags:
  - aws
  - cost
  - finance
  - EC2
  - RDS
---
## 1. Review Cost Explorer

Analyze the last 30 days of spend by service.

```text
Action: Log into AWS Console -> Cost Management
Filter: Daily Spend, Group by Service
Identify top 3 cost drivers.

```

## 2. Identify Idle EC2 Instances

Find instances with < 5% CPU utilization over the last week.

```bash
# Using AWS CLI with filters (Example)
aws ec2 describe-instances --filters "Name=instance-state-name,Values=running"
# Validate metrics via CloudWatch

```

## 3. Check for Unattached EBS Volumes

List volumes that are "Available" but not attached.

```bash
aws ec2 describe-volumes --filters Name=status,Values=available

**Action**: Snapshot and delete unattached volumes older than 7 days.

```

## 4. Review Old Snapshots

Find EBS snapshots older than 90 days.

```bash
aws ec2 describe-snapshots --owner-ids self --query 'Snapshots[?StartTime<=`2023-01-01`].SnapshotId'

```

## 5. Rightsize RDS Instances

Check CloudWatch for RDS connections and CPU.

```text
If Max Connections < 10 and CPU < 10%:
Consider downgrading instance class (e.g., db.m5.xlarge -> db.m5.large).

```

## 6. Release Unassociated Elastic IPs

EIPs cost money when not attached to a running instance.

```bash
aws ec2 describe-addresses --filters "Name=association-id,Values=null"

**Action**: Release these addresses.

```

## 7. Review Data Transfer Costs

Check for high NAT Gateway or Cross-AZ traffic.

```text
Use VPC Flow Logs/Cost Explorer "Usage Type" filter.

```

## 8. Check S3 Storage Classes

Identify buckets with infrequent access patterns.

```text
Action: Enable S3 Intelligent-Tiering or Lifecycle Policies (Move to Glacier after 30 days).

```

## 9. Reserved Instances / Savings Plans

Check coverage and utilization rates.

```text
Target: > 90% Utilization for Compute Savings Plans.
If expiring in < 30 days, plan renewal.

```

## 10. Tagging Compliance

Ensure new resources are tagged with `CostCenter` and `Owner`.

```text
Run AWS Config rule: required-tags

```


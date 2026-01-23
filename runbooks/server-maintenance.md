---
title: Routine Server Maintenance
id: server-maintenance
service: Infra
category: Maintenance
tags: [linux, server, weekly]
shortDescription: Standard weekly maintenance procedure for Linux servers.
fullDescription: Comprehensive guide for performing routine maintenance on production Linux servers, including updates, cleanup, and health checks.
type: qrun
---

## 1. Verify Backup Status

Before starting any maintenance, verify that the last backup was successful.

```bash
# Check backup logs
grep "Backup Successful" /var/log/backup.log | tail -n 1
```

## 2. Check Disk Space

Ensure there is sufficient disk space on all partitions.

```bash
df -h
```

**Action**: If any partition is >90%, investigate immediately.

## 3. Review System Logs

Check for any critical errors in the system logs for the past 24 hours.

```bash
journalctl --since "24 hours ago" -p err
```

## 4. Update Package Repositories

Refresh the list of available packages.

```bash
sudo apt-get update
# OR for RHEL/CentOS
# sudo yum check-update
```

## 5. Check for Security Updates

List available security updates without installing them yet.

```bash
sudo apt list --upgradable | grep -i security
```

## 6. Clean Package Cache

Remove old package files to free up space.

```bash
sudo apt-get autoclean
```

## 7. Check Running Services

Verify that all critical services are running.

```bash
systemctl status nginx mysql redis
```

## 8. Monitor Memory Usage

Check current memory usage and swap status.

```bash
free -h
```

## 9. Check Load Average

Ensure system load is within acceptable limits.

```bash
uptime
```

## 10. Check Active Connections

Review active network connections for any suspicious activity.

```bash
ss -tunlp
```

## 11. Rotate Logs (If needed)

Manually force log rotation if disk space is tight.

```bash
sudo logrotate -f /etc/logrotate.conf
```

## 12. Final Health Check

Run a custom health check script if available.

```bash
./scripts/health-check.sh
```

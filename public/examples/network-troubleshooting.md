---
title: Network Connectivity Troubleshooting
id: network-troubleshooting
service: Network
category: Incident
tags: [network, ping, connectivity, dns]
shortDescription: Steps to diagnose and resolve network connectivity issues.
fullDescription: A guide for diagnosing network issues from a client/server perspective, covering physical, trunking, routing, and DNS.
type: qrun
---

## 1. Verify Physical Link

Ensure the network interface is up.

```bash
ip link show
```

## 2. Check IP Configuration

Verify correct IP address assignment.

```bash
ip addr show
```

## 3. Ping Local Gateway

Test connectivity to the default gateway.

```bash
ping -c 4 $(ip route | grep default | awk '{print $3}')
```

## 4. Test DNS Resolution

Check if DNS is resolving internal and external names.

```bash
nslookup google.com
```

## 5. Trace Route to Target

Identify where the packet loss is occurring.

```bash
traceroute 8.8.8.8
```

## 6. Check Listening Ports

Verify if the service port is actually open on the target.

```bash
# Example: Check port 80 on target server
nc -zv <TARGET_IP> 80
```

## 7. Review Firewall Rules

Check local iptables or ufw status.

```bash
sudo iptables -L -n
```

## 8. Check Interface Errors

Look for dropped packets or collisions.

```bash
netstat -i
```

## 9. Restart Network Service (If safe)

Attempt to refresh the network stack.

```bash
sudo systemctl restart networking
```

## 10. Capture Traffic

If issue persists, capture packets for deep analysis.

```bash
sudo tcpdump -i eth0 -w /tmp/capture.pcap
```

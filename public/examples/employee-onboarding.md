---
title: New Employee Onboarding Procedure
id: employee-onboarding
service: HR-IT
category: Access
tags: [hr, onboarding, access, jira]
shortDescription: Process for provisioning IT resources for new hires.
fullDescription: Standard procedure for creating accounts, provisioning hardware, and granting initial access to new employees.
type: qrun
---

## 1. Receive HR Request

Verify the ticket contains start date, role, and department.

```text
Check Jira Project: HR-TICKETS
Required Fields: Start Date, Role, Department, Manager
```

## 2. Create Active Directory Account

Provision the user in AD.

```powershell
New-ADUser -Name "John Doe" -GivenName "John" -Surname "Doe" -SamAccountName "jdoe" -UserPrincipalName "jdoe@company.com" -Path "OU=Users,DC=company,DC=com" -Enabled $true
```

## 3. Assign Group Memberships

Add user to default groups based on department.

```powershell
Add-ADGroupMember -Identity "Domain Users" -Members "jdoe"
Add-ADGroupMember -Identity "Dept-Engineering" -Members "jdoe"
```

## 4. Provision Email (Exchange/O365)

Create the mailbox and license the user.

```powershell
Enable-Mailbox -Identity "jdoe" -Alias "jdoe"
Set-MsolUserLicense -UserPrincipalName "jdoe@company.com" -AddLicenses "company:ENTERPRISEPACK"
```

## 5. Configure MFA

Enroll the user in Multi-Factor Authentication.

```bash
# Manual Step: Log into Azure AD Portal
# Navigate to MFA Settings -> Enable for jdoe@company.com
```

## 6. Request Hardware

Submit hardware procurement request.

```text
Laptop Model: MacBook Pro 16"
Monitor: Dell U2720Q
Accessories: Magic Keyboard, Magic Mouse
Ship To: Office / Remote Address
```

## 7. Create SaaS Accounts

Provision access to third-party tools (Slack, Jira, GitHub).

```bash
# Example API call to invite to GitHub Org
gh api orgs/my-org/invitations -f email='jdoe@company.com' -f role='direct_member'
```

## 8. Setup VPN Access

Grant permissions for VPN if remote.

```text
Add user to 'VPN-Users' AD Group.
Send config profile via secure email.
```

## 9. Schedule IT Orientation

Book a 30-min slot on the user's calendar for Day 1.

```text
Topic: IT Setup & Security Best Practices
Time: 10:00 AM on Start Date
```

## 10. Close Ticket

Update the Jira ticket with all asset tags and account details.

```text
Status: Resolved
Resolution: Done
Comment: User setup complete. Hardware shipped Tracking #123456.
```

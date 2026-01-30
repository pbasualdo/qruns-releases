---
id: database-backup
title: SQL Database Backup Procedure
shortDescription: Manual full backup procedure for SQL Server databases.
fullDescription: >-
  Steps to perform a manual full backup of a critical SQL Server database and
  verify the backup file integrity.
service: IAAS
category: Operation
type: qrun
tags:
  - sql
  - backup
  - restore
  - critical
---
## 1. Connect to Database Server

Establish a remote desktop or SQL Management Studio connection.

```bash
# Connect via SQLCMD
sqlcmd -S db-prod-01 -U sa -P <PASSWORD>



```

## 2. Check Database State

Ensure the database is online and accessible.

```sql
SELECT name, state_desc FROM sys.databases WHERE name = 'ProductionDB';



```

## 3. Verify Disk Space for Backup

Check if the target backup drive has enough free space (Estimate: 50GB).

```powershell
Get-PSDrive -Name "X"



```

## 4. Initiate Full Backup

Run the T-SQL command to start a full compressed backup.

```sql
BACKUP DATABASE [ProductionDB]
TO DISK = 'X:\Backups\ProductionDB_Full.bak'
WITH COMPRESSION, STATS = 10;



```

## 5. Monitor Progress

Ideally, monitor the output of the command above. It should show percentage completion.

## 6. Verify Backup File Creation

Confirm the file exists on the filesystem.

```powershell
Get-Item "X:\Backups\ProductionDB_Full.bak"



```

## 7. Verify Backup Integrity

Run a `RESTORE VERIFYONLY` to check for media corruption.

```sql
RESTORE VERIFYONLY
FROM DISK = 'X:\Backups\ProductionDB_Full.bak';



```

## 8. Upload to Cloud Storage (Offsite)

Copy the backup file to Azure Blob Storage / S3.

```bash
az copy "X:\Backups\ProductionDB_Full.bak" "https://myaccount.blob.core.windows.net/backups/"



```

## 9. Log Completion

Record the successful backup in the operations log.

## 10. Clean Up Old Backups

Remove backups older than 7 days from local disk.

```powershell
Get-ChildItem -Path "X:\Backups" -Recurse | Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-7) } | Remove-Item





```


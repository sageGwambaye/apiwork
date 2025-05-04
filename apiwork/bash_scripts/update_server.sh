#!/bin/bash

LOG_FILE="/var/log/update.log"
TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")

echo "[$TIMESTAMP] Starting update..." >> $LOG_FILE

sudo dnf update && sudo dnf upgrade -y

cd /home/ec2-user
if git pull >> $LOG_FILE 2>&1; then
  echo "[$TIMESTAMP] Git pull successful" >> $LOG_FILE
  sudo systemctl restart apache2
else
  echo "[$TIMESTAMP] ERROR: Git pull failed. Skipping server restart." >> $LOG_FILE
  exit 1
fi

# Web server check (e.g. Apache2)
if systemctl is-active --quiet apache2; then
  echo "[$TIMESTAMP] Apache2 is running" >> $LOG_FILE
else
  echo "[$TIMESTAMP] WARNING: Apache2 is NOT running" >> $LOG_FILE
fi

# API check
for endpoint in "students" "subjects"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/$endpoint)
  if [ "$STATUS" == "200" ]; then
    echo "[$TIMESTAMP] /$endpoint OK" >> $LOG_FILE
  else
    echo "[$TIMESTAMP] WARNING: /$endpoint returned $STATUS" >> $LOG_FILE
  fi
done

# Disk usage alert
if [ "$DISK_USAGE" -gt "$DISK_THRESHOLD" ]; then
  echo "[$TIMESTAMP] WARNING: Disk usage exceeds ${DISK_THRESHOLD}%" >> $LOG_FILE
fi

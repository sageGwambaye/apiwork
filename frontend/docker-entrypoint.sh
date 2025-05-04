
#!/bin/bash

# Replace NODE_ID variable in nginx conf
sed -i "s/\${NODE_ID}/$NODE_ID/g" /etc/nginx/conf.d/default.conf

# Execute the CMD
exec "$@"

#!/bin/sh

# entrypoint script for configuring sendmail for php
cat <<EOF >> /etc/ssmtp/ssmtp.conf
FromLineOverride=YES
mailhub=smtp.gmail.com:587
UseTLS=YES
UseSTARTTLS=YES
AuthMethod=LOGIN
AuthUser=${SSMTP_AuthUser}
AuthPass=${SSMTP_AuthPass}
root=
EOF

cat <<EOF >> /usr/local/etc/php/conf.d/mail.ini
[mail function]
sendmail_path = "/usr/sbin/ssmtp -t"
EOF

# call the original entrypoint script
docker-php-entrypoint

# call the command given in the (original) Dockerfile as CMD
exec "$@"

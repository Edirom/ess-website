#!/bin/sh

GMAIL_User=`cat $GMAIL_User_FILE`
GMAIL_Password=`cat $GMAIL_Password_FILE`
CAPTCHA_PRIVATE_KEY=`cat $CAPTCHA_PRIVATE_KEY_FILE`
CAPTCHA_PUBLIC_KEY=`cat $CAPTCHA_PUBLIC_KEY_FILE`

# entrypoint script for configuring sendmail for php
cat <<EOF >> /etc/msmtprc
account default
host smtp.gmail.com
port 587
tls on
tls_starttls on
tls_trust_file /etc/ssl/certs/ca-certificates.crt
tls_certcheck on
auth on
user ${GMAIL_User}
password ${GMAIL_Password}
from "ess@edirom.de"
logfile /var/log/msmtp.log
EOF

cat <<EOF >> /usr/local/etc/php/conf.d/mail.ini
[mail function]
sendmail_path = "/usr/bin/msmtp -t"
EOF

# inject CAPTCHA_PRIVATE_KEY into formmail.php
sed -i -e "s+.*\$RECAPTCHA_PRIVATE_KEY =.*+\$RECAPTCHA_PRIVATE_KEY = \"${CAPTCHA_PRIVATE_KEY}\";+" /var/www/html/2023/formmail.php
sed -i -e "s+data-sitekey=\"[_a-zA-Z0-9]*\"+data-sitekey=\"${CAPTCHA_PUBLIC_KEY}\"+" /var/www/html/2023/registrierung.html

# call the original entrypoint script
docker-php-entrypoint

# call the command given in the (original) Dockerfile as CMD
exec "$@"

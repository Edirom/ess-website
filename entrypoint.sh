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

# inject CAPTCHA_PRIVATE_KEY into formmail.php
sed -i -e "s+.*\$RECAPTCHA_PRIVATE_KEY =.*+\$RECAPTCHA_PRIVATE_KEY = \"${CAPTCHA_PRIVATE_KEY}\";+" /var/www/html/2019/formmail.php
sed -i -e "s+data-sitekey=\"[_a-zA-Z0-9]*\"+data-sitekey=\"${CAPTCHA_PUBLIC_KEY}\"+" /var/www/html/2019/registrierung.html

# call the original entrypoint script
docker-php-entrypoint

# call the command given in the (original) Dockerfile as CMD
exec "$@"

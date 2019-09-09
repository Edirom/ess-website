# Dockerfile for the Edirom Summer School website
# Use the nginx part for the static site (when the registration is closed)
# and the apache part (with php enabled) for the php registration form

#################
# nginx
#################
FROM nginx:alpine
LABEL maintainer="Peter Stadler for the ViFE"
COPY . /usr/share/nginx/html/ 


#################
# apache
#################
#FROM php:apache-stretch
#LABEL maintainer="Peter Stadler for the ViFE"

#ARG SSMTP_AuthUser
#ARG SSMTP_AuthPass
#ARG CAPTCHA_PUBLIC_KEY
#ARG CAPTCHA_PRIVATE_KEY

# Use the default production configuration
#RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

#WORKDIR /var/www/html
#COPY . .

#RUN apt-get update && \
#    apt-get install -y --no-install-recommends ssmtp && \
#    apt-get clean && \
#    rm -r /var/lib/apt/lists/* && \
#    mv entrypoint.sh /usr/local/bin/

#ENTRYPOINT ["entrypoint.sh"]
#CMD ["apache2-foreground"]

FROM php:apache
LABEL maintainer="Peter Stadler for the ViFE"

ARG SSMTP_AuthUser
ARG SSMTP_AuthPass

WORKDIR /var/www/html
COPY . .

RUN apt-get update && \
    apt-get install -y --no-install-recommends ssmtp && \
    apt-get clean && \
    rm -r /var/lib/apt/lists/* && \
    mv entrypoint.sh /usr/local/bin/

ENTRYPOINT ["entrypoint.sh"]
CMD ["apache2-foreground"]

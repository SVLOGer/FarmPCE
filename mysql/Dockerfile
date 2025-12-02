FROM mysql:8.0

COPY init.sql /docker-entrypoint-initdb.d/

RUN chmod +r /docker-entrypoint-initdb.d/init.sql
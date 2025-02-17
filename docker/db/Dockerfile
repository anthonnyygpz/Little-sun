FROM postgres:17.2-alpine

# Opcional: Instalar herramientas adicionales
RUN apk add --no-cache tzdata

# Establecer zona horaria
ENV TZ=UTC

# Copiar scripts de inicialización
# COPY init.sql /docker-entrypoint-initdb.d/

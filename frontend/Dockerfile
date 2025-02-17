# Usa una imagen base de Node.js con la versión LTS
FROM node:23.4.0-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración del proyecto
COPY package.json yarn.lock* package-lock.json* ./

# Instala las dependencias
RUN yarn install

# Copia el resto del código del proyecto
COPY . .

# Construye la aplicación para producción
CMD ["yarn","dev", "--host", "0.0.0.0", "--port", "5173" ]

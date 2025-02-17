# Usa una imagen base de Node.js
FROM node:23-alpine as build


# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración del proyecto
COPY package.json yarn.lock* package-lock.json* ./

# Instala las dependencias
RUN yarn install

# Copia el resto del código del proyecto
COPY . .

# Construye la aplicación para producción
RUN yarn build

# Usa una imagen ligera de Nginx para servir la aplicación
FROM nginx:alpine

# Copia los archivos construidos desde la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Expone el puerto 80 (puerto por defecto de Nginx)
EXPOSE 80

# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]

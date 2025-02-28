# Usa una imagen base de Python
FROM python:3.13-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración del proyecto
COPY requirements.txt .

# Instala las dependencias
RUN pip install  --no-cache-dir -r requirements.txt
RUN pip install psycopg2-binary==2.9.10 

# Copia el resto del código del backend
COPY . .

# Expone el puerto 8000
EXPOSE 8000

# Comando para ejecutar la aplicación
CMD ["uvicorn", "main:app"]

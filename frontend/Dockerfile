# STUFE 1: Build-Phase (Node.js)
FROM node:20-alpine AS build-stage
WORKDIR /app

# Paketabhängigkeiten kopieren und installieren
COPY package*.json ./
RUN npm install

# Restlichen Code kopieren und bauen
COPY . .
# WICHTIG: Vite brennt Umgebungsvariablen beim Build-Prozess in den Code ein.
ENV VITE_API_URL=/api
RUN npm run build

# STUFE 2: Produktions-Phase (Nginx)
FROM nginx:alpine AS production-stage

# Die gebauten Dateien aus Stufe 1 in den Nginx-Ordner kopieren
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Unsere maßgeschneiderte Nginx-Konfiguration kopieren
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
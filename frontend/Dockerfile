FROM node:20-alpine AS build-stage
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ENV VITE_API_URL=/api
RUN npm run build

FROM nginx:alpine AS production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
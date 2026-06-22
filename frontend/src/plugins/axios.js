import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default API;


  - "traefik.http.routers.p4ssword-m4nager-v2-backend.rule=Host(`p4ssword-m4nager-v2.p4s3r0.it`) && PathPrefix(`/api`)"
  - "traefik.http.routers.p4ssword-m4nager-v2-backend.tls=true"
  - "traefik.http.routers.p4ssword-m4nager-v2-backend.tls.certresolver=letsencrypt"
  - "traefik.http.routers.p4ssword-m4nager-v2-backend.service=p4ssword-m4nager-v2-backend-service"
  - "traefik.http.routers.p4ssword-m4nager-v2-backend.priority=100"

  - "traefik.http.services.p4ssword-m4nager-v2-backend-service.loadbalancer.server.port=3000"

  - "traefik.docker.network=proxy";


  - "traefik.enable=true"
  - "traefik.http.routers.p4ssword-m4nager-v2-backend.entrypoints=https"
  - "traefik.http.routers.inkloft-backend.rule=Host(`p4ssword-m4nager-v2.p4s3r0.it`) && PathPrefix(`/api`)"
  - "traefik.http.routers.p4ssword-m4nager-v2-backend.tls=true"
  - "traefik.http.routers.p4ssword-m4nager-v2.service=p4ssword-m4nager-v2-backend-service"
  - "traefik.http.services.p4ssword-m4nager-v2-backend-service.loadbalancer.server.port=3000"
  - "traefik.docker.network=proxy"
  - "traefik.http.routers.p4ssword-m4nager-v2-backend.tls.certresolver=letsencrypt";
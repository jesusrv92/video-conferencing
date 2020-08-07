FROM mhart/alpine-node:11 AS builder
WORKDIR /app
RUN npm install react-scripts -g --silent
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

FROM nginx
RUN rm /etc/nginx/conf.d/default.conf
RUN apt-get update
RUN apt-get install openssl
RUN openssl req -x509 -nodes -days 365 -subj "/C=CA/ST=QC/O=Company, Inc./CN=mydomain.com" -addext "subjectAltName=DNS:mydomain.com" -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt;
WORKDIR /app
COPY --from=builder /app/build/ .
COPY --from=builder /app/build/default.conf /etc/nginx/conf.d/

CMD ["nginx","-g","daemon off;"]
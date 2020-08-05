FROM mhart/alpine-node:11 AS builder
WORKDIR /app
RUN npm install react-scripts -g --silent
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

FROM nginx
RUN rm /etc/nginx/conf.d/default.conf
WORKDIR /app
COPY --from=builder /app/build/ .
COPY --from=builder /app/build/default.conf /etc/nginx/conf.d/

CMD ["nginx","-g","daemon off;"]
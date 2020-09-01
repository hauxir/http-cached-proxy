FROM node:12

COPY build_nginx.sh .
RUN bash build_nginx.sh

COPY . /app
COPY nginx.conf /etc/nginx/conf/nginx.conf

WORKDIR /app

RUN npm install

CMD bash entrypoint.sh

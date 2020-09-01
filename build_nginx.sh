#!/bin/bash

wget http://nginx.org/download/nginx-1.18.0.tar.gz
tar -xvf nginx-1.18.0.tar.gz
cd nginx-1.18.0
./configure --with-http_slice_module --prefix=/etc/nginx --sbin-path=/usr/sbin/nginx
make
make install

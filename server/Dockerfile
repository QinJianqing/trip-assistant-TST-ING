FROM 122.51.247.15:8888/node:12

MAINTAINER "Qin Jianqing" "13112629894@163.com"

ADD . /trip-assistant-tst-ing-server/

WORKDIR /trip-assistant-tst-ing-server

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

RUN npm config set registry http://122.51.247.16:8081/repository/itti-npm-registry/

RUN npm install

EXPOSE 8080

CMD ["npm","run","prod"]


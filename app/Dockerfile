FROM node:18

RUN mkdir /app
WORKDIR /app/app

COPY package*.json ./

COPY . .

RUN npm ci

CMD ["/bin/bash"]

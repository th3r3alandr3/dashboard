FROM node:16.14.2
ENV NODE_ENV=production

RUN apt update && apt install libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libgbm1 libasound2 libpangocairo-1.0-0 libxss1 libgtk-3-0 -y
COPY . /dashboard
WORKDIR /dashboard
RUN npm install pm2@latest -g
RUN npm install  \
RUN npm run build  \
RUN pm2 start ecosystem.config.js

EXPOSE 3000

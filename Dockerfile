FROM node:15

WORKDIR /usr/src/app

COPY ./dist ./

# RUN npm install
# RUN npm ci --only=production

# COPY . .

EXPOSE 8090

CMD [ "node", "dist/app.js" ]
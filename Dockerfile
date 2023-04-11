FROM  node:18.7.0

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

COPY .env ./

COPY tsconfig.json ./


COPY . .


RUN npm install

RUN npx prisma generate

EXPOSE 80


CMD npm start
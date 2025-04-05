FROM node:23-alpine

WORKDIR /frontend 

COPY package.json pnpm-lock.yaml* ./

RUN npm install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--host", "0.0.0.0", "--port", "3000"]

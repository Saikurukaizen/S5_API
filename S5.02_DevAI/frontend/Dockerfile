FROM node:20-alpine

# Update system packages to fix vulnerabilities
RUN apk update && apk upgrade

WORKDIR /app

COPY package*.json ./
COPY .env.local ./
COPY . ./
RUN npm ci

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
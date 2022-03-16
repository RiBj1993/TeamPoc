FROM node:14-alpine
WORKDIR ./react_client/
COPY ./react_client/package*.json ./
RUN npm install

# Actually copy the application code in
COPY ./react_client/ ./

CMD ["npm", "start"]
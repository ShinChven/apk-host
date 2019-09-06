FROM node:alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

EXPOSE 3030
ARG NODE=production
ENV NODE_ENV ${NODE}
CMD ["npm","start"]

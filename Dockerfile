FROM node:14-alpine
MAINTAINER Giuseppe Mandato <gius.mand.developer@gmail.com>

ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools
RUN apk add --no-cache bash
RUN apk add --update alpine-sdk

WORKDIR kafka-producer-stub

COPY yarn.lock yarn.lock
COPY package.json package.json
RUN yarn install --frozen-lockfile --prefer-offline

COPY LICENSE LICENSE
COPY README.md README.md

COPY lib lib
COPY index.mjs index.mjs

ENTRYPOINT ["node", "index.mjs"]

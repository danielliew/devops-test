# syntax=docker/dockerfile:1

from node:12.18.1
env NODE_ENV=production
workdir /app
copy ["package.json","package-lock.json*","./"]
run npm install --production
copy . .

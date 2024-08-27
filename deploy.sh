#!/bin/bash

cd ~/car2car || exit

git pull origin main

npm install

npm run build

pm2 restart all


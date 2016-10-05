#!/bin/bash

cd dist
sed -i '' 's/http:\/\/localhost:8080/\./g' index.html
git clone git@github.com:rickie120243/pack-electron.git
cp -r ./pack-electron/* ./
electron-packager . tibetdoc-converter-v0.0.1 --platform=darwin,win32 --arch=x64 --overwrite
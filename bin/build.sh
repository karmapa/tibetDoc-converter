#!/bin/bash

ELECTRON_VERSION=1.3.4
FOLDER_ID=0B9GraSYa0W12cjJFNFR0MEJNZmM
PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | xargs)
ZIP_IOS="tibetDoc-converter-darwin-x64-v${PACKAGE_VERSION}.zip"
ZIP_WIN="tibetDoc-converter-win32-x64-v${PACKAGE_VERSION}.zip"

rm -rf dist
webpack
cp -r package.json main.js dist/
cd dist
sed -i '' 's/http:\/\/localhost:8080/\./g' index.html

electron-packager . tibetDoc-converter --platform=darwin,win32 --arch=x64 --version="${ELECTRON_VERSION}" --app-version="${PACKAGE_VERSION}"
zip -r "${ZIP_WIN}" tibetDoc-converter-win32-x64
gdrive upload "${ZIP_WIN}" -p "${FOLDER_ID}"
zip -r "${ZIP_IOS}" tibetDoc-converter-darwin-x64
gdrive upload "${ZIP_IOS}" -p "${FOLDER_ID}"

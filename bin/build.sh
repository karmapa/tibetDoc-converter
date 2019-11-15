#!/bin/bash

ELECTRON_VERSION=1.8.8
FOLDER_ID=0B9GraSYa0W12cjJFNFR0MEJNZmM
PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | xargs)
ZIP_IOS="tibetDoc-converter-darwin-x64-v${PACKAGE_VERSION}.zip"
ZIP_WIN="tibetDoc-converter-win32-x64-v${PACKAGE_VERSION}.zip"

rm -rf dist
webpack
cp -r package.json main.js dist/
cd dist
sed -i '' 's/http:\/\/localhost:8080/\./g' index.html
sed -i '' "s/className: 'appDownLoad'/className: 'appDownLoad none'/" bundle.js
sed -i '' "s/className: 'intruTitle'/className: 'intruTitle noAppDownload'/" bundle.js

electron-packager . tibetDoc-converter --platform=darwin,win32 --arch=x64 --electron-version="${ELECTRON_VERSION}" --app-version="${PACKAGE_VERSION}"
zip -r "${ZIP_WIN}" tibetDoc-converter-win32-x64
zip -r "${ZIP_IOS}" tibetDoc-converter-darwin-x64
# gdrive upload "${ZIP_WIN}" -p "${FOLDER_ID}"
# gdrive upload "${ZIP_IOS}" -p "${FOLDER_ID}"

sed -i '' "s/className: 'appDownLoad none'/className: 'appDownLoad'/" bundle.js
sed -i '' "s/className: 'intruTitle noAppDownload'/className: 'intruTitle'/" bundle.js


#!/bin/bash

ELECTRON_VERSION=1.3.4
FOLDER_ID=0B9GraSYa0W12cjJFNFR0MEJNZmM
PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | xargs)
ZIP_IOS="tibetDoc-converter-darwin-x64-v${PACKAGE_VERSION}.zip"
ZIP_WIN="tibetDoc-converter-win32-x64-v${PACKAGE_VERSION}.zip"

gdrive list


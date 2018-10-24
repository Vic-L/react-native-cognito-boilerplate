## Usage

### Rename

Install the package [`react-native-rename`](https://github.com/junedomingo/react-native-rename) using the command:
```
npm i -g react-native-rename
```
If you have already installed, make sure to update it using
```
npm update -g react-native-rename
```

To rename, run command:
```
react-native-rename "new-app-name"
```

### Install

Run command:
```
npm install
```
This will also run the `postinstall` script after `install` to handle name changes that will [affect ios builds on Xcode 10](https://github.com/facebook/react-native/issues/21168).

## Setup

### Env files

TODO Setup `.env` files.

## Clean

* ios
```
rm -rf ./ios/build # clean ios builds
watchman watch-del-al
rm -rf $TMPDIR/react-*
lsof -ti :8081 | xargs kill -9 # kill any instance of metro bundler
react-native run-ios # start new metro bundler in current terminal
```

* android
```
cd android && ./gradlew clean && cd ..
```
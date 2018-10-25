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
react-native-rename "NewAppName"
watchman watch-del-all
```

### Install

Run command:
```
npm install
react-native start reset-cache # in another window
```
This will also run the `postinstall` script after `install` to handle name changes that will [affect ios builds on Xcode 10](https://github.com/facebook/react-native/issues/21168).

### Firebase

* Replace android keystores.
* Change `applicationId` in `android/app/build.gradle`.
* Setup project in firebase.
* Replace `google-services.json` files in `android/app/src/<BUILD_TYPE>`.

## Setup

### Env files

2 env files are assumed for this boilerplate. `.env.development` for debug build and `.env.production` for release build.

For iOS builds, this will be set when running the iOS commands in `package.json`.

For android, refer to `project.ext.envConfigFiles` in `android/app/build.gradle` for more information.

Refer to `package.json` to run the commands to start your project on the desired simulator. They are mainly
```
npm run iphoneX
npm run iphonePlus # notchless
npm run android
```
NOTE: For iOS you may wan to add the `--scheme` option in the event you are running multiple targets.

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

## Project Notes

### Launch screen

Uses [`react-native-splash-screen`](https://github.com/crazycodeboy/react-native-splash-screen).

### Android Keystores
The steps to generate keystores. The keystores are committed to git for this boilerplate.
```
# in project root directory
## debug
sudo keytool -genkey -v \
-keystore debug.keystore \
-keypass android \
-storepass android \
-alias androiddebugkey \
-keyalg RSA \
-keysize 2048 \
-validity 10000

## production
sudo keytool -genkey -v \
-keystore production.keystore \
-keypass imgonnnabethekingofpirates \
-storepass onepiecerox \
-alias reactnativecognitoboilerplate \
-keyalg RSA \
-keysize 2048 \
-validity 10000
```

Steps to get SHA of keystore:
```
# in project root directory
## debug
keytool -exportcert -list -v \
-alias androiddebugkey \
-keystore ./debug.keystore \
-storepass android

## production
keytool -exportcert -list -v \
-alias reactnativecognitoboilerplate \
-keystore ./production.keystore \
-storepass onepiecerox
```

`google-services.json` are stored in `android/app/src/<BUILD_TYPE>`, courtesy of [`react-native-config`](https://github.com/luggit/react-native-config/issues/245).
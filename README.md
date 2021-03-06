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

To change remote
```
git remote set-url origin <YOUR_REMOTE_URL>
```

### Install

Run command:
```
npm install
react-native start reset-cache # in another window
```
This will also run the `prepare` script after `install` to handle some bugs that [affect ios builds on Xcode 10](https://github.com/facebook/react-native/issues/20774).

#### react-native-vector-icons

[Installed manually on iOS](https://github.com/oblador/react-native-vector-icons).

#### fonts

Follow this [medium article](https://medium.com/react-native-training/react-native-custom-fonts-ccc9aacf9e5e).

Note that `Android will read from the filename whilst iOS will read from the full name property` of the font files, so rename to files to follow the respective full name to avoid extra conditional logic.

### Development

#### eslint

Project eslint file config is installed via the command below (credits to [this video](https://www.youtube.com/watch?v=lEtWF3_FR2w)).
```
npm install --save-dev eslint-config-rallycoding
```

Note: when installing `sublimelinter-contrib-eslint` via `Package Control`, it is not present. Use `SublimeLinter-eslint` instead.

Create `.eslintrc` file in `frontend` project directory and enter the content below.
```
{
  "extends": "rallycoding"
}
```

#### Setup

To run on iphoneX simulator, run the command `npm run iphoneX`.

To run on iphonePlus simulator, run the command `npm run iphonePlus`.

To run on device, you will need to setup the provisioning profiles first. Then, change the name in the `iphoneDevice` script in `package.json` to your device name and run the command `npm run iphoneDevice`.
To debug on device,
* Go to `RCTWebSocketExecutor.m` file in `Xcode`
* Change `localhost` in the line `NSString *host = [[_bridge bundleURL] host] ?: @"localhost";` to your local machine's ip address
* Open `http://<LOCAL_MACHINE_IP_ADDRESS>:8081/debugger-ui/` To debug
* Make sure device and local machine are on the same wifi network

To run different schemes, change the value for the `--scheme` flag in the desired script command in `package.json`.

### Firebase

* Replace android keystores.
* Change `applicationId` in `android/app/build.gradle`.
* Setup project in firebase.
* Replace `google-services.json` files in `android/app/src/<BUILD_TYPE>`. The correct build type will find the correct `google-services.json` file in the designated location namespaced by the name of the build type. This is setup by [`react-native-config`](https://github.com/luggit/react-native-config/issues/245#issuecomment-386443819).

NOTE: For each environment, the package name will be appended with `applicationIdSuffix`. Refer to `android/app/build.gradle` under `buildTypes` option to see the configurations made to each build type. Use the resultant applicationId to create your android firebase app to get the `google-services.json` file for each environment.

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
```

* android
```
cd android && ./gradlew clean && cd ..
```

## Features

These are features implemented as part of boilerplate. Remove them if your project do not need them.

### Deeplink

Setup for iOS only with reference to [react-navigation guide on deep-linking](https://reactnavigation.org/docs/en/deep-linking.html). To remove, delete the entry in `Info.plist` with the key `CFBundleURLTypes`. Its value should be an array with `CFBundleURLName` and `CFBundleURLSchemes` as `rncb`.

### Push notification

Setup for iOS. Capabilities are enabled.
Remove accordingly if not using. Remove `pem` lane in `fastlane` when building ipa.

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

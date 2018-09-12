### Clean

* ios
```
rm -rf ./ios/build # clean ios builds
watchman watch-del-al
rm -rf $TMPDIR/react-*
lsof -ti :8081 | xargs kill -9 # kill any instance of metro bundler
react-native run-ios # start new metro bundler in current terminal
```
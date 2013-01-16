## Android v0.2.1f (2012-01-14)
- Adds `libOpenAphid_JIT.so` which includes a JIT enabled JavaScriptCore.

- Improves rendering performance when a texture has premultiplied alpha values.

- Fixes a crash when loading JNI libs on Android 4.0+ devices by using toolchains from Android NDK r8c.

- Demo app has been refined

## Android v0.1.5_r1 (2012-07-09)

- Fix incorrect handling of null value in binding APIs

## Android v0.1.5 (2012-07-08)

- Support multitouch; enhanced event handling for single touch
- Dynamic binding APIs for Java to JavaScript

## Android v0.1 (2012-06-26)

- First public release.

## iOS 0.2 (2012-05-15)

- New binding system for exposing Objective-C methods to JavaScript
- Hide `constructor` when enumerating attributs of an OpenAphid JavaScript object
- Fix incorrect value of `node.onframeupdate` when it's not set; should be `null` instead of an invalid empty value
- Add a new target of `ObjCBindingTest` in [Demos](https://github.com/openaphid/Demos)
- Support Google Analytics iOS SDK in [Boilerplate-iOS](https://github.com/openaphid/Boilerplate-iOS)


## iOS 0.1.1 (2012-05-06)

- Support multitouch events: adds `multipleTouchEnabled` attribute to `Director` 
- Add `userInteractionEnabled` attribute to Node
- Fix incorrect values of `event.touches` and `event.targetTouches` in `ontouchend` callback
- Add a new constructor function to Color: `new Color(color, [alpha])` 

## iOS 0.1 (2012-04-30)

- First public release.

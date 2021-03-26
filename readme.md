## Installation:

Please follow these steps to install and start the application:

1. Download or clone the repo and navigate to the directory in Terminal.
2. Install node-modules for libraries and dependencies required in order to run the application.
3. Install iOS pod files required to run the application.
4. Run the application and, optionally, test the application.

#### To Install node-modules and pod files:

cd into app root directory and run `npm install`.  
from the app root application directory, cd into the `/ios` directory and run `npm pod install`.  

#### To run application:

Run `npm start web` in one console and leave it running.
A browser tab should launch with the Metro bundler service.
Navigate to the Metro bundler browser tab.
Click `Run on iPhone simulator` to run on iOS.
Click `Run on Android device/emulator` to run on Android.

-OR OPTIONALLY-

From the app root directory...  
Run `npm start web` in one console and leave it running.  
Run `npm run ios` or `npm run android` to run them in their native simulators/emulators.  

#### To run tests:

Run `npm test`

#### Optional:
This was a great exercise. Looking forward to any and all questions, comments, concerns, feedback, constructive criticisms, etc.

Thank you!
Aaron Southammavong

#### Running on Node v10.16.3
#### React-Native v0.63.4
#### Expo v40.0.0
#### Xcode v11.7
#### Android Studio v4.1.3

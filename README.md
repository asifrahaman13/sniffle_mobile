# Getting Started

This is the mobile application repository for healthcare management. Users can have end to end recommendation, data entry, data, graphs of their healthcare data over mobile device. Backend is done through FastAPI server. The backend repository can be found here:  https://github.com/asifrahaman13/sniffle_backend.git


<img src="https://github.com/asifrahaman13/sniffle_mobile/assets/97652031/9138b337-d56c-47cd-8137-39e86858d3d0" width="300">

<img src="https://github.com/asifrahaman13/sniffle_mobile/assets/97652031/7a35af5d-d6a7-47ea-ae61-6c4397972d4c" width="300">

<img src="https://github.com/asifrahaman13/sniffle_mobile/assets/97652031/6b7e3a1b-bc64-41d0-87fd-4340d4d646d3" width="300">

<img src="https://github.com/asifrahaman13/sniffle_mobile/assets/97652031/d8121d14-a5be-4a24-add3-d5a8f6ae76db" width="300">

<img src="https://github.com/asifrahaman13/sniffle_mobile/assets/97652031/4ef7a254-50b9-4c01-9677-d51a4e63ed2b" width="300">

<img src="https://github.com/asifrahaman13/sniffle_mobile/assets/97652031/dbb1c120-fc1a-43c8-8dde-c49248a445d7" width="300">


The backend is hoted on 

https://sniffle-backend.onrender.com


## Features implemented:
- Login to your account (Firebase)
- Enter your details through friendly conversation and our AI agents will help you to extract the qualitative as well as quantitative data from it automatically. Feel free to make mistakes. Our agent will correct you 😉
- Get personalized weeekly recommendations on your healthcare data.
- Use end to end voice to interact with the agents. 🎤
- Get graphs to visulize and monitor your data. 📈
- Monitor diabetes in real time. 📉
- Get alerts/push notifications when our agent finds abnormality in your health. 🤖
- Upload picture to get the information of the disease you are having. 🖼️


## Enter the data in the .env files  

First rename the .env.example file to .env file. Enter the necessary configuration details in the .env file.
You will need the google client id and client secret from google firebase auth. Note that the backend should be running. The backend repository can be found here: https://github.com/asifrahaman13/sniffle_backend.git. You need to forward your port. You can use the forward port feature to forward the backend port over the internet. Make sure its public.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project: [yarn is recommended]

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

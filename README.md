# Getting Started

This is the mobile application repository for healthcare management. Users can have end to end recommendation, data entry, data, graphs of their healthcare data over mobile device. Backend is done through FastAPI server. The backend repository can be found here: 

https://github.com/asifrahaman13/sniffle_backend.git

***You must run the backend repository to run this application.***



## Demos
<img src="https://github.com/asifrahaman13/sniffle_mobile/assets/97652031/01075b46-6c55-4718-98ae-c624142df962" width="300">


<img src="https://github.com/asifrahaman13/sniffle_mobile/assets/97652031/d8928cd4-ba14-4eb5-af56-7756ebf7b3ef" width="300">


<img src="https://github.com/asifrahaman13/sniffle_mobile/assets/97652031/7e8ef9e4-9750-48c9-9db0-414817131ecf" width="300">


<img src="https://github.com/asifrahaman13/sniffle_mobile/assets/97652031/1e2f9eea-14f0-41e7-ac91-6213fef432a9" width="300">


<img src="https://github.com/asifrahaman13/sniffle_mobile/assets/97652031/80e74ac2-85f8-448e-b61d-9f93b1e4ebec" width="300">


<img src="https://github.com/asifrahaman13/sniffle_mobile/assets/97652031/511ae547-2455-4533-bcfe-df321151e3c7" width="300">


<img src="https://github.com/asifrahaman13/sniffle_mobile/assets/97652031/77b4dfb6-5b27-4a49-a311-474d76b3b11b" width="300">


<img src="https://github.com/asifrahaman13/sniffle_mobile/assets/97652031/ec08baf2-59e2-4d38-829f-3ec8a57ea75e" width="300">


<img src="https://github.com/asifrahaman13/sniffle_mobile/assets/97652031/a82def97-a631-4ee7-a2d8-33d3c737b090" width="300">


## Features implemented:
- Login to your account (Firebase)
- Enter your details through friendly conversation and our AI agents will help you to extract the qualitative as well as quantitative data from it automatically. Feel free to make mistakes. Our agent will correct you 😉
- Get personalized weeekly recommendations on your healthcare data.
- Use end to end voice to interact with the agents. 🎤
- Get graphs to visulize and monitor your data. 📈
- Monitor diabetes in real time. 📉
- Get alerts/push notifications when our agent finds abnormality in your health. 🤖
- Upload picture to get the information of the disease you are having. 🖼️


## Clone

First clone the repository.

```bash
git clone https://github.com/asifrahaman13/sniffle_mobile
```

Next go to the root directory.

```bash
cd sniffle_mobile/
```

## Enter the data in the .env files  

First rename the .env.example file to .env file. Enter the necessary configuration details in the .env file.
You will need the google client id and client secret from google firebase auth. Note that the backend should be running. The backend repository can be found here: https://github.com/asifrahaman13/sniffle_backend.git. You need to forward your port. You can use the forward port feature to forward the backend port over the internet. Make sure its public. Otherwise you need to set the proper port configuration in the .env file of the mobile app.

You should enter the following data in your .env file of this application.

```bash
WEBSOCKET_URI=ws://localhost:8000
GOOGLE_CLIENT_ID="314990641802-5493c8cba51aqd8kgnqquvlma3o2r637.apps.googleusercontent.com"
BACKEND_URI="http://localhost:8000"
DEEPGRAM_API_KEY='fe6894f2a927541b88251f8a8986bf00524b1d01'
```


## Note 

**Before you start the application please start the backend application.**


## Step 1: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn run android
```

## Step 2: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project: [yarn is recommended]

```bash
# using npm
npm start

# OR using Yarn
yarn run start
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

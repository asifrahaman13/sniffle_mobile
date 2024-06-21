# Use a Node.js base image
FROM node:16

# Install Android SDK dependencies
RUN apt-get update && apt-get install -y \
    openjdk-17-jdk \
    wget \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV ANDROID_SDK_ROOT /usr/local/android-sdk-linux
ENV PATH $PATH:$ANDROID_SDK_ROOT/tools:$ANDROID_SDK_ROOT/tools/bin:$ANDROID_SDK_ROOT/platform-tools

# Download and install Android SDK
RUN wget https://dl.google.com/android/repository/commandlinetools-linux-6858069_latest.zip -O commandlinetools.zip \
    && mkdir -p $ANDROID_SDK_ROOT/cmdline-tools \
    && unzip commandlinetools.zip -d $ANDROID_SDK_ROOT/cmdline-tools \
    && rm commandlinetools.zip \
    && yes | sdkmanager --sdk_root=$ANDROID_SDK_ROOT --licenses \
    && sdkmanager --sdk_root=$ANDROID_SDK_ROOT "platforms;android-29" "build-tools;29.0.2" "platform-tools"

# Install Yarn
RUN npm install -g yarn

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your application runs on
EXPOSE 8081

# Run the application
CMD ["yarn", "start"]

# 📱 Running on Android Emulator (Step by Step)

## Prerequisites

1. **Install Android Studio**
   - Download and install [Android Studio](https://developer.android.com/studio)
   - During installation, make sure to include:
     - Android SDK
     - Android SDK Platform
     - Android Virtual Device (AVD)

2. **Set up environment variables**

   Add these lines to your `~/.zshrc` or `~/.bash_profile`:

   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   ```

   Then reload the file:

   ```bash
   source ~/.zshrc  # or source ~/.bash_profile
   ```

3. **Create an Android Emulator (AVD)**

   a. Open Android Studio

   b. Go to **Tools > Device Manager** (or click the device icon in the top bar)

   c. Click **"Create Device"**

   d. Select a device (recommended: Pixel 9 Pro XL or similar)

   e. Select a system image (recommended: API Level 34 or higher)

   f. Click **"Finish"**

## Steps to Run the App

1. **Check available emulators**

   ```bash
   $ANDROID_HOME/emulator/emulator -list-avds
   ```

   You should see a list of available emulators.

2. **Start the emulator** (from terminal or Android Studio)

   **Option A - From terminal:**

   ```bash
   $ANDROID_HOME/emulator/emulator -avd <avd_name> &
   ```

   Example:

   ```bash
   $ANDROID_HOME/emulator/emulator -avd Pixel_9_Pro_XL &
   ```

   **Option B - From Android Studio:**
   - Open Android Studio
   - Go to Device Manager
   - Click the ▶️ (play) button on the emulator you want to start

3. **Check that the emulator is connected**

   ```bash
   adb devices
   ```

   You should see something like:

   ```
   List of devices attached
   emulator-5554    device
   ```

4. **Start the Expo project**

   In the project directory:

   ```bash
   npm start
   ```

5. **Open the app in the emulator**

   **Option A - From the Expo terminal:**

   Press **`a`** in the terminal where you ran `npm start`

   **Option B - Direct command:**

   ```bash
   npm run android
   ```

   This command will build and open the app automatically in the emulator.

6. **Wait for the app to install and open**

   The first time may take a few minutes to build and install the app. You will see logs in the terminal showing the progress.

## Useful Commands

- **List available emulators:**

  ```bash
  $ANDROID_HOME/emulator/emulator -list-avds
  ```

- **Check connected devices:**

  ```bash
  adb devices
  ```

- **Restart ADB server:**

  ```bash
  adb kill-server && adb start-server
  ```

- **Clean Android build:**

  ```bash
  cd android && ./gradlew clean && cd ..
  ```

- **Reload the app without reinstalling:**

  In the emulator, press **`R`** twice quickly (shake gesture)

## Common Troubleshooting

**❌ Error: "ANDROID_HOME not set"**

- Make sure environment variables are set correctly
- Restart the terminal after adding the variables

**❌ Emulator does not appear in `adb devices`**

- Wait a few more seconds for it to finish booting
- Restart the ADB server: `adb kill-server && adb start-server`

**❌ Gradle build error**

- Make sure you have Java JDK installed (OpenJDK 17 recommended)
- Clean the build: `cd android && ./gradlew clean && cd ..`

**❌ The app is blank or not visible**

- The app requires a native build (does not work well with Expo Go)
- Use `npm run android` instead of Expo Go

**❌ Emulator is very slow**

- Enable "Hardware Acceleration" in Android Studio
- Increase the RAM assigned to the emulator (minimum 2GB recommended)

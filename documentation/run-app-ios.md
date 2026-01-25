### 🍎 Run on iOS - Physical Device Required

> **⚠️ IMPORTANT**: This app requires a **physical iPhone** for proper 3D rendering. The iOS Simulator has WebGL limitations that prevent Three.js from rendering correctly (white/blank screen).
>
> For technical details, see: [iOS Simulator WebGL Limitations](ios-simulator-webgl-limitations.md)

#### Prerequisites

1. **Install Xcode** (macOS only)
   - Download and install [Xcode](https://apps.apple.com/us/app/xcode/id497799835) from the App Store
   - Open Xcode at least once to complete the installation
   - Accept the license agreement when prompted

2. **Install Command Line Tools**

   Open Terminal and run:

   ```bash
   xcode-select --install
   ```

3. **Connect your iPhone**
   - Connect your iPhone to your Mac using a USB cable
   - Unlock your iPhone
   - If prompted, tap "Trust This Computer" on your iPhone

#### Steps to Run the App on Physical Device

#### Prerequisites

1. **Install Xcode** (macOS only)
   - Download and install [Xcode](https://apps.apple.com/us/app/xcode/id497799835) from the App Store
   - Open Xcode at least once to complete the installation
   - Accept the license agreement when prompted

2. **Install Command Line Tools**

   Open Terminal and run:

   ```bash
   xcode-select --install
   ```

3. **Verify Xcode installation**

   ```bash
   xcode-select -p
   ```

   Should output: `/Applications/Xcode.app/Contents/Developer`

#### Steps to Run the App on Physical Device

1. **Verify your iPhone is detected**

   ```bash
   xcrun xctrace list devices
   ```

   You should see your iPhone listed under "== Devices ==" with its name and iOS version.

2. **Run the app on your physical iPhone**

   **Option A - With device name (recommended):**
   1. Install the **Expo Go** app from the App Store on your iPhone.

   2. On your computer, inside the project directory, run:

   ```bash
   npm start
   ```

   3. Scan the QR code that appears in the terminal or on the Expo web page using the Expo Go app on your iPhone.

   4. The app will automatically open on your physical device and you will see the application running in real time.

   ````

   **Option B - Auto-detect (if only one device connected):**

   ```bash
   npm run ios -- --device
   ```

   ````

3. **First-time setup: Trust the developer profile**

   If this is your first time running the app on this iPhone:

   a. The app may install but not open automatically.

   b. On your iPhone, go to:
   - **Settings > General > VPN & Device Management**
   - Or **Settings > General > Device Management**

   c. Find your Apple ID or developer profile.

   d. Tap **"Trust [Your Name]"**.

   e. Tap **"Trust"** again to confirm.

4. **Wait for compilation and installation**
   - First compilation: 3-5 minutes
   - Subsequent runs: 1-2 minutes
   - The app will open automatically when ready

5. **Verify the app is running**

   You should see:
   - ✅ 3D objects rendering with realistic materials
   - ✅ Metallic and roughness effects visible
   - ✅ Smooth 60 fps performance
   - ✅ Full lighting and shadows

#### Troubleshooting Physical Device

**❌ Error: "No devices found"**

- Ensure iPhone is unlocked and connected via USB
- Tap "Trust This Computer" on the iPhone
- Run: `xcrun xctrace list devices` to verify detection

**❌ Error: "Code signing required"**

- Open: `ios/collectibol3d.xcworkspace` in Xcode
- Select the "collectibol3d" target
- Go to "Signing & Capabilities"
- Add your Apple ID and select it as Team

**❌ App installs but won't open**

- Follow the "Trust developer profile" steps above
- On iPhone: Settings > General > Device Management
- Trust your developer profile

npm run ios -- --device
**❌ Build fails with provisioning errors**

```bash
cd ios
pod deintegrate
pod install
cd ..
npm run ios -- --device
```

### ⚠️ Why Not iOS Simulator?

The iOS Simulator lacks critical WebGL extensions required by Three.js:

- Result: White/blank screen, no 3D rendering
- **Temporal Solution**: Always use a physical iPhone

**For detailed technical explanation and logs**, see:
📄 [iOS Simulator WebGL Limitations Documentation](documentation/ios-simulator-webgl-limitations.md)

#### Useful Commands for iOS

- **List all devices (physical + simulators):**

  ```bash
  xcrun xctrace list devices
  ```

- **Check connected physical devices only:**

  ```bash
  xcrun xctrace list devices | grep -A 5 "== Devices =="
  ```

- **Rebuild iOS app:**

  ```bash
  cd ios
  pod deintegrate
  pod install
  cd ..
  npm run ios -- --device
  ```

- **Clear iOS build cache:**

  ```bash
  cd ios && rm -rf build && cd ..
  ```

- **Reload app on device:**

  Shake the device or press **Cmd+R** (if connected via USB debugging)

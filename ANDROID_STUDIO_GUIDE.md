# BudgetInn Android Studio & Mobile Build Guide

This guide provides step-by-step instructions on how to transfer, compile, sync, and open the **BudgetInn** project in **Android Studio** to run on a physical device or emulator.

---

## Prerequisites

Before starting, ensure you have the following installed on your local computer:

1. **Node.js** (v16 or higher) and `npm`.
2. **Android Studio** (Electric Eel or newer recommended).
3. **Android SDK & Build Tools** (configured inside Android Studio's SDK Manager).
4. **Git** (if cloning the repository).

---

## Step 1: Clone or Transfer the Code to Your Local Machine

You can copy the project files to your local machine or clone the repository branch directly:

```bash
# Clone the repository
git clone <repository_url>

# Navigate to the project directory
cd <project_directory>
```

---

## Step 2: Install Local Dependencies

Install the project dependencies, including Vite, React, and Capacitor:

```bash
npm install
```

---

## Step 3: Build the Web Project

Compile the React frontend into static web assets (HTML, CSS, JS) inside the `dist` directory:

```bash
npm run build
```

---

## Step 4: Sync Web Assets to the Android Project

Synchronize the compiled assets in the `dist/` folder and any Capacitor plugin configurations with the native Android project:

```bash
npx cap sync
```

---

## Step 5: Open the Project in Android Studio

You can open the native Android project in Android Studio using either of the following methods:

### Method A: Via Command Line (Recommended)
Run the following Capacitor CLI command to automatically open the `android` folder in Android Studio:

```bash
npx cap open android
```

### Method B: Manually inside Android Studio
1. Launch **Android Studio**.
2. Click **Open** (or **File > Open**).
3. Navigate to the root directory of your project.
4. Select the **`android/`** folder (it has a Gradle icon) and click **OK**.
5. Wait for Android Studio to finish indexing and importing the Gradle project.

---

## Step 6: Run on an Emulator or Physical Device

### Using an Emulator:
1. In Android Studio, open the **Device Manager** (usually on the top right toolbar or via **Tools > Device Manager**).
2. Create or launch an existing Virtual Device (Emulator).
3. Select your emulator from the target device dropdown list at the top.
4. Click the green **Run (Play button)** icon or press `Shift + F10` to build and run the app.

### Using a Physical Android Device:
1. Enable **Developer Options** and **USB Debugging** on your Android device (Settings > About Phone > Tap 'Build Number' 7 times).
2. Connect your phone to your computer via a USB cable.
3. Select your physical device from the target device dropdown list in Android Studio.
4. Click the green **Run** icon to install and launch the application.

---

## Future Updates / Modifying Code

If you make modifications to the React code (`src/` folder), follow this simple workflow to reflect the changes in Android Studio:

1. Edit code in the `src/` directory.
2. Recompile the web assets:
   ```bash
   npm run build
   ```
3. Sync the updated assets to the native folder:
   ```bash
   npx cap sync
   ```
4. In Android Studio, click **Sync Project with Gradle Files** or click **Run** to reload the updated app on your emulator/device.

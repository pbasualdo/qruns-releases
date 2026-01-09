# Quick Runbooks ⚡

> A modern, efficient, and themeable runbook executor for operations teams.

Quick Runbooks is a desktop application built with Electron, React, and Vite designed to streamline the execution of operational procedures. It allows teams to aggregate runbooks from local folders and Git repositories, view them in a clean UI, and execute steps efficiently.

![Quick Runbooks Screenshot](https://via.placeholder.com/800x450?text=Quick+Runbooks+Preview) *Add a screenshot here later*

## ✨ Features

- **Multi-Format Support**: Write runbooks in **Markdown** (YAML Frontmatter) or **JSON**.
- **Source Management**: 
    - Load runbooks from multiple **Local Folders**.
    - **Git Integration**: Clone and pull public or private repositories directly within the app.
- **Search & Filter**:
    - **Tag Cloud**: Filter by tags (e.g., `SQL`, `AWS`).
    - **Categories**: Quick filters for `IAAS`, `PAAS`, etc.
    - **Search**: Full-text search on titles and descriptions.
- **Modern UI/UX**:
    - **Dark/Light Mode** with customizable **Accent Colors**.
    - **Responsive Layout**: Sidebar navigation and clean reading view.
    - **Runbook Editor**: Create and edit runbooks directly in the app.
- **Cross-Platform**: Built on Electron for Windows, macOS, and Linux support (currently optimized for Windows).

## 🚀 Installation

### Using the Installer (Windows)
1.  Download the latest `.exe` release.
2.  Run the installer `Quick Runbooks Setup x.x.x.exe`.
3.  Launch the app!
4.  (Optional) **Enable Auto-Updates**: Run `scripts/Install-Certificate.ps1` to trust the self-signed certificate.

## 🔄 Updates

You have two options to keep Quick Runbooks up to date:

### Option A: Automatic Updates (Recommended)
Requires a one-time setup to trust the application certificate.
1.  Run the helper script in PowerShell as Administrator:
    ```powershell
    .\scripts\Install-Certificate.ps1
    ```
2.  Now the app will automatically detect, download, and install updates in the background.

### Option B: Manual Updates
If you prefer not to install the certificate:
1.  When an update is released, visit the [Releases Page](https://github.com/pbasualdo/qruns/releases).
2.  Download the latest `qruns-Setup-x.x.x.exe`.
3.  Run the installer to update your current version.

### Building from Source

**Prerequisites**: Node.js v18+

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-org/qruns.git
    cd qruns
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run in Development Mode**:
    ```bash
    npm run dev
    ```

4.  **Build Native Installer**:
    ```bash
    npm run dist
    ```
    The executable will be generated in the `dist/` directory.

## 📖 Usage

### Adding Sources
1.  Click the **Folder Icon** in the top header.
2.  **Local Folder**: Click "Add" and select a directory containing `.md` or `.json` files.
3.  **Git Repo**: Enter the HTTPS URL. If private, create an access token and use the interactive terminal if prompted.

### Creating a Runbook
1.  Click the **+** button in the sidebar.
2.  Fill in the metadata (Title, Tags, Category).
3.  Add Steps (Code blocks, Text instructions).
4.  **Save**: Choose the target source folder from the dropdown.

## 🛠️ Technologies

- **Frontend**: React 19, Vite, TypeScript
- **Backend/Shell**: Electron
- **Styling**: CSS Variables, Glassmorphism design system

## 📄 License
Private / Internal Use.

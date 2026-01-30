# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.26] - 2026-01-30

### Added

- **UI**: Integrated full Syntax Highlighting (PrismJS) for 10+ languages (SQL, BASH, YAML, JSON, etc.).
- **UI**: Implemented "Smart Word Wrap" for code blocks, ensuring long commands wrap to fit the window.
- **UX**: Added contextual tag filtering in the sidebar—labels now dynamically update based on the active service (IAAS/PAAS).
- **Editor**: Added language selection dropdown for code blocks in the Runbook Editor.
- **Media**: Implemented polished Image Lightbox with background blur and "Click to expand" hint overlays.

### Fixed

- **Electron**: Fixed a critical Windows path bug in the `qrun-asset://` protocol where drive letter colons were lost.
- **UI**: Drastically reduced the size of the "Copy" button on code blocks for a cleaner, professional look.
- **Editor**: Unified image thumbnail and preview look between the viewer and the editor.

## [1.3.25] - 2026-01-23

### Fixed

- **UI**: Removed `max-width` constraint on runbook detail view, allowing it to expand fully.
- **UI**: Fixed scroll position not resetting when switching runbooks.
- **UX**: Implemented user-controlled mechanism for installing example templates (Prompt on first run + "Install Templates" button).

## [1.3.24] - 2026-01-20

### Fixed

- **Types**: Enabled TypeScript `strict` mode across the project and fixed all type errors.
- **Startup**: Resolved "blank screen" and `ReferenceError` issues caused by ESM/CommonJS import conflicts.

## [1.3.23] - 2026-01-13

### Fixed

- **Startup**: Fixed splash screen path resolution causing application hang on production builds.

## [1.3.22] - 2026-01-13

### Changed

- **Branding**: Updated application icon to "Terminal Block" design.
- **UI**: Added "Abstract QR" Splash Screen on startup.

## [1.3.21] - 2026-01-12

### Changed

- **Branding**: Updated application logo and favicon to new "Abstract QR" design.
- **Assets**: Added `logo.png` to repository root.

## [1.3.20] - 2026-01-12

### Fixed

- **Build**: Updated MSIX `displayName` to "SOH Ops Help" per Store requirements.

## [1.3.19] - 2026-01-12

### Fixed

- **Build**: Corrected MSIX `displayName` to match Store reservation "SOHOpsHelp".

## [1.3.18] - 2026-01-12

### Added

- **Build**: Added `appx` (MSIX) target for Microsoft Store submission.

## [1.3.17] - 2026-01-12

### Added

- **Docs**: Added `PRIVACY.md` statement to the repository.

## [1.3.16] - 2026-01-12

### Added

- **Build**: Added Portable executable target. Now releases include both Installer (`-nsis-`) and Portable (`-portable-`) options.

## [1.3.15] - 2026-01-12

### Changed

- **Build**: Enabled maximum compression (LZMA) and added file exclusions to reduce installer size.

## [1.3.14] - 2026-01-12

### Fixed

- **Build**: Enforced cleanup of stale build artifacts (`preload.mjs`) to ensure correct CommonJS preload loading types.

## [1.3.13] - 2026-01-10

### Fixed

- **Electron**: Resolved "Sources management is only available in the Electron app" error by fixing preload script loading (switched to CommonJS).

### Changed

- **Data**: Migrated all runbooks to new schema (`service` / `category` / `type="qrun"`).

## [1.3.12] - 2026-01-09

### Security

- **IPC**: Added strict validation for Git Clone URLs to prevent command injection.
- **IPC**: Restricted manual download links to HTTPS only.
- **Electron**: Explicitly configured security defaults (Context Isolation).

## [1.3.11] - 2026-01-09

### Fixed

- **About**: Updated "Created by" field and ensured version number is dynamic.

## [1.3.10] - 2026-01-09

### Added

- **UI**: Display Application Version dynamically in the sidebar footer.

## [1.3.9] - 2026-01-09

### Added

- **Hybrid Update Flow**: Users can now choose between "Auto-Update" (requires cert) or "Manual Download" (opens browser).

## [1.3.8] - 2026-01-09

### Changed

- **Release**: Version bump to verify auto-update functionality from public repository.

## [1.3.6] - 2026-01-09

### Changed

- **Release**: Moved release artifacts to public `qruns-releases` repository to enable auto-updates while keeping source private.

## [1.3.5] - 2026-01-09

### Changed

- **Debug**: Enabled verbose logging for auto-update troubleshooting.
- **Internal**: Added `electron-log` integration.

## [1.3.4] - 2026-01-09

### Fixed

- **UI**: Fixed layout/spacing issue in the sidebar footer (Copyright vs Check for Updates button).
- **Updates**: Added handling for "Update not available" state to prevent infinite checking.

## [1.3.3] - 2026-01-09

### Added

- **Update**: Added a manual "Check for Updates" button in the sidebar footer.

## [1.3.2] - 2026-01-09

### Added

- **Templates**: Added ability to download standard Markdown/JSON templates from Help.
- **Import**: Added Import button to load external runbook files into the source directory.

## [1.3.1] - 2026-01-09

### Changed

- **Metadata Schema Refactor**:
  - `type` is now restricted to `"qrun"`.
  - Added `service` (IAAS/PAAS/SAAS) for high-level filtering.
  - Added `category` (Database/Network/Compute/Alert) for icon visualization.
- **UI**: Updated Sidebar and Editor to reflect the new metadata schema.

## [1.3.0] - 2026-01-09

### Added

- **Auto-Update System**: Integrated `electron-updater` for in-app updates.
- **Copyright Footer**: Added copyright and update status indicator to the sidebar.
- **Quick Runbooks (`qrun`) Filtering**:
  - Repository cloning now strictly requires a `qrun` subdirectory.
  - Runbook importer now strictly filters for `"category": "qrun"`.
- **Certificate Generation**: Added `scripts/generate-cert.ps1` to easily create self-signed code signing certificates.
- **Repository Support**: Implemented shallow cloning (`--depth 1`) for faster imports.

### Changed

- **Metadata**: Updated all default runbooks to have `"category": "qrun"` to comply with new strict filtering.
- **Cleanup**: Removed unused assets (`react.svg`) and boilerplate CSS.

### Fixed

- **Build**: Resolved missing version field in `package.json`.

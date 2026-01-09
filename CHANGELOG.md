# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

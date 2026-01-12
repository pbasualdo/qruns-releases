---
description: Build and publish a new version to both private and public repositories
---

1. Check for `GH_TOKEN` environment variable. If missing, warn the user that public publishing will fail.
2. Ensure `package.json` version matches `CHANGELOG.md` recent entry.
3. Commit any pending changes with message "release: v<VERSION>".
4. Tag the commit with "v<VERSION>".
5. Push commit and tags to private repository (`git push origin main --tags` or specific remote).
6. Run `npm run dist -- -p always` to build the Windows installer and publish artifacts to **both** the public repository (`qruns-releases`) and the private repository (`qruns`) (requires `GH_TOKEN`).

# Javascript Hardening Overview
[Live website](https://javascript.denperidge.com/)

There's a bunch of security stuff going wrong with JavaScript/npm. There's a bunch of 📦 package managers and even full 🐇 runtimes and they all do different stuff.

This is a repository of info on which of those tools have the most security/hardening potential, and how to configure them to lessen security risks.

[All data files](src/_data/) are written in JSON, with the help of a [JSON Schema](src/_data/schema.json). If you have any additions, open a PR!

## Explanation
View [explanation.md](src/explanation.md) or [javascript.denperidge.com/explanation/](https://javascript.denperidge.com/explanation/)

## How-to
### Clone & build locally
Building the website locally requires [corepack](https://github.com/nodejs/corepack) to be installed. Alternatively, Nix users can use `nix-shell` to handle the corepack dependency

```bash
git clone https://github.com/Denperidge/javascript-hardening-overview.git

cd javascript-hardening-overview/

corepack enable
pnpm install

pnpm start  # Run dev server
pnpm build  # Build site to dist/
```

## License
This project is released into the public domain under the [Unlicense](LICENSE).

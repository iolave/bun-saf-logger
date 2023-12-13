# @iolave/bun-template

<p align="middle"><img src="https://bun.sh/logo-square.png" width="15%"/></p>

## Features
- Simple project structure.
- Already configured `bunfile.toml:[test]` section with coverage enabled.
- Strict `tsconfig.json` config.
- Some typescript config for vscode users that matches our `tsconfig.json`.
- `./test` example.
- `./src` example.

## How to use this template?
Create an app using this template by running 💻
```shell
bun create iolave/bun-template --name you-awesome-app
```

or... you can click one of the following links 🔗
<p align="middle">
        <a href="https://github.com/new?template_name=bun-template&template_owner=iolave"><img src="https://img.shields.io/badge/Use_this_template!-2ea44f"></a>
        <a href="https://github.com/iolave/bun-template/fork"><img src="https://img.shields.io/badge/Fork_this_template!-blueviolet"></a>
</p>

### Install dependencies
```shell
bun install
```

### Available commands
|Commands   |Info                         |
|-----------|-----------------------------|
|`bun start`|Starts the app               |
|`bun dev`  |Starts the app in dev mode   |
|`bun lint` |Runs `tsc` compiler          |
|`bun test` |Runs bun built-in testing kit|

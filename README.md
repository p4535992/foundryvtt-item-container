# Item Placeable (Placeable object for item)

![Latest Release Download Count](https://img.shields.io/github/downloads/p4535992/foundryvtt-item-placeable/latest/module.zip?color=2b82fc&label=DOWNLOADS&style=for-the-badge) 

[![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Ffoundryvtt-item-placeable&colorB=006400&style=for-the-badge)](https://forge-vtt.com/bazaar#package=foundryvtt-item-placeable) 

![Foundry Core Compatible Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2Fp4535992%2Ffoundryvtt-item-placeable%2Fmaster%2Fsrc%2Fmodule.json&label=Foundry%20Version&query=$.compatibleCoreVersion&colorB=orange&style=for-the-badge)

![Latest Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2Fp4535992%2Ffoundryvtt-item-placeable%2Fmaster%2Fsrc%2Fmodule.json&label=Latest%20Release&prefix=v&query=$.version&colorB=red&style=for-the-badge)

[![Foundry Hub Endorsements](https://img.shields.io/endpoint?logoColor=white&url=https%3A%2F%2Fwww.foundryvtt-hub.com%2Fwp-json%2Fhubapi%2Fv1%2Fpackage%2Ffoundryvtt-item-placeable%2Fshield%2Fendorsements&style=for-the-badge)](https://www.foundryvtt-hub.com/package/foundryvtt-item-placeable/)

This module add to foundry a placeable object for the item document

The starting code is shamefully based on that of the [Stairway](https://gitlab.com/SWW13/foundryvtt-stairways) module which I used as a starting point. I invite those who want modules of this type to support the authors who have provided inspiration for this module:

- [Stairway](https://gitlab.com/SWW13/foundryvtt-stairways) thanks to [SWW13](https://gitlab.com/SWW13)
- [DFreds Droppables](https://github.com/DFreds/dfreds-droppables) thanks to [DFreds](https://github.com/DFreds)

## HELP WANTED i just got stuck, the item placeable is created , but is not displayed on the canvas i don't understad why??? any help on this is more than welcome

## Installation

It's always easiest to install modules from the in game add-on browser.

To install this module manually:
1.  Inside the Foundry "Configuration and Setup" screen, click "Add-on Modules"
2.  Click "Install Module"
3.  In the "Manifest URL" field, paste the following url:
`https://raw.githubusercontent.com/p4535992/foundryvtt-item-placeable/master/src/module.json`
4.  Click 'Install' and wait for installation to complete
5.  Don't forget to enable the module in game using the "Manage Module" button

### libWrapper

This module uses the [libWrapper](https://github.com/ruipin/fvtt-lib-wrapper) library for wrapping core methods. It is a hard dependency and it is recommended for the best experience and compatibility with other modules.

# Build

## Install all packages

```bash
npm install
```
## npm build scripts

### build

will build the code and copy all necessary assets into the dist folder and make a symlink to install the result into your foundry data; create a
`foundryconfig.json` file with your Foundry Data path.

```json
{
  "dataPath": "~/.local/share/FoundryVTT/"
}
```

`build` will build and set up a symlink between `dist` and your `dataPath`.

```bash
npm run-script build
```

### NOTE:

You don't need to build the `foundryconfig.json` file you can just copy the content of the `dist` folder on the module folder under `modules` of Foundry

### build:watch

`build:watch` will build and watch for changes, rebuilding automatically.

```bash
npm run-script build:watch
```

### clean

`clean` will remove all contents in the dist folder (but keeps the link from build:install).

```bash
npm run-script clean
```
### lint and lintfix

`lint` launch the eslint process based on the configuration [here](./.eslintrc)

```bash
npm run-script lint
```

`lintfix` launch the eslint process with the fix argument

```bash
npm run-script lintfix
```

### prettier-format

`prettier-format` launch the prettier plugin based on the configuration [here](./.prettierrc)

```bash
npm run-script prettier-format
```

### package

`package` generates a zip file containing the contents of the dist folder generated previously with the `build` command. Useful for those who want to manually load the module or want to create their own release

```bash
npm run-script package
```

## [Changelog](./changelog.md)

## Issues

Any issues, bugs, or feature requests are always welcome to be reported directly to the [Issue Tracker](https://github.com/p4535992/foundryvtt-item-placeable/issues ), or using the [Bug Reporter Module](https://foundryvtt.com/packages/bug-reporter/).

## License

This package is under an [MIT](LICENSE) and the [Foundry Virtual Tabletop Limited License Agreement for module development](https://foundryvtt.com/article/license/).

- [MIT License](https://github.com/DFreds/dfreds-droppables/blob/main/LICENSE) from [DFreds Droppables](https://github.com/DFreds/dfreds-droppables)
- [MIT License](https://gitlab.com/SWW13/foundryvtt-stairways/-/blob/development/LICENSE) from [Stairway](https://gitlab.com/SWW13/foundryvtt-stairways)
## Credit

Thanks to anyone who helps me with this code! I appreciate the user community's feedback on this project!

- [Stairway](https://gitlab.com/SWW13/foundryvtt-stairways) thanks to [SWW13](https://gitlab.com/SWW13)
- [DFreds Droppables](https://github.com/DFreds/dfreds-droppables) thanks to [DFreds](https://github.com/DFreds)

Bootstrapped with League of Extraordinary FoundryVTT Developers  [foundry-vtt-types](https://github.com/League-of-Foundry-Developers/foundry-vtt-types).


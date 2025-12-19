fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## Android

### android build_debug

```sh
[bundle exec] fastlane android build_debug
```

Build APK de Debug

### android build_release

```sh
[bundle exec] fastlane android build_release
```

Build APK de Release

### android build_bundle

```sh
[bundle exec] fastlane android build_bundle
```

Build AAB (Android App Bundle) de Release

### android distribute_debug

```sh
[bundle exec] fastlane android distribute_debug
```

Distribui APK Debug para Firebase App Distribution

### android distribute_release

```sh
[bundle exec] fastlane android distribute_release
```

Distribui APK Release para Firebase App Distribution

### android distribute_new_version

```sh
[bundle exec] fastlane android distribute_new_version
```

Build e distribui com versão incrementada

### android deploy

```sh
[bundle exec] fastlane android deploy
```

Lane padrão - Build e distribui Release para Firebase

### android test

```sh
[bundle exec] fastlane android test
```

Executa testes unitários

### android lint

```sh
[bundle exec] fastlane android lint
```

Executa lint check

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).

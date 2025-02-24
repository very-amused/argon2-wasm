# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.1] - 2025-02-23
### Deprecated
- `Hash2i`, `Hash2d`, and `Hash2id` methods in favor of the new `Hash` method used with `params.mode`. Version 0.4.2 will have these methods removed.

### Added
- `Hash` method with `params.mode` for mode selection
- `Argon2.encode` for (almost) canonical Argon2 encoding. This method does not currently produce Argon2-compatible output and should not be used until v0.4.2

### Changed
- Moved from `btoa` to cs-crypto's base64 implementation
- WASM is built with the non-locking `mimalloc` allocator in pthread builds

## [0.4.0] - 2025-02-22
### Changed
- Moved from yarn to pnpm for package management, and updated all deps by reinstalling from scratch

### Added
- Support for text salts in the demo. Version 0.4.1 will be reproducible with Argon2 CLI tools.

## [0.3.5] 2023-02-28
### Added
- Support for Argon2d/Argon2id modes
- Support for multithreading in pthread builds

## [0.3.4] 2022-11-13
### Added
- License comment in js output files

## [0.3.3] 2022-11-13
### Added
- CHANGELOG.md
- Example documentation in README.md

### Changed
- `WorkerConnection.deinit` renamed to `WorkerConnection.terminate`
- Revised README.md

### Removed
- `WorkerConnection.deinit` method, use `WorkerConnection.terminate` instead
- docs_readme.md file

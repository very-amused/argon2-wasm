# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
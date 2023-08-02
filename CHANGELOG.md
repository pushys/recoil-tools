# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.3] - 2023-08-02

### Changed

- [General] Setters-only hooks do not trigger component re-render anymore.

## [2.0.2] - 2023-07-13

### Changed

- [General] `exports` property has been extended in package.json.

## [2.0.1] - 2022-08-26

### Added

- [List] Added `reset` method to the `useRecoilList` hook.
- [Dialog] Added `reset` method to the `useRecoilDialog` hook.
- [Filters] Added `reset` method to the `useRecoilFilters` hook.
- [Pagination] Added `reset` method to the `useRecoilPagination` hook.

## [2.0.0] - 2022-05-05

### Changed

- [General] Updated dev dependencies.
- [General] React 18 peer dependency.
- [General] Recoil 0.7 peer dependency.

## [1.0.1] - 2021-09-01

### Added

- [List] Added `UseRecoilListResult` type describing the result of `useRecoilList` hook.
- [Dialog] Added `UseRecoilDialogResult` type describing the result of `useRecoilDialog` hook.
- [Filters] Added `UseRecoilFiltersResult` type describing the result of `useRecoilFilters` hook.
- [Pagination] Added `UseRecoilPaginationResult` type describing the result of `useRecoilPagination` hook.

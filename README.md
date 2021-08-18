# Recoil Tools

Custom [Recoil](https://recoiljs.org) atoms and hooks for basic application needs. All atoms are wrappers around native Recoil's `atom` function,
so they enforce particular data structure depending on the atom type.

This library only includes static atoms for data storage, no asynchronous logic is involved.

## Installation

`npm i recoil-tools`

or

`yarn add recoil-tools`

## List

Useful for organizing and managing data in a list format.

### Creation and Usage

Created using `listAtom`.

```typescript
// atoms/listState.ts
import { listAtom } from 'recoil-tools';

export default listAtom<
  { id: string; email: string },
  { activeItemId: string | null }
>({
  key: 'listState',
  default: {
    data: [],
    meta: { activeItemId: null },
  },
});
```

Access to the list state and setters is provided through `useRecoilList` hook.

```typescript jsx
import { useRecoilList } from 'recoil-tools';
import listState from './atoms/listState';

function App() {
  const [state, setters] = useRecoilList(listState);
}
```

You can also use only state's `data` property:

```typescript jsx
import { useRecoilListData } from 'recoil-tools';
import listState from './atoms/listState';

function App() {
  const users = useRecoilListData(listState);
}
```

Or only `meta` property:

```typescript jsx
import { useRecoilListMeta } from 'recoil-tools';
import listState from './atoms/listState';

function App() {
  const { activeUserId } = useRecoilListMeta(listState);
}
```

Or only state setters:

```typescript jsx
import { useRecoilListSetters } from 'recoil-tools';
import listState from './atoms/listState';

function App() {
  const { push, reverse } = useRecoilListSetters(listState);
}
```

### API Reference

#### State

```typescript
type RecoilListState<T, U> = Readonly<{
  /**
   * Data items.
   */
  data: T[];
  /**
   * Any metadata related to the list.
   */
  meta: U;
}>;
```

#### Setters

```typescript
type RecoilListSetters<T, U> = Readonly<{
  /**
   * `data` property setter.
   */
  setData: SetterOrUpdater<T[]>;
  /**
   * Alias for `setData([])`.
   */
  clearData: () => void;
  /**
   * `meta` property setter.
   */
  setMeta: SetterOrUpdater<U>;
  /**
   * Inserts an arbitrary number of items at the start of the list.
   */
  unshift: (...items: T[]) => void;
  /**
   * Inserts an arbitrary number of items at the end of the list.
   */
  push: (...items: T[]) => void;
  /**
   * Clears list and inserts an arbitrary number of items.
   * Basically a combination of `clearData` and `push`.
   */
  clearPush: (...items: T[]) => void;
  /**
   * Inserts a new item if predicate doesn't return `true`.
   */
  upsert: (predicate: (item: T, index: number) => boolean, newItem: T) => void;
  /**
   * Updates an item at a particular index.
   */
  updateAt: (index: number, item: T) => void;
  /**
   * Updates first item satisfying predicate.
   */
  update: (predicate: (item: T, index: number) => boolean, newItem: T) => void;
  /**
   * Updates all items satisfying predicate.
   */
  updateAll: (
    predicate: (item: T, index: number) => boolean,
    newItem: T
  ) => void;
  /**
   * Removes an item at a particular index.
   */
  removeAt: (index: number) => void;
  /**
   * Removes first item satisfying predicate.
   */
  remove: (predicate: (item: T, index: number) => boolean) => void;
  /**
   * Removes all items satisfying predicate.
   */
  removeAll: (predicate: (item: T, index: number) => boolean) => void;
  /**
   * Works like native `Array.filter`.
   */
  filter: (
    predicate: (value: T, index: number, array: T[]) => boolean,
    thisArg?: any
  ) => void;
  /**
   * Works like native `Array.sort`.
   */
  sort: (compareFn?: (a: T, b: T) => number) => void;
  /**
   * Works like native `Array.reverse`.
   */
  reverse: () => void;
}>;
```

## Dialog

Useful for managing state of global dialog windows like app theme, language, settings or confirmation dialog.

### Creation and Usage

Created using `dialogAtom`.

```typescript
// atoms/dialogState.ts
import { dialogAtom } from 'recoil-tools';

export default dialogAtom<{ isDarkMode: boolean }>({
  key: 'dialogState',
  default: {
    isOpen: false,
    meta: { isDarkMode: false },
  },
});
```

Access to the dialog state and setters is provided through `useRecoilDialog` hook.

```typescript jsx
import { useRecoilDialog } from 'recoil-tools';
import dialogState from './atoms/dialogState';

function App() {
  const [state, setters] = useRecoilDialog(dialogState);
}
```

You can also use only state's `isOpen` property:

```typescript jsx
import { useRecoilDialogIsOpen } from 'recoil-tools';
import dialogState from './atoms/dialogState';

function App() {
  const isOpen = useRecoilDialogIsOpen(dialogState);
}
```

Or only `meta` property:

```typescript jsx
import { useRecoilDialogMeta } from 'recoil-tools';
import dialogState from './atoms/dialogState';

function App(): JSX.Element {
  const { isDarkMode } = useRecoilDialogMeta(dialogState);
}
```

Or only state setters:

```typescript jsx
import { useRecoilDialogSetters } from 'recoil-tools';
import dialogState from './atoms/dialogState';

function App() {
  const { open } = useRecoilDialogSetters(userListState);
}
```

### API Reference

#### State

```typescript
type RecoilDialogState<T> = Readonly<{
  /**
   * Dialog open state.
   */
  isOpen: boolean;
  /**
   * Any metadata related to the dialog.
   */
  meta: T;
}>;
```

#### Setters

```typescript
type RecoilDialogSetters<T> = Readonly<{
  /**
   * `isOpen` property setter.
   */
  setOpen: SetterOrUpdater<boolean>;
  /**
   * Sets `isOpen` state to `true`. Also supports setting `meta` property.
   */
  open: (meta?: T) => void;
  /**
   * Sets `isOpen` state to `false`.
   */
  close: () => void;
  /**
   * `meta` property setter.
   */
  setMeta: SetterOrUpdater<T>;
}>;
```

## Filters

Useful for storing and applying values used for filtering data.

### Creation and Usage

Created using `filtersAtom`.

```typescript
// atoms/filtersState.ts
import { filtersAtom } from 'recoil-tools';

export default filtersAtom<{ isActive: boolean; categoryId: string }>({
  key: 'filtersState',
  default: {
    isOpen: false,
    isApplied: false,
    values: { isActive: false, categoryId: '' },
  },
});
```

Access to the filters state and setters is provided through `useRecoilFilters` hook.

```typescript jsx
import { useRecoilFilters } from 'recoil-tools';
import filtersState from './atoms/filtersState';

function App() {
  const [state, setters] = useRecoilFilters(filtersState);
}
```

You can also use only state's `isOpen` property:

```typescript jsx
import { useRecoilFiltersIsOpen } from 'recoil-tools';
import filtersState from './atoms/filtersState';

function App() {
  const isOpen = useRecoilFiltersIsOpen(filtersState);
}
```

Or only `isApplied` property:

```typescript jsx
import { useRecoilFiltersIsApplied } from 'recoil-tools';
import filtersState from './atoms/filtersState';

function App() {
  const isApplied = useRecoilFiltersIsApplied(filtersState);
}
```

Or only state setters:

```typescript jsx
import { useRecoilFiltersSetters } from 'recoil-tools';
import filtersState from './atoms/filtersState';

function App() {
  const { apply } = useRecoilFiltersSetters(filtersState);
}
```

### API Reference

#### State

```typescript
type RecoilFiltersState<T extends Record<string, any>> = Readonly<{
  /**
   * Filters open state.
   */
  isOpen: boolean;
  /**
   * Whether filters have been applied.
   */
  isApplied: boolean;
  /**
   * Filter values object.
   */
  values: T;
}>;
```

#### Setters

```typescript
type RecoilFiltersSetters<T extends Record<string, any>> = Readonly<{
  /**
   * `isOpen` property setter.
   */
  setOpen: SetterOrUpdater<boolean>;
  /**
   * `isApplied` property setter.
   */
  setApplied: SetterOrUpdater<boolean>;
  /**
   * Sets `isOpen` property to `true`.
   */
  open: () => void;
  /**
   * Sets `isOpen` property to `false`.
   */
  close: () => void;
  /**
   * Applies values by setting `values` property
   * and `isApplied` property to `true`.
   */
  apply: SetterOrUpdater<T>;
}>;
```

## Pagination

Static storage of pagination state.

### Creation and Usage

Created using `paginationAtom`.

```typescript
// atoms/paginationState.ts
import { paginationAtom } from 'recoil-tools';

export default paginationAtom({
  key: 'paginationState',
  default: {
    total: 0,
    page: 1,
    limit: 10,
    offset: 0,
    meta: undefined,
  },
});
```

Access to the pagination state and setters is provided through `useRecoilPagination` hook.

```typescript jsx
import { useRecoilPagination } from 'recoil-tools';
import paginationState from './atoms/paginationState';

function App() {
  const [state, setters] = useRecoilPagination(paginationState);
}
```

You can also use only state setters:

```typescript jsx
import { useRecoilPaginationSetters } from 'recoil-tools';
import paginationState from './atoms/paginationState';

function App() {
  const { setPage, setLimit } = useRecoilPaginationSetters(paginationState);
}
```

### API Reference

#### State

```typescript
type RecoilPaginationState<T> = Readonly<{
  /**
   * Total number of records.
   */
  total: number;
  /**
   * Current page number.
   */
  page: number;
  /**
   * Number of records per page.
   */
  limit: number;
  /**
   * Automatically calculated property based on `page` and `limit`
   * that shows current offset in records.
   */
  offset: number;
  /**
   * Any metadata related to the pagination.
   */
  meta: T;
}>;
```

#### Setters

```typescript
type RecoilPaginationSetters<T> = Readonly<{
  /**
   * `total` property setter.
   */
  setTotal: SetterOrUpdater<number>;
  /**
   * `page` property setter.
   */
  setPage: SetterOrUpdater<number>;
  /**
   * `limit` property setter.
   */
  setLimit: SetterOrUpdater<number>;
  /**
   * `meta` property setter.
   */
  setMeta: SetterOrUpdater<T>;
}>;
```

# Recoil Tools

Custom [Recoil](https://recoiljs.org) atoms and hooks for basic application needs. All atoms are wrappers around native Recoil's `atom` function,
except the custom ones enforce particular data structure depending on the atom type.

## Installation

`npm i recoil-tools`

or

`yarn add recoil-tools`

## List

Used for organizing and managing data in a list format.

### Creation and Usage

Created using `listAtom`. The state has two properties: `data` (array of list items) and `meta` (anything related to the list, i.e. current active item ID, pending item ID etc.).

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

function Users(): JSX.Element {
  const [state, setters] = useRecoilList(listState);

  return (
    <ul>
      {state.data.map((user) => (
        <li key={user.id}>{user.email}</li>
      ))}
    </ul>
  );
}
```

You can also use only state's `data` property:

```typescript jsx
import { useRecoilListData } from 'recoil-tools';
import listState from './atoms/listState';

function Users(): JSX.Element {
  const users = useRecoilListData(listState);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.email}</li>
      ))}
    </ul>
  );
}
```

Or only `meta` property:

```typescript jsx
import { useRecoilListMeta } from 'recoil-tools';
import listState from './atoms/listState';

function ActiveUser(): JSX.Element {
  const { activeUserId } = useRecoilListMeta(listState);

  return <div>Active user ID: {activeUserId}</div>;
}
```

Or only state setters:

```typescript jsx
import { useRecoilListSetters } from 'recoil-tools';
import listState from './atoms/listState';

function Users(): JSX.Element {
  const { reverse } = useRecoilListSetters(listState);

  return (
    <div>
      <button onClick={reverse}>Reverse items</button>
    </div>
  );
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
   * Sets `data` property.
   */
  setData: SetterOrUpdater<T[]>;
  /**
   * Alias for `setData([])`.
   */
  clearData: () => void;
  /**
   * Sets `meta` property.
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
   * Reverse order of list items.
   */
  reverse: () => void;
}>;
```

## Dialog

Useful for managing state of global dialog windows like app theme, language, settings or confirmation dialog.

### Creation and Usage

Created using `dialogAtom`. The state has two properties: `isOpen` (dialog open status) and `meta` (any metadata related to the dialog).

```typescript
// atoms/settingsDialogState.ts
import { dialogAtom } from 'recoil-tools';

export default dialogAtom<{ isDarkMode: boolean }>({
  key: 'settingsDialogState',
  default: {
    isOpen: false,
    meta: { isDarkMode: false },
  },
});
```

Access to the dialog state and setters is provided through `useRecoilDialog` hook.

```typescript jsx
import { useRecoilDialog } from 'recoil-tools';
import settingsDialogState from './atoms/settingsDialogState';

function SettingsDialog(): JSX.Element {
  const [state, setters] = useRecoilDialog(settingsDialogState);

  return (
    <Dialog open={state.isOpen} onClose={setters.close}>
      Dark mode: {state.meta.isDarkMode ? 'yes' : 'no'}
    </Dialog>
  );
}
```

You can also use only state's `isOpen` property:

```typescript jsx
import { useRecoilDialogIsOpen } from 'recoil-tools';
import settingsDialogState from './atoms/settingsDialogState';

function SettingsDialog(): JSX.Element {
  const isOpen = useRecoilDialogIsOpen(settingsDialogState);

  return <Dialog open={isOpen} {...props} />;
}
```

Or only `meta` property:

```typescript jsx
import { useRecoilDialogMeta } from 'recoil-tools';
import settingsDialogState from './atoms/settingsDialogState';

function Anywhere(): JSX.Element {
  const { isDarkMode } = useRecoilDialogMeta(settingsDialogState);

  return <div>Dark mode: {isDarkMode ? 'yes' : 'no'}</div>;
}
```

Or only state setters:

```typescript jsx
import { useRecoilDialogSetters } from 'recoil-tools';
import settingsDialogState from './atoms/settingsDialogState';

function Anywhere(): JSX.Element {
  const { open } = useRecoilDialogSetters(userListState);

  return (
    <div>
      <button onClick={open}>Open dialog</button>
    </div>
  );
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
   * Sets `isOpen` state.
   */
  setOpen: SetterOrUpdater<boolean>;
  /**
   * Sets `isOpen` state to `true` Also supports setting `meta` property.
   */
  open: (meta?: T) => void;
  /**
   * Sets `isOpen` state to `false`.
   */
  close: () => void;
  /**
   * Sets `meta` property.
   */
  setMeta: SetterOrUpdater<T>;
}>;
```

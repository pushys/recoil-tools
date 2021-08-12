# Recoil Tools

Custom Recoil atoms and hooks with predefined state structure for different types of data.

## List

Used for organizing and managing data in a list format.

### Creation and Usage

Created using `listAtom` function similarly to a regular Recoil atom, except list enforces its own state structure.

###### Creation

```typescript
import { listAtom } from 'recoil-tools';

const userListState = listAtom<
  { id: string; email: string },
  { activeItemId: string | null }
>({
  key: 'userListState',
  default: {
    data: [],
    meta: { activeItemId: null },
  },
});
```

###### Usage

```typescript jsx
import { useRecoilList } from 'recoil-tools';

function Users(): JSX.Element {
  const [state, setters] = useRecoilList(userListState);

  return (
    <ul>
      {state.data.map((user) => (
        <li key={user.id}>{user.email}</li>
      ))}
    </ul>
  );
}
```

You can also use only list state's `data` property:

```typescript jsx
import { useRecoilListData } from 'recoil-tools';

function Users(): JSX.Element {
  const users = useRecoilListData(userListState);

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

function Users(): JSX.Element {
  const { activeUserId } = useRecoilListMeta(userListState);

  return <div>Active user ID: {activeUserId}</div>;
}
```

Or only state setters:

```typescript jsx
import { useRecoilListSetters } from 'recoil-tools';

function Users(): JSX.Element {
  const { reverse } = useRecoilListSetters(userListState);

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
   * Any meta data related to the list.
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

Used for storing state of modal windows and dialogs.

### Creation and Usage

Created using `dialogAtom` function similarly to a regular Recoil atom, except dialog enforces its own state structure.

###### Creation

```typescript
import { dialogAtom } from 'recoil-tools';

const settingsDialogState = dialogAtom<{ isDarkMode: boolean }>({
  key: 'settingsDialogState',
  default: {
    isOpen: false,
    meta: { isDarkMode: false },
  },
});
```

###### Usage

```typescript jsx
import { useRecoilList } from 'recoil-tools';

function SettingsDialog(): JSX.Element {
  const [state, setters] = useRecoilDialog(settingsDialogState);

  return (
    <Dialog open={state.isOpen} onClose={setters.close}>
      Dark mode: {state.meta.isDarkMode ? 'yes' : 'no'}
    </Dialog>
  );
}
```

You can also use only dialog state's `isOpen` property:

```typescript jsx
import { useRecoilDialogIsOpen } from 'recoil-tools';

function SettingsDialog(): JSX.Element {
  const isOpen = useRecoilDialogIsOpen(settingsDialogState);

  return (
    <Dialog open={isOpen} {...props} />
  );
}
```

Or only `meta` property:

```typescript jsx
import { useRecoilDialogMeta } from 'recoil-tools';

function Anywhere(): JSX.Element {
  const { isDarkMode } = useRecoilDialogMeta(settingsDialogState);

  return <div>Dark mode: {isDarkMode ? 'yes' : 'no'}</div>;
}
```

Or only state setters:

```typescript jsx
import { useRecoilListSetters } from 'recoil-tools';

function Users(): JSX.Element {
  const { reverse } = useRecoilListSetters(userListState);

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
type RecoilDialogState<T> = Readonly<{
  /**
   * Dialog open state.
   */
  isOpen: boolean;
  /**
   * Any meta data related to the dialog.
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
   * Sets `isOpen` state to `true`.
   */
  open: () => void;
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

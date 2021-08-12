import React from 'react';
import {
  atom,
  RecoilState,
  AtomOptions,
  useRecoilState,
  useRecoilValue,
  SetterOrUpdater,
} from 'recoil';

/**
 * Recoil List state.
 */
export type RecoilListState<T, U> = Readonly<{
  /**
   * Data items.
   */
  data: T[];
  /**
   * Any meta data related to the list.
   */
  meta: U;
}>;

/**
 * Result of the `useListRecoilState` hook.
 */
export type RecoilListSetters<T, U> = Readonly<{
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

/**
 * Recoil List atom.
 *
 * @param options - List atom options.
 *
 * @example
 * const listState = listAtom({
 *   key: 'listState',
 *   default: {
 *     data: [],
 *     meta: undefined,
 *   },
 * });
 */
export const listAtom = <T, U>(
  options: AtomOptions<RecoilListState<T, U>>
): RecoilState<RecoilListState<T, U>> => {
  return atom(options);
};

/**
 * Main hook for `listAtom` usage.
 *
 * @param recoilListState - Recoil List state.
 */
export const useRecoilList = <T, U>(
  recoilListState: RecoilState<RecoilListState<T, U>>
): [RecoilListState<T, U>, RecoilListSetters<T, U>] => {
  const [state, setState] = useRecoilState(recoilListState);

  const setData = React.useCallback<RecoilListSetters<T, U>['setData']>(
    (valOrUpdater) => {
      setState((prevState) => ({
        ...prevState,
        data:
          typeof valOrUpdater === 'function'
            ? valOrUpdater(prevState.data)
            : valOrUpdater,
      }));
    },
    [setState]
  );

  const setMeta = React.useCallback<RecoilListSetters<T, U>['setMeta']>(
    (valOrUpdater) => {
      setState((prevState) => ({
        ...prevState,
        meta:
          typeof valOrUpdater === 'function'
            ? (valOrUpdater as any)(prevState.meta)
            : valOrUpdater,
      }));
    },
    [setState]
  );

  const clearData = React.useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      data: [],
    }));
  }, [setState]);

  const unshift = React.useCallback<RecoilListSetters<T, U>['unshift']>(
    (...data) =>
      setState((prevState) => ({
        ...prevState,
        data: data.concat(prevState.data),
      })),
    [setState]
  );

  const push = React.useCallback<RecoilListSetters<T, U>['push']>(
    (...data) =>
      setState((prevState) => ({
        ...prevState,
        data: prevState.data.concat(data),
      })),
    [setState]
  );

  const updateAt = React.useCallback<RecoilListSetters<T, U>['updateAt']>(
    (index, item) => {
      setState((prevState) => ({
        ...prevState,
        data: updateArrayItemAt(prevState.data, index, item),
      }));
    },
    [setState]
  );

  const update = React.useCallback<RecoilListSetters<T, U>['update']>(
    (predicate, newItem) =>
      setState((prevState) => {
        const index = prevState.data.findIndex(predicate);

        return {
          ...prevState,
          data: updateArrayItemAt(prevState.data, index, newItem),
        };
      }),
    [setState, updateAt]
  );

  const updateAll = React.useCallback<RecoilListSetters<T, U>['updateAll']>(
    (predicate, newItem) =>
      setState((prevState) => ({
        ...prevState,
        data: prevState.data.map((prevItem, i) =>
          predicate(prevItem, i) ? newItem : prevItem
        ),
      })),
    [setState]
  );

  const removeAt = React.useCallback<RecoilListSetters<T, U>['removeAt']>(
    (index) => {
      setState((prevState) => ({
        ...prevState,
        data: removeArrayItemAt(prevState.data, index),
      }));
    },
    [setState]
  );

  const remove = React.useCallback<RecoilListSetters<T, U>['remove']>(
    (predicate) =>
      setState((prevState) => {
        const index = prevState.data.findIndex(predicate);

        return {
          ...prevState,
          data: removeArrayItemAt(prevState.data, index),
        };
      }),
    [setState, updateAt]
  );

  const removeAll = React.useCallback<RecoilListSetters<T, U>['removeAll']>(
    (predicate) =>
      setState((prevState) => ({
        ...prevState,
        data: prevState.data.filter((item, i) => !predicate(item, i)),
      })),
    [setState]
  );

  const filter = React.useCallback<RecoilListSetters<T, U>['filter']>(
    (predicate, thisArg) =>
      setState((prevState) => ({
        ...prevState,
        data: prevState.data.filter(predicate, thisArg),
      })),
    [setState]
  );

  const sort = React.useCallback<RecoilListSetters<T, U>['sort']>(
    (compareFn) =>
      setState((prevState) => ({
        ...prevState,
        data: prevState.data.slice().sort(compareFn),
      })),
    [setState]
  );

  const reverse = React.useCallback<RecoilListSetters<T, U>['reverse']>(
    () =>
      setState((prevState) => ({
        ...prevState,
        data: prevState.data.slice().reverse(),
      })),
    [setState]
  );

  return [
    state,
    {
      setData,
      setMeta,
      clearData,
      push,
      unshift,
      updateAt,
      update,
      updateAll,
      removeAt,
      remove,
      removeAll,
      filter,
      sort,
      reverse,
    },
  ];
};

/**
 * Returns only `data` property from the list state.
 *
 * @param recoilListState - Recoil List state.
 *
 * @example
 * const data = useRecoilListData(listState);
 */
export const useRecoilListData = <T>(
  recoilListState: RecoilState<RecoilListState<T, any>>
): T[] => {
  const state = useRecoilValue<RecoilListState<T, any>>(recoilListState);
  return state.data;
};

/**
 * Returns only `meta` property from the list state.
 *
 * @param recoilListState - Recoil List state.
 *
 * @example
 * const meta = useRecoilListMeta(listState);
 */
export const useRecoilListMeta = <T>(
  recoilListState: RecoilState<RecoilListState<any, T>>
): T => {
  const state = useRecoilValue<RecoilListState<any, T>>(recoilListState);
  return state.meta;
};

/**
 * Returns only list state setters.
 *
 * @param recoilListState - Recoil List state.
 *
 * @example
 * const { push, update } = useRecoilListSetters(listState);
 */
export const useRecoilListSetters = <T, U>(
  recoilListState: RecoilState<RecoilListState<T, U>>
): RecoilListSetters<T, U> => {
  const [, setters] = useRecoilList<T, U>(recoilListState);
  return setters;
};

/**
 * Util for updating array item at particular index.
 *
 * @param array
 * @param index
 * @param item
 */
const updateArrayItemAt = <T>(array: T[], index: number, item: T): T[] => {
  if (index < 0) return array;

  const arr = array.slice();

  arr[index] = item;

  return arr;
};

/**
 * Util for removing array item at particular index.
 *
 * @param array
 * @param index
 */
const removeArrayItemAt = <T>(array: T[], index: number): T[] => {
  if (index < 0) return array;

  const arr = array.slice();

  arr.splice(index, 1);

  return arr;
};

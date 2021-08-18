import React from 'react';
import {
  atom,
  RecoilState,
  AtomOptions,
  useRecoilState,
  SetterOrUpdater,
} from 'recoil';
import { executeUpdater } from './utils';

/**
 * Recoil Pagination state.
 */
export type RecoilPaginationState<T> = Readonly<{
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
   * that shows current offset in records number.
   */
  offset: number;
  /**
   * Any metadata related to the pagination.
   */
  meta: T;
}>;

/**
 * Result of the `useRecoilPagination` hook.
 */
export type RecoilPaginationSetters<T> = Readonly<{
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

/**
 * Recoil Pagination atom.
 *
 * @param options - Pagination atom options.
 *
 * @example
 * const paginationState = paginationAtom({
 *   key: 'paginationState',
 *   default: {
 *     total: 0,
 *     page: 1,
 *     limit: 10,
 *     offset: 0,
 *     meta: undefined,
 *   },
 * });
 */
export const paginationAtom = <T>(
  options: AtomOptions<RecoilPaginationState<T>>
): RecoilState<RecoilPaginationState<T>> => {
  return atom<RecoilPaginationState<T>>(options);
};

/**
 * Main hook for `paginationAtom` usage.
 *
 * @param recoilPaginationState - Recoil Pagination state.
 */
export const useRecoilPagination = <T>(
  recoilPaginationState: RecoilState<RecoilPaginationState<T>>
): [RecoilPaginationState<T>, RecoilPaginationSetters<T>] => {
  const [state, setState] = useRecoilState(recoilPaginationState);

  const setTotal = React.useCallback<RecoilPaginationSetters<T>['setTotal']>(
    (valOrUpdater) => {
      setState((prevState) => ({
        ...prevState,
        total: executeUpdater(valOrUpdater, prevState.total),
      }));
    },
    [setState]
  );

  const setPage = React.useCallback<RecoilPaginationSetters<T>['setPage']>(
    (valOrUpdater) => {
      setState((prevState) => {
        const page = executeUpdater(valOrUpdater, prevState.page);

        return {
          ...prevState,
          page,
          offset: (page - 1) * prevState.limit,
        };
      });
    },
    [setState]
  );

  const setLimit = React.useCallback<RecoilPaginationSetters<T>['setLimit']>(
    (valOrUpdater) => {
      setState((prevState) => {
        const limit = executeUpdater(valOrUpdater, prevState.limit);

        return {
          ...prevState,
          limit,
          offset: (prevState.page - 1) * limit,
        };
      });
    },
    [setState]
  );

  const setMeta = React.useCallback<RecoilPaginationSetters<T>['setMeta']>(
    (valOrUpdater) => {
      setState((prevState) => ({
        ...prevState,
        meta: executeUpdater(valOrUpdater, prevState.meta),
      }));
    },
    [setState]
  );

  return [
    state,
    {
      setTotal,
      setPage,
      setLimit,
      setMeta,
    },
  ];
};

/**
 * Extracts only pagination state setters.
 *
 * @param recoilPaginationState - Recoil Pagination state.
 *
 * @example
 * const { setTotal, setPage } = useRecoilPaginationSetters(paginationState);
 */
export const useRecoilPaginationSetters = <T>(
  recoilPaginationState: RecoilState<RecoilPaginationState<T>>
): RecoilPaginationSetters<T> => {
  const [, setters] = useRecoilPagination<T>(recoilPaginationState);
  return setters;
};

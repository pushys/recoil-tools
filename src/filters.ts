import React from 'react';
import {
  atom,
  RecoilState,
  AtomOptions,
  useRecoilState,
  useRecoilValue,
  SetterOrUpdater,
} from 'recoil';
import { executeUpdater } from './utils';

/**
 * Recoil Filters state.
 */
export type RecoilFiltersState<T extends Record<string, any>> = Readonly<{
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

/**
 * Filters state setters.
 */
export type RecoilFiltersSetters<T extends Record<string, any>> = Readonly<{
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

/**
 * `useRecoilFilters` hook result.
 */
export type UseRecoilFiltersResult<T> = [
  RecoilFiltersState<T>,
  RecoilFiltersSetters<T>
];

/**
 * Recoil Filters atom.
 *
 * @param options - Filters atom options.
 *
 * @example
 * const filtersState = filtersAtom({
 *   key: 'filtersState',
 *   default: {
 *     isOpen: false,
 *     isApplied: false,
 *     values: { userId: '', categoryId: '' },
 *   },
 * });
 */
export const filtersAtom = <T extends Record<string, any>>(
  options: AtomOptions<RecoilFiltersState<T>>
): RecoilState<RecoilFiltersState<T>> => {
  return atom(options);
};

/**
 * Main hook for `filtersAtom` usage.
 *
 * @param recoilFiltersState - Recoil Filters state.
 */
export const useRecoilFilters = <T extends Record<string, any>>(
  recoilFiltersState: RecoilState<RecoilFiltersState<T>>
): UseRecoilFiltersResult<T> => {
  const [state, setState] = useRecoilState(recoilFiltersState);

  const setOpen = React.useCallback<RecoilFiltersSetters<T>['setOpen']>(
    (valOrUpdater) => {
      setState((prevState) => ({
        ...prevState,
        isOpen: executeUpdater(valOrUpdater, prevState.isOpen),
      }));
    },
    [setState]
  );

  const setApplied = React.useCallback<RecoilFiltersSetters<T>['setApplied']>(
    (valOrUpdater) => {
      setState((prevState) => ({
        ...prevState,
        isApplied: executeUpdater(valOrUpdater, prevState.isApplied),
      }));
    },
    [setState]
  );

  const open = React.useCallback<RecoilFiltersSetters<T>['open']>(
    () => setOpen(true),
    [setOpen]
  );

  const close = React.useCallback<RecoilFiltersSetters<T>['close']>(
    () => setOpen(false),
    [setOpen]
  );

  const apply = React.useCallback<RecoilFiltersSetters<T>['apply']>(
    (valOrUpdater) => {
      setState((prevState) => ({
        ...prevState,
        isApplied: true,
        values: executeUpdater(valOrUpdater, prevState.values),
      }));
    },
    [setState]
  );

  return [
    state,
    {
      setOpen,
      setApplied,
      open,
      close,
      apply,
    },
  ];
};

/**
 * Returns only `isOpen` property from the filters state.
 *
 * @param recoilFiltersState - Recoil Filters state.
 *
 * @example
 * const isOpen = useRecoilFiltersIsOpen(filtersState);
 */
export const useRecoilFiltersIsOpen = <T extends Record<string, any>>(
  recoilFiltersState: RecoilState<RecoilFiltersState<T>>
): boolean => {
  const state = useRecoilValue(recoilFiltersState);
  return state.isOpen;
};

/**
 * Returns only `isApplied` property from the filters state.
 *
 * @param recoilFiltersState - Recoil Filters state.
 *
 * @example
 * const isApplied = useRecoilFiltersIsApplied(filtersState);
 */
export const useRecoilFiltersIsApplied = <T extends Record<string, any>>(
  recoilFiltersState: RecoilState<RecoilFiltersState<T>>
): boolean => {
  const state = useRecoilValue(recoilFiltersState);
  return state.isApplied;
};

/**
 * Returns only `values` property from the filters state.
 *
 * @param recoilFiltersState - Recoil Filters state.
 *
 * @example
 * const values = useRecoilFiltersValues(filtersState);
 */
export const useRecoilFiltersValues = <T extends Record<string, any>>(
  recoilFiltersState: RecoilState<RecoilFiltersState<T>>
): T => {
  const state = useRecoilValue(recoilFiltersState);
  return state.values;
};

/**
 * Returns only filters state setters.
 *
 * @param recoilFiltersState - Recoil Filters state.
 *
 * @example
 * const { apply } = useRecoilFiltersSetters(filtersState);
 */
export const useRecoilFiltersSetters = <T extends Record<string, any>>(
  recoilFiltersState: RecoilState<RecoilFiltersState<T>>
): RecoilFiltersSetters<T> => {
  const [, setters] = useRecoilFilters<T>(recoilFiltersState);
  return setters;
};

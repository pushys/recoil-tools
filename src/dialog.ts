import React from 'react';
import {
  atom,
  RecoilState,
  AtomOptions,
  SetterOrUpdater,
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
} from 'recoil';

import { executeUpdater } from './utils';

/**
 * Recoil Dialog state.
 */
export type RecoilDialogState<T> = Readonly<{
  /**
   * Dialog open state.
   */
  isOpen: boolean;
  /**
   * Any metadata related to the dialog.
   */
  meta: T;
}>;

/**
 * Dialog state setters.
 */
export type RecoilDialogSetters<T> = Readonly<{
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
  /**
   * Resets dialog state to initial. Done through `useResetRecoilState`.
   */
  reset: () => void;
}>;

/**
 * `useRecoilDialog` hook result.
 */
export type UseRecoilDialogResult<T> = [
  RecoilDialogState<T>,
  RecoilDialogSetters<T>
];

/**
 * Recoil Dialog atom.
 *
 * @param options - Dialog atom options.
 *
 * @example
 * const dialogState = dialogAtom({
 *   key: 'dialogState',
 *   default: {
 *     isOpen: false,
 *     meta: undefined,
 *   },
 * });
 */
export const dialogAtom = <T>(
  options: AtomOptions<RecoilDialogState<T>>
): RecoilState<RecoilDialogState<T>> => {
  return atom(options);
};

/**
 * Main hook for `dialogAtom` usage.
 *
 * @param recoilDialogState - Recoil Dialog state.
 */
export const useRecoilDialog = <T>(
  recoilDialogState: RecoilState<RecoilDialogState<T>>
): UseRecoilDialogResult<T> => {
  const state = useRecoilValue(recoilDialogState);
  const setters = useRecoilDialogSetters(recoilDialogState);

  return [state, setters];
};

/**
 * Returns only `isOpen` property from the dialog state.
 *
 * @param recoilDialogState - Recoil Dialog state.
 *
 * @example
 * const isOpen = useRecoilDialogIsOpen(dialogState);
 */
export const useRecoilDialogIsOpen = (
  recoilDialogState: RecoilState<RecoilDialogState<any>>
): boolean => {
  const state = useRecoilValue<RecoilDialogState<any>>(recoilDialogState);
  return state.isOpen;
};

/**
 * Returns only `meta` property from the dialog state.
 *
 * @param recoilDialogState - Recoil Dialog state.
 *
 * @example
 * const meta = useRecoilDialogMeta(dialogState);
 */
export const useRecoilDialogMeta = <T>(
  recoilDialogState: RecoilState<RecoilDialogState<T>>
): T => {
  const state = useRecoilValue<RecoilDialogState<T>>(recoilDialogState);
  return state.meta;
};

/**
 * Returns only dialog state setters.
 *
 * @param recoilDialogState - Recoil Dialog state.
 *
 * @example
 * const { open, close } = useRecoilDialogSetters(dialogState);
 */
export const useRecoilDialogSetters = <T>(
  recoilDialogState: RecoilState<RecoilDialogState<T>>
): RecoilDialogSetters<T> => {
  const setState = useSetRecoilState(recoilDialogState);
  const reset = useResetRecoilState(recoilDialogState);

  const setOpen = React.useCallback<RecoilDialogSetters<T>['setOpen']>(
    (valOrUpdater) => {
      setState((prevState) => ({
        ...prevState,
        isOpen: executeUpdater(valOrUpdater, prevState.isOpen),
      }));
    },
    [setState]
  );

  const open = React.useCallback<RecoilDialogSetters<T>['open']>(
    (meta) => {
      setState((prevState) => ({
        ...prevState,
        ...(meta !== undefined && { meta }),
        isOpen: true,
      }));
    },
    [setState]
  );

  const close = React.useCallback<RecoilDialogSetters<T>['close']>(() => {
    setState((prevState) => ({
      ...prevState,
      isOpen: false,
    }));
  }, [setState]);

  const setMeta = React.useCallback<RecoilDialogSetters<T>['setMeta']>(
    (valOrUpdater) => {
      setState((prevState) => ({
        ...prevState,
        meta: executeUpdater(valOrUpdater, prevState.meta),
      }));
    },
    [setState]
  );

  return { setOpen, open, close, setMeta, reset };
};

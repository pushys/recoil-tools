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
 * Recoil Dialog state.
 */
export type RecoilDialogState<T> = Readonly<{
  /**
   * Dialog open state.
   */
  isOpen: boolean;
  /**
   * Any meta data related to the dialog.
   */
  meta: T;
}>;

/**
 * Result of the `useRecoilDialog` hook.
 */
export type RecoilDialogSetters<T> = Readonly<{
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
): [RecoilDialogState<T>, RecoilDialogSetters<T>] => {
  const [state, setState] = useRecoilState(recoilDialogState);

  const setOpen = React.useCallback<RecoilDialogSetters<T>['setOpen']>(
    (valOrUpdater) => {
      setState((prevState) => ({
        ...prevState,
        isOpen:
          typeof valOrUpdater === 'function'
            ? valOrUpdater(prevState.isOpen)
            : valOrUpdater,
      }));
    },
    [setState]
  );

  const open = React.useCallback<RecoilDialogSetters<T>['open']>(() => {
    setState((prevState) => ({
      ...prevState,
      isOpen: true,
    }));
  }, [setState]);

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
        meta:
          typeof valOrUpdater === 'function'
            ? (valOrUpdater as any)(prevState.meta)
            : valOrUpdater,
      }));
    },
    [setState]
  );

  return [
    state,
    {
      setOpen,
      open,
      close,
      setMeta,
    },
  ];
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
  const [, setters] = useRecoilDialog<T>(recoilDialogState);
  return setters;
};

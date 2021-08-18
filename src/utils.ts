/**
 * Executes a value updater.
 *
 * @param valOrUpdater
 * @param currVal
 */
export const executeUpdater = <T extends any>(valOrUpdater: ((currVal: T) => T) | T, currVal: T): T => {
  return typeof valOrUpdater === 'function'
    ? (valOrUpdater as Function)(currVal)
    : valOrUpdater;
};
/**
 * Debounce utility functions
 */

export interface DebounceOptions {
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * have elapsed since the last time the debounced function was invoked.
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: DebounceOptions = {}
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;
  let maxTimeoutId: NodeJS.Timeout | null = null;
  let lastCallTime: number | null = null;
  let lastInvokeTime = 0;
  let leading = options.leading ?? false;
  let trailing = options.trailing !== false;
  let maxWait = options.maxWait;

  function invokeFunc(time: number, args: Parameters<T>) {
    lastInvokeTime = time;
    func(...args);
  }

  function leadingEdge(time: number, args: Parameters<T>) {
    lastInvokeTime = time;
    if (leading) {
      invokeFunc(time, args);
    }
  }

  function trailingEdge(time: number, args: Parameters<T>) {
    timeoutId = null;
    if (trailing) {
      invokeFunc(time, args);
    }
  }

  function shouldInvoke(time: number): boolean {
    const timeSinceLastCall = lastCallTime !== null ? time - lastCallTime : time;
    const timeSinceLastInvoke = time - lastInvokeTime;

    return (
      lastCallTime === null ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxWait !== undefined && timeSinceLastInvoke >= maxWait)
    );
  }

  function timerExpired(): boolean {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time, [] as Parameters<T>);
    }
    const timeSinceLastCall = lastCallTime !== null ? time - lastCallTime : time;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;
    const timeRemaining = maxWait !== undefined
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;

    timeoutId = setTimeout(timerExpired, timeRemaining);
    return false;
  }

  function cancel() {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    if (maxTimeoutId !== null) {
      clearTimeout(maxTimeoutId);
      maxTimeoutId = null;
    }
    lastCallTime = null;
    lastInvokeTime = 0;
  }

  function flush() {
    return timeoutId === null ? undefined : trailingEdge(Date.now(), [] as Parameters<T>);
  }

  function pending() {
    return timeoutId !== null;
  }

  function debounced(...args: Parameters<T>) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    lastCallTime = time;

    if (isInvoking) {
      if (timeoutId === null) {
        leadingEdge(time, args);
      }
      if (maxWait !== undefined) {
        timeoutId = setTimeout(timerExpired, wait);
        if (maxTimeoutId === null) {
          maxTimeoutId = setTimeout(() => {
            maxTimeoutId = null;
            const time = Date.now();
            if (time - lastInvokeTime >= maxWait) {
              trailingEdge(time, args);
            }
          }, maxWait);
        }
      } else {
        timeoutId = setTimeout(timerExpired, wait);
      }
    }
  }

  debounced.cancel = cancel;
  debounced.flush = flush;
  debounced.pending = pending;

  return debounced;
}

/**
 * Creates a throttled function that only invokes func at most once per every wait milliseconds
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  return debounce(func, wait, { leading: true, trailing: true });
}


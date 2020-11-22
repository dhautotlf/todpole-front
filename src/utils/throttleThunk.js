const noop = () => {};

/**
 * Throttle a redux thunk
 * @param {function} thunk
 * @param {number} wait - The throttle rate. Defaults to 5000 ms.
 * @returns {function} A throttled version of the supplied thunk
 */
export default function throttleThunk(thunk, wait = 5000) {
  let allow = true;

  return function() {
    if (!allow) {
      // The result will be passed into `dispatch()`, so supply a valid
      // action type; in this case, a function so that redux-thunk will
      // handle it (but do nothing).
      return noop;
    }
    allow = false;
    setTimeout(() => (allow = true), wait);
    return thunk.apply(this, arguments);
  };
}

import * as React from "react";

/**
 * make sure to dispatch function only when component is still in the DOM.
 *
 * @param dispatch
 */
export const useSafeDispatch = <Dispatch extends (...args: any[]) => void>(
  dispatch: Dispatch
) => {
  const mountedRef = React.useRef<boolean>(false);
  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  // eslint react-hooks/exhaustive-deps rule unfortunately is not able to parse
  // through this typescript type casting syntax here, and therefore is raising a warning
  // eslint-disable-next-line
  return React.useCallback(
    ((...args) => {
      if (mountedRef.current) {
        dispatch(...args);
      }
    }) as Dispatch,
    [dispatch]
  );
};

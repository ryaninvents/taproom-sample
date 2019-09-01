import {useMemo, useRef} from 'preact/hooks';
import {styler} from 'popmotion';

/** Hook which creates a ref and a Popmotion styler for that ref. */
export default function useStyler() {
  const ref = useRef(null);
  const refStyler = useMemo(() => {
    if (!ref.current) { return null; }
    return styler(ref.current);
  }, [ref.current]);
  return [ref, refStyler];
}

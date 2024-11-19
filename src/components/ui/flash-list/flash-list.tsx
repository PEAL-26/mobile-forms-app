import { FlashList as ShopifyFlashList, useBlankAreaTracker } from '@shopify/flash-list';
import { useCallback, useEffect, useRef } from 'react';

import { FlashListProps } from './types';

export function FlashList<T>(props: FlashListProps<T>) {
  const ref = useRef(null);
  const [blankAreaTrackerResult, onBlankArea] = useBlankAreaTracker(ref);

  const onLoadListener = useCallback(({ elapsedTimeInMs }: { elapsedTimeInMs: number }) => {
    // ingestData("Sample List load time", elapsedTimeInMs);
    console.log('Sample List load time', elapsedTimeInMs);
  }, []);

  // Only when the component will unmount then you willl see the output
  // As we set the console in cleanUp function 👇
  // It will show you then the latest output of Blank Area when unmount
  useEffect(() => {
    return () => {
      console.log('On blank area: ', blankAreaTrackerResult);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ShopifyFlashList {...props} ref={ref} onBlankArea={onBlankArea} onLoad={onLoadListener} />
  );
}

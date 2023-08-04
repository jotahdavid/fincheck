import { useState } from 'react';

export function useAccountsController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  return { sliderState, setSliderState };
}

import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useSwiper } from 'swiper/react';

interface AccountsSliderNavigationProps {
  isBeginning: boolean | null;
  isEnd: boolean | null;
}

export function AccountsSliderNavigation({ isBeginning, isEnd }: AccountsSliderNavigationProps) {
  const swiper = useSwiper();

  return (
    <div>
      <button
        type="button"
        className="py-3 pl-2.5 pr-3 rounded-full mr-1 enabled:hover:bg-black/10 transition-colors disabled:opacity-40"
        onClick={() => swiper.slidePrev()}
        disabled={isBeginning ?? swiper.isBeginning}
      >
        <ChevronLeftIcon className="text-white w-6 h-6" />
      </button>

      <button
        type="button"
        className="py-3 pl-2.5 pr-3 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40"
        onClick={() => swiper.slideNext()}
        disabled={isEnd ?? swiper.isEnd}
      >
        <ChevronRightIcon className="text-white w-6 h-6" />
      </button>
    </div>
  );
}

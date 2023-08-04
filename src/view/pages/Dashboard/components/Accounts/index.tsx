import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { EyeIcon } from '@view/components/icons/EyeIcon';
import { AccountCard } from './AccountCard';
import { AccountsSliderNavigation } from './AccountsSliderNavigation';
import { useAccountsController } from './useAccountsController';

export function Accounts() {
  const { sliderState, setSliderState } = useAccountsController();

  return (
    <div className="bg-teal-900 w-full h-full rounded-2xl px-4 py-8 md:p-10 flex flex-col">
      <div>
        <span className="tracking-[-0.5px] text-white block">Saldo total</span>

        <div className="flex items-center gap-2">
          <strong className="text-2xl tracking-[-1px] text-white">R$ 1.000,00</strong>
          <button
            className="w-8 h-8 flex items-center justify-center"
            type="button"
          >
            <EyeIcon open />
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        <Swiper
          spaceBetween={16}
          slidesPerView={2.1}
          className="w-full h-full flex flex-1 flex-col justify-end"
          wrapperClass="mt-4 h-auto"
          onSlideChange={(swiper) => {
            setSliderState({
              isBeginning: swiper.isBeginning,
              isEnd: swiper.isEnd,
            });
          }}
        >
          <div slot="container-start" className="flex items-center justify-between">
            <strong className="text-white tracking-[-1px] text-lg font-bold">
              Minhas contas
            </strong>

            <AccountsSliderNavigation
              isBeginning={sliderState.isBeginning}
              isEnd={sliderState.isEnd}
            />
          </div>

          <SwiperSlide>
            <AccountCard
              name="Nubank"
              color="#7950F2"
              balance={123.45}
              type="CHECKING"
            />
          </SwiperSlide>

          <SwiperSlide>
            <AccountCard
              name="XP Investimentos"
              color="#333"
              balance={300}
              type="INVESTMENT"
            />
          </SwiperSlide>

          <SwiperSlide>
            <AccountCard
              name="Carteira"
              color="#14a314"
              balance={500}
              type="CASH"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

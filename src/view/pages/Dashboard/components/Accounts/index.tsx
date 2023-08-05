import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { EyeIcon } from '@view/components/icons/EyeIcon';
import { formatCurrency } from '@app/utils/formatCurrency';

import { AccountCard } from './AccountCard';
import { AccountsSliderNavigation } from './AccountsSliderNavigation';
import { useAccountsController } from './useAccountsController';
import { cn } from '@app/utils/cn';
import { Spinner } from '@view/components/Spinner';

export function Accounts() {
  const {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValueVisibility,
    isLoading,
  } = useAccountsController();

  return (
    <div className="bg-teal-900 w-full h-full rounded-2xl px-4 py-8 md:p-10 flex flex-col">
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="text-teal-950/50 w-10 h-10" />
        </div>
      )}

      {!isLoading && (
        <>
          <div>
            <span className="tracking-[-0.5px] text-white block">Saldo total</span>

            <div className="flex items-center gap-2">
              <strong className={cn(
                'text-2xl tracking-[-1px] text-white',
                !areValuesVisible && 'blur-md select-none',
              )}
              >
                {formatCurrency(1000)}
              </strong>
              <button
                className="w-8 h-8 flex items-center justify-center"
                type="button"
                onClick={toggleValueVisibility}
              >
                <EyeIcon open={areValuesVisible} />
              </button>
            </div>
          </div>

          <div className="flex-1 flex mt-10">
            <Swiper
              spaceBetween={16}
              slidesPerView={windowWidth >= 500 ? 2.1 : 1.1}
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
        </>
      )}
    </div>
  );
}

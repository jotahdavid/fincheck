import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PlusIcon } from '@radix-ui/react-icons';

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
    accounts,
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
            {accounts.length === 0 && (
              <div className="flex-1 flex flex-col justify-end">
                <div>
                  <strong className="text-white tracking-[-1px] text-lg font-bold">
                    Minhas contas
                  </strong>

                </div>

                <button
                  type="button"
                  className="mt-4 w-full h-52 rounded-2xl border-2 border-dashed border-teal-600 flex flex-col items-center justify-center gap-4 text-white hover:bg-teal-950/10 transition-colors"
                >
                  <div className="w-11 h-11 rounded-full border-2 border-dashed border-white flex items-center justify-center">
                    <PlusIcon className="w-6 h-6" />
                  </div>
                  <span className="tracking-[-0.5px] font-medium block w-32">
                    Cadastre uma nova conta
                  </span>
                </button>
              </div>
            )}

            {accounts.length > 0 && (
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
            )}
          </div>
        </>
      )}
    </div>
  );
}

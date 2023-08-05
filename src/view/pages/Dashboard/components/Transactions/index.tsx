import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Swiper, SwiperSlide } from 'swiper/react';

import { TransactionsIcon } from '@view/components/icons/TransactionsIcon';
import { FilterIcon } from '@view/components/icons/FilterIcon';
import { MONTHS } from '@app/config/constants';

import { SliderOption } from './SliderOption';
import { SliderNavigation } from './SliderNavigation';
import { TransactionCard } from './TransactionCard';
import { useTransactionsController } from './useTransactionsController';

export function Transactions() {
  const { areValuesVisible } = useTransactionsController();

  return (
    <div className="bg-gray-100 w-full h-full rounded-2xl p-10 flex flex-col">
      <header>
        <div className="flex items-center justify-between">
          <button type="button" className="flex items-center gap-2">
            <TransactionsIcon />
            <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
              Transações
            </span>
            <ChevronDownIcon className="text-gray-900" />
          </button>

          <button type="button">
            <FilterIcon />
          </button>
        </div>

        <div className="mt-6">
          <Swiper
            spaceBetween={8}
            slidesPerView={3}
            centeredSlides
          >
            <SliderNavigation />
            {MONTHS.map((month, monthIndex) => (
              <SwiperSlide key={month}>
                {({ isActive }) => (
                  <SliderOption
                    isActive={isActive}
                    month={month}
                    index={monthIndex}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </header>

      <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
        <TransactionCard
          name="Almoço"
          date="04/06/2023"
          type="expense"
          value={40}
          isValueVisible={areValuesVisible}
        />

        <TransactionCard
          name="Salário"
          date="05/06/2023"
          type="income"
          value={2210}
          isValueVisible={areValuesVisible}
        />
      </div>
    </div>
  );
}

import { Swiper, SwiperSlide } from 'swiper/react';

import { FilterIcon } from '@view/components/icons/FilterIcon';
import { MONTHS } from '@app/config/constants';
import { Spinner } from '@view/components/Spinner';
import { formatDate } from '@app/utils/formatDate';
import emptyStateSrc from '@assets/empty-state.svg';

import { SliderOption } from './SliderOption';
import { SliderNavigation } from './SliderNavigation';
import { TransactionCard } from './TransactionCard';
import { useTransactionsController } from './useTransactionsController';
import { TransactionTypeDropdown } from './TransactionTypeDropdown';
import { FiltersModal } from './FiltersModal';

export function Transactions() {
  const {
    areValuesVisible,
    isInitialLoading,
    isLoading,
    transactions,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
  } = useTransactionsController();

  const hasTransactions = transactions.length > 0;

  return (
    <div className="bg-gray-100 w-full h-full rounded-2xl p-10 flex flex-col">
      {isInitialLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="text-teal-900 w-10 h-10" />
        </div>
      )}

      {!isInitialLoading && (
        <>
          <FiltersModal
            open={isFiltersModalOpen}
            onClose={handleCloseFiltersModal}
          />

          <header>
            <div className="flex items-center justify-between">
              <TransactionTypeDropdown />

              <button type="button" onClick={handleOpenFiltersModal}>
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
            {isLoading && (
              <div className="h-full flex flex-col items-center justify-center">
                <Spinner className="text-teal-900 w-10 h-10" />
              </div>
            )}

            {(!hasTransactions && !isLoading) && (
              <div className="h-full flex flex-col items-center justify-center">
                <img src={emptyStateSrc} alt="Ilustração de uma mulher olhando através de uma lupa" />
                <p className="text-gray-700 mt-4">
                  Não encontramos nenhuma transação
                </p>
              </div>
            )}

            {(hasTransactions && !isLoading) && (transactions.map((transaction) => (
              <TransactionCard
                name={transaction.name}
                date={formatDate(new Date(transaction.date))}
                type={transaction.type === 'EXPENSE' ? 'expense' : 'income'}
                icon={transaction.category?.icon}
                value={transaction.value}
                isValueVisible={areValuesVisible}
              />
            )))}
          </div>
        </>
      )}
    </div>
  );
}

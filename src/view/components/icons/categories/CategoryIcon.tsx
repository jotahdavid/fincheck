import { iconsMap } from './iconsMap';

interface CategoryIconProps {
  type: 'income' | 'expense';
  category?: keyof (typeof iconsMap.expense & typeof iconsMap.income);
}

export function CategoryIcon({ type, category }: CategoryIconProps) {
  const Icon = iconsMap[type][
    category as keyof (typeof iconsMap.expense | typeof iconsMap.income)
  ] ?? iconsMap[type].default;

  return <Icon />;
}

CategoryIcon.defaultProps = {
  category: '',
};

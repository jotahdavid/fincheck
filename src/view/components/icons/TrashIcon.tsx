import { cn } from '@app/utils/cn';

interface TrashIconProps {
  className?: string;
}

export function TrashIcon({ className }: TrashIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        'text-red-900',
        className,
      )}
    >
      <g>
        <path d="M19.3247 9.4675C19.3247 9.4675 18.7817 16.2025 18.4667 19.0395C18.3167 20.3945 17.4797 21.1885 16.1087 21.2135C13.4997 21.2605 10.8877 21.2635 8.2797 21.2085C6.9607 21.1815 6.1377 20.3775 5.9907 19.0465C5.6737 16.1845 5.1337 9.4675 5.1337 9.4675M20.708 6.239H3.75M17.4404 6.239C16.6554 6.239 15.9794 5.684 15.8254 4.915L15.5824 3.699C15.4324 3.138 14.9244 2.75 14.3454 2.75H10.1124C9.5334 2.75 9.0254 3.138 8.8754 3.699L8.6324 4.915C8.4784 5.684 7.8024 6.239 7.0174 6.239" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

TrashIcon.defaultProps = {
  className: '',
};

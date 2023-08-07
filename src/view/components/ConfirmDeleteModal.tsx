import { Button } from './Button';
import { Modal } from './Modal';
import { TrashIcon } from './icons/TrashIcon';

interface ConfirmDeleteModalProps {
  open: boolean;
  title: string;
  description?: string;
  isLoading?: boolean;
  onConfirm?: () => void;
  onClose?: () => void;
}

export function ConfirmDeleteModal({
  open, title, description, isLoading, onConfirm, onClose,
}: ConfirmDeleteModalProps) {
  return (
    <Modal
      open={open}
      title="Excluir"
      onClose={onClose}
    >
      <div className="flex flex-col items-center gap-y-6">
        <div className="w-[52px] h-[52px] rounded-full bg-red-100 flex items-center justify-center">
          <TrashIcon className="w-6 h-6 text-red-900" />
        </div>

        <p className="max-w-[180px] text-center text-gray-800 font-bold tracking-[-0.5px]">
          {title}
        </p>

        <p className="text-center text-gray-800 tracking-[-0.5px]">
          {description}
        </p>
      </div>

      <div className="mt-10 space-y-4">
        <Button
          className="w-full"
          variant="danger"
          onClick={onConfirm}
          isLoading={isLoading}
        >
          Sim, desejo excluir
        </Button>

        <Button
          className="w-full"
          variant="ghost"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancelar
        </Button>
      </div>
    </Modal>
  );
}

ConfirmDeleteModal.defaultProps = {
  description: '',
  isLoading: false,
  onClose: null,
  onConfirm: null,
};

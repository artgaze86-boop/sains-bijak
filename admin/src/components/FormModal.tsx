import { ReactNode } from 'react';

interface FormModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children: ReactNode;
  loading?: boolean;
  submitLabel?: string;
  large?: boolean;
}

export default function FormModal({
  title,
  open,
  onClose,
  onSubmit,
  children,
  loading = false,
  submitLabel = 'Simpan',
  large = false,
}: FormModalProps) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal ${large ? 'modal-lg' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>{title}</h3>
          <button type="button" className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Menyimpan...' : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
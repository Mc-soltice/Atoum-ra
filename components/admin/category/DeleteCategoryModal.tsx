import type { Category } from "@/types/category";

interface DeleteCategoryModalProps {
  isOpen: boolean;
  category: Category | null;
  onClose: () => void;
  onCategoryDeleted: (id: number) => void;
}

export default function DeleteCategoryModal({
  isOpen,
  category,
  onClose,
  onCategoryDeleted,
}: DeleteCategoryModalProps) {
  const handleDelete = () => {
    if (!category) return;
    // TODO : DELETE /categories/{id}
    onCategoryDeleted(category.id);
    onClose();
  };

  if (!isOpen || !category) return null;

  return (
    <div className="modal modal-open" role="dialog" aria-modal="true">
      <div className="modal-box">
        <h2 className="font-bold text-lg mb-4">Supprimer la catégorie</h2>
        <p className="mb-4">
          Êtes-vous sûr de vouloir supprimer <strong>{category.name}</strong> ?
          Cette action est irréversible.
        </p>
        <div className="modal-action">
          <button className="btn btn-error" onClick={handleDelete}>
            Supprimer
          </button>
          <button className="btn" onClick={onClose}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

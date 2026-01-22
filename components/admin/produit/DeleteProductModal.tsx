import type { Product } from "@/types/product";

interface DeleteProductModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onConfirm: (id: number) => Promise<void>;
}

export default function DeleteProductModal({
  isOpen,
  product,
  onClose,
  onConfirm,
}: DeleteProductModalProps) {
  if (!isOpen || !product) return null;

  const handleDelete = async () => {
    await onConfirm(product.id);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal danger">
        <h2>Supprimer le produit</h2>

        <p>
          Voulez-vous vraiment supprimer le produit{" "}
          <strong>{product.name}</strong> ?
        </p>

        <div className="actions">
          <button onClick={onClose}>Annuler</button>
          <button className="danger" onClick={handleDelete}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

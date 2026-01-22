import { useState, useEffect } from "react";
import type { Category, UpdateCategoryPayload } from "@/types/category";

interface EditCategoryModalProps {
  isOpen: boolean;
  category: Category | null;
  onClose: () => void;
  onCategoryUpdated: (cat: Category) => void;
}

export default function EditCategoryModal({
  isOpen,
  category,
  onClose,
  onCategoryUpdated,
}: EditCategoryModalProps) {
  const [form, setForm] = useState<UpdateCategoryPayload>({});

  useEffect(() => {
    if (category) {
      setForm({ name: category.name, description: category.description });
    }
  }, [category]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) return;
    // TODO : PATCH /categories/{id}
    onCategoryUpdated({
      ...category,
      ...form,
      updated_at: new Date().toISOString(),
    });
    onClose();
  };

  if (!isOpen || !category) return null;

  return (
    <div className="modal modal-open" role="dialog" aria-modal="true">
      <div className="modal-box">
        <h2 className="font-bold text-lg mb-4">Éditer la catégorie</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            value={form.name || ""}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Nom"
            required
          />
          <textarea
            name="description"
            value={form.description || ""}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            placeholder="Description"
            required
          />
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Enregistrer
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

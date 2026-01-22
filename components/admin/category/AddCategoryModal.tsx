import { useState } from "react";
import type { Category, CreateCategoryPayload } from "@/types/category";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryAdded: (cat: Category) => void;
}

export default function AddCategoryModal({
  isOpen,
  onClose,
  onCategoryAdded,
}: AddCategoryModalProps) {
  const [form, setForm] = useState<CreateCategoryPayload>({
    name: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO : POST /categories
    onCategoryAdded({
      id: Date.now(),
      ...form,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal modal-open" role="dialog" aria-modal="true">
        <div className="modal-box">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
            <legend className="fieldset-legend">
              <h2 className="font-bold text-lg">Ajouter une catégorie</h2>
            </legend>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nom"
                className="input input-bordered outline-none w-full rounded-lg"
                required
              />
              <input
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                className="input input-bordered outline-none w-full rounded-lg"
                required
              />
              <div className="modal-action">
                <button
                  className="rounded-lg btn mb-4 text-white bg-linear-to-r from-black to-gray-700 hover:from-gray-800 hover:to-gray-600"
                  onClick={onClose}
                >
                  Ajouter
                </button>
                <button type="button" className="btn" onClick={onClose}>
                  Annuler
                </button>
              </div>
            </form>
          </fieldset>
        </div>
      </div>
    </>
  );
}

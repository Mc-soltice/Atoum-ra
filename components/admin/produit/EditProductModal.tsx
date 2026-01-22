import { useEffect, useState } from "react";
import type { Product, UpdateProductPayload } from "@/types/product";

interface EditProductModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onSubmit: (id: number, payload: UpdateProductPayload) => Promise<void>;
}

export default function EditProductModal({
  isOpen,
  product,
  onClose,
  onSubmit,
}: EditProductModalProps) {
  const [form, setForm] = useState<UpdateProductPayload>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        category_id: product.category?.id, // Ajouté car obligatoire dans le payload
        price: product.price,
        stock: product.stock,
        description: product.description || "",
        original_price: product.original_price || undefined,
        is_promotional: product.is_promotional,
        promo_end_date: product.promo_end_date || undefined,
        // Ajout des champs manquants
        ingredients: product.ingredients,
        benefits: product.benefits,
        usage: product.usage || undefined,
      });
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const target = e.target as HTMLInputElement;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? Number(value)
          : type === "checkbox"
            ? target.checked
            : value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !form.name?.trim() ||
      form.price === undefined ||
      form.stock === undefined
    ) {
      alert("Veuillez remplir les champs obligatoires");
      return;
    }

    setLoading(true);
    try {
      await onSubmit(product.id, form);
      onClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      alert("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Modifier le produit</h2>

        <div className="space-y-4">
          <input
            name="name"
            placeholder="Nom"
            value={form.name || ""}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Prix"
            value={form.price || 0}
            onChange={handleChange}
            className="input input-bordered w-full"
            min="0"
            step="0.01"
            required
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock || 0}
            onChange={handleChange}
            className="input input-bordered w-full"
            min="0"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description || ""}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
          />

          <textarea
            name="ingredients"
            placeholder="Ingrédients (séparés par des virgules)"
            value={form.ingredients?.join(", ") || ""}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                ingredients: e.target.value
                  .split(",")
                  .map((item) => item.trim())
                  .filter((item) => item),
              }))
            }
            className="textarea textarea-bordered w-full"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_promotional"
              checked={form.is_promotional || false}
              onChange={handleChange}
              className="checkbox"
            />
            Produit en promotion
          </label>

          {form.is_promotional && (
            <input
              type="date"
              name="promo_end_date"
              value={form.promo_end_date || ""}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              className="btn btn-ghost"
              disabled={loading}
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

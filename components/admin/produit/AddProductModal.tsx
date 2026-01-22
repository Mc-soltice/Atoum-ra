import React, { useState } from "react";
import type { Category } from "@/types/category";
import type { Product, CreateProductPayload } from "@/types/product";

interface AddProductModalProps {
  categories: Category[];
  onClose: () => void;
  onProductAdded: (product: Product) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  categories,
  onClose,
  onProductAdded,
}) => {
  const [form, setForm] = useState<CreateProductPayload>({
    name: "",
    category_id: 0,
    price: 0,
    original_price: null,
    description: "",
    ingredients: [],
    benefits: [],
    usage: "",
    stock: 0,
    is_promotional: false,
    promo_end_date: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [mainImage, setMainImage] = useState<File | null>(null);

  /* -------------------- handlers -------------------- */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
            ? Number(value)
            : value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newFiles]);
    }
  };

  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMainImage(e.target.files[0]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeMainImage = () => {
    setMainImage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.category_id === 0) {
      alert("Veuillez sélectionner une catégorie");
      return;
    }

    const category =
      categories.find((cat) => cat.id === form.category_id) || null;

    // Calcul du pourcentage de réduction
    const discount_percentage =
      form.original_price && form.original_price > form.price
        ? Math.round(
            ((form.original_price - form.price) / form.original_price) * 100,
          )
        : undefined;

    // Générer des URLs d'images temporaires
    const galleryUrls = images.map(
      (_, index) => `/uploads/product-gallery-${Date.now()}-${index}.jpg`,
    );
    const mainImageUrl = mainImage
      ? `/uploads/product-main-${Date.now()}.jpg`
      : "/placeholder.png";

    const newProduct: Product = {
      id: Date.now(),
      name: form.name,
      category,
      price: Number(form.price),
      original_price: form.original_price,
      discount_percentage,
      main_image: mainImageUrl,
      gallery: galleryUrls,
      description: form.description || null,
      ingredients: form.ingredients || [],
      benefits: form.benefits || [],
      usage: form.usage || null,
      stock: Number(form.stock),
      is_promotional: form.is_promotional || false,
      is_on_promotion: form.is_promotional || false,
      promo_end_date:
        form.is_promotional && form.promo_end_date ? form.promo_end_date : null,
      is_stock_low: Number(form.stock) > 0 && Number(form.stock) < 5,
      is_out_of_stock: Number(form.stock) === 0,
    };

    // Dans une vraie app, ici vous enverriez les fichiers au backend
    console.log("Main image:", mainImage);
    console.log("Gallery images:", images);

    onProductAdded(newProduct);
    onClose();
  };

  /* -------------------- UI -------------------- */

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-9"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
              <legend className="fieldset-legend">
                <h2 className="font-bold text-lg">Ajouter un produit</h2>
              </legend>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Layout en deux colonnes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Colonne de gauche */}
                  <div className="space-y-4">
                    {/* Informations de base */}
                    <div className="space-y-3">
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Nom du produit"
                        className="input w-full rounded-lg focus:ring-2 focus:ring-gray-300 outline-none focus:border-transparent"
                        required
                      />

                      <select
                        name="category_id"
                        value={form.category_id}
                        onChange={handleChange}
                        className="select w-full rounded-lg focus:ring-2 focus:ring-gray-300 outline-none focus:border-transparent"
                        required
                      >
                        <option value={0} disabled>
                          Sélectionner une catégorie
                        </option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>

                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="textarea w-full rounded-lg focus:ring-2 focus:ring-gray-300 outline-none focus:border-transparent"
                        rows={3}
                      />
                    </div>

                    {/* Prix et stock */}
                    <div className="space-y-3">
                      <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="Prix"
                        className="input w-full rounded-lg focus:ring-2 focus:ring-gray-300 outline-none focus:border-transparent"
                        required
                        min="0"
                        step="0.01"
                      />

                      <input
                        type="number"
                        name="stock"
                        value={form.stock}
                        onChange={handleChange}
                        placeholder="Stock"
                        className="input w-full rounded-lg focus:ring-2 outline-none focus:ring-gray-300 focus:border-transparent"
                        required
                        min="0"
                      />
                    </div>

                    {/* Promotion */}
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 p-3  bg-gray-50 rounded-lg">
                        <input
                          type="checkbox"
                          name="is_promotional"
                          checked={form.is_promotional}
                          onChange={handleChange}
                          className="checkbox rounded"
                        />
                        <span className="font-medium">
                          Produit en promotion
                        </span>
                      </label>

                      {form.is_promotional && (
                        <div className="space-y-3">
                          <input
                            type="number"
                            name="original_price"
                            value={form.original_price || ""}
                            onChange={handleChange}
                            placeholder="Prix original"
                            className="input w-full rounded-lg focus:ring-2 outline-none focus:ring-gray-300 focus:border-transparent"
                            min="0"
                            step="0.01"
                          />

                          <input
                            type="date"
                            name="promo_end_date"
                            value={form.promo_end_date}
                            onChange={handleChange}
                            className="input w-full rounded-lg focus:ring-2 outline-none focus:ring-gray-300 focus:border-transparent"
                            required={form.is_promotional}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Colonne de droite */}
                  <div className="space-y-4">
                    {/* Upload d'images */}
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <label className="block font-medium">
                          Image principale
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                          {mainImage ? (
                            <div className="flex items-center justify-between">
                              <span className="truncate">{mainImage.name}</span>
                              <button
                                type="button"
                                onClick={removeMainImage}
                                className="text-red-500 hover:text-red-700"
                              >
                                Supprimer
                              </button>
                            </div>
                          ) : (
                            <>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleMainImageUpload}
                                className="hidden"
                                id="mainImageUpload"
                              />
                              <label
                                htmlFor="mainImageUpload"
                                className="cursor-pointer block"
                              >
                                <div className="text-gray-500">
                                  <svg
                                    className="w-8 h-8 mx-auto mb-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    />
                                  </svg>
                                  <span>Cliquez pour uploader</span>
                                </div>
                              </label>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block font-medium">
                          Galerie d&apos;images
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            multiple
                            className="hidden"
                            id="galleryUpload"
                          />
                          <label
                            htmlFor="galleryUpload"
                            className="cursor-pointer block"
                          >
                            <div className="text-gray-500">
                              <svg
                                className="w-8 h-8 mx-auto mb-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                              </svg>
                              <span>Cliquez pour ajouter des images</span>
                            </div>
                          </label>
                        </div>

                        {/* Liste des images de la galerie */}
                        {images.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {images.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                              >
                                <span className="truncate text-sm">
                                  {file.name}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="text-red-500 hover:text-red-700 text-sm"
                                >
                                  Supprimer
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Ingrédients et bienfaits */}
                    <div className="space-y-3">
                      <textarea
                        name="ingredients"
                        value={(form.ingredients || []).join(", ")}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            ingredients: e.target.value
                              .split(",")
                              .map((item) => item.trim())
                              .filter((item) => item),
                          }))
                        }
                        placeholder="Ingrédients (séparés par des virgules)"
                        className="outline-none textarea w-full rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                        rows={3}
                      />

                      <textarea
                        name="benefits"
                        value={(form.benefits || []).join(", ")}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            benefits: e.target.value
                              .split(",")
                              .map((item) => item.trim())
                              .filter((item) => item),
                          }))
                        }
                        placeholder="Bienfaits (séparés par des virgules)"
                        className=" outline-none textarea w-full rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                        rows={3}
                      />
                    </div>

                    {/* Mode d'utilisation */}
                    <div>
                      <textarea
                        name="usage"
                        value={form.usage}
                        onChange={handleChange}
                        placeholder="Mode d'utilisation"
                        className="outline-none textarea w-full rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </fieldset>
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end gap-3 p-3">
                            <button type="button" className="btn" onClick={onClose} >
                  Annuler
                </button>

            <button
              type="submit"
              onClick={handleSubmit}
              className="px-6 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 transition-all"
            >
              Ajouter le produit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;

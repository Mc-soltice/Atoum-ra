"use client";

import { useState } from "react";
import { Save, X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onSubmit: (data: any) => Promise<void>;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  user,
  onSubmit,
}: Props) {
  const [form, setForm] = useState({
    first_name: user.first_name ?? "",
    last_name: user.last_name ?? "",
    phone: user.phone ?? "",
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded-xl border border-neutral-200 p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-neutral-900">
            Modifier le profil
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-black"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Infos */}
          <Input
            label="Prénom"
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
          />
          <Input
            label="Nom"
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
          />
          <Input
            label="Téléphone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />

          {/* Divider */}
          <div className="border-t border-neutral-200 pt-4">
            <p className="text-sm text-neutral-500 mb-3">
              Changer le mot de passe (optionnel)
            </p>

            <Input
              type="password"
              label="Mot de passe actuel"
              name="current_password"
              value={form.current_password}
              onChange={handleChange}
            />
            <Input
              type="password"
              label="Nouveau mot de passe"
              name="new_password"
              value={form.new_password}
              onChange={handleChange}
            />
            <Input
              type="password"
              label="Confirmation"
              name="new_password_confirmation"
              value={form.new_password_confirmation}
              onChange={handleChange}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-100"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-linear-to-r from-black to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white transition rounded-lg"
            >
              <Save className="inline-block mr-2" size={16} />
              {loading ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* Input component                    */
/* ---------------------------------- */

function Input({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="block text-sm text-neutral-600 mb-1">{label}</label>
      <input
        {...props}
        className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
      />
    </div>
  );
}

"use client";
import { useState, useMemo, useEffect } from "react";
import type { UpdateUserPayload, User } from "@/types/user";
import { userService } from "@/services/user.service";
import { Save } from "lucide-react";
import { DotSpinner } from "ldrs/react";
import "ldrs/react/DotSpinner.css";

interface EditUserModalProps {
  isOpen: boolean;
  user: User;
  onClose: () => void;
  onOpen?: () => void; // 🔹 nouvelle prop
  onUserUpdated: (user: User) => void;
}

/**
 * Modal pour éditer un utilisateur existant
 * Props :
 * - isOpen : contrôle l'ouverture
 * - user : utilisateur à éditer
 * - onClose : ferme le modal
 * - onUserUpdated : callback après modification
 * Bonnes pratiques :
 * - Structure visuelle identique à la création
 * - Focus sur premier champ
 * - aria-modal, role="dialog"
 */
export default function EditUserModal({
  isOpen,
  user,
  onClose,
  onUserUpdated,
}: EditUserModalProps) {
  const initialForm = useMemo<UpdateUserPayload>(() => {
    if (!user) {
      return {
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        password: "",
        is_locked: false,
      };
    }
    return {
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      phone: user.phone || "",
      email: user.email || "",
      password: "",
      is_locked: user.is_locked || false,
    };
  }, [user]);
  useEffect(() => {
    if (user) {
      setForm({
        first_name: user.first_name ?? "",
        last_name: user.last_name ?? "",
        phone: user.phone ?? "",
        email: user.email ?? "",
        password: "",
        is_locked: user.is_locked ?? false,
      });
    }
  }, [user]);

  const [form, setForm] = useState<UpdateUserPayload>(initialForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const payload: UpdateUserPayload = {};

    // Parcours tous les champs du form
    (Object.keys(form) as (keyof UpdateUserPayload)[]).forEach((key) => {
      // Compare avec la valeur originale
      if (form[key] !== (user[key] ?? "")) {
        // Ne pas envoyer le password vide
        if (key === "password" && !form.password) return;
        payload[key] = form[key];
      }
    });

    if (Object.keys(payload).length === 0) {
      console.log("Aucune modification détectée");
      return;
    }
    try {
      setLoading(true);
      const updatedUser = await userService.update(user.id, payload);
      onUserUpdated(updatedUser);
      onClose(); // ✅ FERMETURE DÉFINITIVE
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
    } finally {
      setLoading(false);
    }
  };

  if (!user || !isOpen) return null;

  return (
    <div className="modal modal-open" role="dialog" aria-modal="true">
      <div className="modal-box">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
          <legend className="fieldset-legend">
            <h2 className="font-bold text-lg">Éditer un utilisateur</h2>
          </legend>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              placeholder="Prénom"
              className="input input-bordered outline-none rounded-lg w-full"
              required
            />
            <input
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              placeholder="Nom"
              className="input input-bordered outline-none rounded-lg w-full"
              required
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="input input-bordered outline-none rounded-lg w-full"
              required
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Téléphone"
              className="input input-bordered outline-none rounded-lg w-full"
              required
            />

            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Nouveau mot de passe (optionnel)"
              className="input input-bordered outline-none rounded-lg w-full"
            />

            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Compte verrouillé</span>
                <input
                  type="checkbox"
                  name="is_locked"
                  checked={form.is_locked}
                  onChange={handleChange}
                  className="checkbox"
                />
              </label>
            </div>
            <div className="modal-action">
              <button
                type="submit"
                onClick={handleSubmit}
                className="rounded-lg btn mb-4 text-white bg-slate-800"
              >
                {loading ? (
                  <DotSpinner size="20" speed="0.9" color="white" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {loading ? "Mise à jour..." : "Mettre à jour"}
              </button>
              <button
                type="button"
                className="btn rounded-lg"
                onClick={onClose}
              >
                Annuler
              </button>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
}

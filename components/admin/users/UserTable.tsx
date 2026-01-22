"use client";

import type { User } from "@/types/user";
import { useState, useEffect } from "react";
import Filter from "@/components/admin/Filter";
import { useUsers } from "@/contexte/UserContext";
import { Waveform } from "ldrs/react";
import "ldrs/react/Waveform.css";

interface UsersTableProps {
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export default function UsersTable({ onEdit, onDelete }: UsersTableProps) {
  const { users, loading, fetchUsers } = useUsers();
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  // 🔹 Récupère les utilisateurs au chargement
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // 🔹 Synchronise filteredUsers à chaque changement de users
  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  // 🔹 Loader si on est en train de charger
  if (loading && users.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Waveform size="35" stroke="3.5" speed="1" color="black" />
        <span className="ml-3 text-gray-700">
          Chargement des utilisateurs...
        </span>
      </div>
    );
  }

  return (
    <>
      <Filter<User>
        options={{ role: ["Verrouiller", "Actifs"] }}
        onFilterChange={(filters) => {
          // Exemple simple de filtrage côté front
          let result = users;
          if (filters.search) {
            result = result.filter(
              (u) =>
                u.first_name
                  .toLowerCase()
                  .includes(filters.search!.toLowerCase()) ||
                u.last_name
                  .toLowerCase()
                  .includes(filters.search!.toLowerCase()) ||
                u.email.toLowerCase().includes(filters.search!.toLowerCase()),
            );
          }
          if (filters.role) {
            result = result.filter((u) => u.roles.includes(filters.role!));
          }
          setFilteredUsers(result);
        }}
      />

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">Prénom</th>
              <th scope="col">Nom</th>
              <th scope="col">Email</th>
              <th scope="col">Téléphone</th>
              <th scope="col">Rôles</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center">
                  Aucun utilisateur
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => onEdit(user)}
                  aria-label={`Éditer ${user.first_name}`}
                >
                  <td>{user.id}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.roles?.join(", ") || "-"}</td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-sm bg-slate-800 text-white rounded-lg"
                      aria-label={`Supprimer ${user.first_name}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(user);
                      }}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

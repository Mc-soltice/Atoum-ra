/**
 * Représente un rôle attribué à un utilisateur
 * (Spatie Laravel Permission)
 */
export type Role = string;

/**
 * Représente une permission attribuée à un utilisateur
 */
export type Permission = string;

/**
 * Modèle User tel que renvoyé par l'API Laravel (Resource)
 */
export interface User {
  /** Identifiant unique */
  id: number;

  /** Prénom */
  first_name: string;

  /** Nom */
  last_name: string;

  /** Numéro de téléphone (unique) */
  phone: string;

  /** Adresse email (unique) */
  email: string;

  /** Indique si le compte est verrouillé */
  is_locked: boolean;

  /** Liste des rôles de l'utilisateur */
  roles: Role[];

  /** Liste des permissions */
  permissions: Permission[];
}

/**
 * Payload pour la création d'un utilisateur
 * (POST /users)
 */
export interface CreateUserPayload {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  role?: string;
  password: string;
  password_confirmation: string;
  is_locked?: boolean;
}

/**
 * Payload pour la mise à jour d'un utilisateur
 * (PATCH /users/{id})
 */
export interface UpdateUserPayload {
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  password?: string;
  is_locked?: boolean;
}

import { useState } from 'react';
import { storage } from '@/utils/storage';
import { generateUUIDv4 } from '@/utils/uuid';

/**
 * Garantiza un UUID v4 persistente para el usuario.
 * Al montarse, crea el ID si no existe.
 */
export function useAnonymousUser() {
  const [userId] = useState(() => {
    const existingId = storage.getUserId();
    if (existingId) return existingId;

    const newId = generateUUIDv4();
    storage.setUserId(newId);
    return newId;
  });

  return { userId };
}

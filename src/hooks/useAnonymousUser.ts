import { useEffect, useState } from 'react';
import { storage } from '@/utils/storage';
import { generateUUIDv4 } from '@/utils/uuid';

/**
 * Garantiza un UUID v4 persistente para el usuario.
 * Al montarse, crea el ID si no existe.
 */
export function useAnonymousUser() {
  const [userId, setUserId] = useState<string | null>(() => storage.getUserId());

  useEffect(() => {
    if (!userId) {
      const newId = generateUUIDv4();
      storage.setUserId(newId);
      setUserId(newId);
    }
  }, [userId]);

  return { userId };
}
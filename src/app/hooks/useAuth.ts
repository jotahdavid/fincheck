import { useContext } from 'react';

import { AuthContext } from '@app/contexts/AuthContext';

export function useAuth() {
  return useContext(AuthContext);
}

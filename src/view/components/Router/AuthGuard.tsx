import { Navigate, Outlet } from 'react-router-dom';

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const signedIn = false;

  if (isPrivate && !signedIn) {
    return <Navigate to="/login" />;
  }

  if (!isPrivate && signedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

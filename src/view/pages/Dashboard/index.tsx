import { useAuth } from '../../../app/hooks/useAuth';
import { Button } from '../../components/Button';

export function Dashboard() {
  const { signOut } = useAuth();

  return (
    <>
      <h1>Dashboard page</h1>

      <Button onClick={signOut}>
        Sair
      </Button>
    </>
  );
}

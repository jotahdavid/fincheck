import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthGuard } from './AuthGuard';
import { Login } from '../../pages/Login';
import { Register } from '../../pages/Register';
import { Dashboard } from '../../pages/Dashboard';
import { AuthLayout } from '../../layouts/AuthLayout';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

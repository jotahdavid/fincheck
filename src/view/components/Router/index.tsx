import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Login } from '@view/pages/Login';
import { Register } from '@view/pages/Register';
import { Dashboard } from '@view/pages/Dashboard';
import { AuthLayout } from '@view/layouts/AuthLayout';
import { AuthGuard } from './AuthGuard';

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

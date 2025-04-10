'use client';

import { isAuthenticated } from '@/lib/auth';
import Sidebar from './Sidebar';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const logado = isAuthenticated();
  console.log('Logado:', logado); // Verifique o valor retornado por isAuthenticated

  return (
    <div className="flex min-h-screen">
      {logado ? (
        <Sidebar />
      ) : (
        <p className="text-center text-gray-500">Você não está autenticado.</p>
      )}
      <main className="flex-1 w-auto">{children}</main>
    </div>
  );
}

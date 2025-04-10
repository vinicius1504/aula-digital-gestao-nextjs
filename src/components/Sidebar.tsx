'use client';

import { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import * as Icons from 'react-icons/fa';
import sidebarData from '@/data/sidebar.json';

export default function Sidebar() {
  const [aberto, setAberto] = useState(true);
  const [menu, setMenu] = useState<any[]>([]);

  useEffect(() => {
    // Aqui futuramente você pode usar fetch('/api/sidebar')
    setMenu(sidebarData);
  }, []);

  return (
    <div className={`h-screen bg-blue-600 text-white flex flex-col transition-all duration-300 ${aberto ? 'w-64' : 'w-20'}`}>
      {/* Topo com botão de recolher */}
      <div className="flex items-center justify-between p-4 border-b border-blue-500">
        {aberto ? (
          <div className="text-center">
            <div className="bg-blue-800 rounded-full w-12 h-12 mx-auto flex items-center justify-center font-bold text-lg">
              MS
            </div>
            <p className="mt-2 text-sm font-semibold">Maria Silva</p>
            <p className="text-xs text-blue-200">Professora</p>
          </div>
        ) : (
          <div className="w-full text-center font-bold text-lg">MS</div>
        )}

        <button onClick={() => setAberto(!aberto)} className="ml-auto text-white hover:text-blue-200">
          <FaBars />
        </button>
      </div>

      {/* Menu dinâmico */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        {menu.map((grupo, i) => (
          <MenuGrupo key={i} titulo={grupo.titulo} itens={grupo.itens} aberto={aberto} />
        ))}
      </nav>

      {/* Rodapé */}
      <div className="p-4 border-t border-blue-500 text-xs text-center text-blue-200">
        Sistema de Gestão Escolar v1.0.2
      </div>
    </div>
  );
}

type MenuGrupoProps = {
  titulo: string;
  itens: { label: string; icon: string }[];
  aberto: boolean;
};

function MenuGrupo({ titulo, itens, aberto }: MenuGrupoProps) {
  return (
    <div className="mb-4">
      {titulo && aberto && (
        <p className="text-blue-200 uppercase text-xs px-2 mb-2">{titulo}</p>
      )}
      {itens.map((item, idx) => {
        const Icon = Icons[item.icon as keyof typeof Icons] || Icons.FaQuestionCircle;

        return (
          <button
            key={idx}
            className={`flex items-center gap-3 px-2 py-2 rounded-md w-full text-left hover:bg-blue-700 transition`}
          >
            <span className="text-lg"><Icon /></span>
            {aberto && <span className="text-sm">{item.label}</span>}
          </button>
        );
      })}
    </div>
  );
}

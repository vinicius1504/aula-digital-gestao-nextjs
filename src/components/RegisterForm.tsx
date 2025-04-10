'use client';

import { useState } from 'react';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaSchool,
  FaExclamationCircle,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function RegisterForm() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    escola: '',
  });

  const [erros, setErros] = useState<{ [key: string]: string }>({});
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErros({ ...erros, [e.target.name]: '' }); // limpa erro ao digitar
  };

  const validar = () => {
    const errosTemp: { [key: string]: string } = {};

    if (!form.nome.trim()) errosTemp.nome = 'Por favor, digite seu nome.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errosTemp.email = 'Digite um email válido.';
    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(form.senha))
      errosTemp.senha = 'A senha deve ter 8+ caracteres, com maiúscula, número e símbolo.';
    if (form.senha !== form.confirmarSenha)
      errosTemp.confirmarSenha = 'As senhas não coincidem.';
    if (!form.escola.trim()) errosTemp.escola = 'Digite o nome da escola.';

    setErros(errosTemp);
    return Object.keys(errosTemp).length === 0;
  };

  const handleSubmit = async () => {
    if (!validar()) return;

    try {
      const res = await fetch(' /api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Cadastro realizado com sucesso!');
      } else {
        alert(data.erro || 'Erro ao cadastrar');
      }
    } catch {
      alert('Erro de conexão');
    }
  };

  const inputBase = 'w-full pl-10 p-2 border rounded-md focus:outline-none focus:ring-2';
  const erroStyle = 'border-red-500 focus:ring-red-400';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full border border-purple-200"
    >
      <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">Cadastro de Usuário</h2>

      {/* Campo nome */}
      <Campo
        label="Nome de Usuário"
        name="nome"
        icon={<FaUser />}
        placeholder="Digite seu nome"
        value={form.nome}
        erro={erros.nome}
        onChange={handleChange}
        erroStyle={erroStyle}
      />

      {/* Email */}
      <Campo
        label="Email"
        name="email"
        icon={<FaEnvelope />}
        placeholder="Digite seu email"
        value={form.email}
        erro={erros.email}
        onChange={handleChange}
        erroStyle={erroStyle}
      />

      {/* Senha */}
      <Campo
        label="Senha"
        name="senha"
        type={mostrarSenha ? 'text' : 'password'}
        icon={<FaLock />}
        placeholder="Digite sua senha"
        value={form.senha}
        erro={erros.senha}
        onChange={handleChange}
        erroStyle={erroStyle}
        toggleSenha={() => setMostrarSenha(!mostrarSenha)}
        mostrarSenha={mostrarSenha}
      />

      {/* Confirmar Senha */}
      <Campo
        label="Confirmar Senha"
        name="confirmarSenha"
        type={mostrarConfirmarSenha ? 'text' : 'password'}
        icon={<FaLock />}
        placeholder="Confirme sua senha"
        value={form.confirmarSenha}
        erro={erros.confirmarSenha}
        onChange={handleChange}
        erroStyle={erroStyle}
        toggleSenha={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
        mostrarSenha={mostrarConfirmarSenha}
      />

      {/* Escola */}
      <Campo
        label="Escola"
        name="escola"
        icon={<FaSchool />}
        placeholder="Nome da escola"
        value={form.escola}
        erro={erros.escola}
        onChange={handleChange}
        erroStyle={erroStyle}
      />

      {/* Botão cadastrar */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleSubmit}
        className="w-full py-2 mt-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-md font-semibold shadow"
      >
        Cadastrar
      </motion.button>

      <div className="text-center text-sm text-gray-600 mt-6">
        Já tem uma conta? <br />
        <Link href="/" className="text-blue-500 hover:underline">
          ← Voltar para login
        </Link>
      </div>
    </motion.div>
  );
}

type CampoProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder: string;
  erro?: string;
  icon: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  erroStyle: string;
  toggleSenha?: () => void;
  mostrarSenha?: boolean;
};

function Campo({
  label,
  name,
  value,
  placeholder,
  type = 'text',
  icon,
  erro,
  onChange,
  erroStyle,
  toggleSenha,
  mostrarSenha,
}: CampoProps) {
  const isPasswordField = toggleSenha !== undefined;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-3 top-3 text-gray-400">{icon}</div>}
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${erro ? erroStyle : 'border-gray-300 focus:ring-purple-400'} ${'pl-10 w-full p-2 border rounded-md'}`}
        />
        {isPasswordField && toggleSenha && (
          <span
            onClick={toggleSenha}
            className="absolute right-3 top-3 text-gray-500 cursor-pointer"
          >
            {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
          </span>
        )}
      </div>
      {erro && (
        <div className="text-red-600 text-xs mt-1 flex items-center gap-1">
          <FaExclamationCircle className="text-sm" />
          {erro}
        </div>
      )}
    </div>
  );
}

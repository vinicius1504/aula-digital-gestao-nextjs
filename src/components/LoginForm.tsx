"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaLock,
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { alertaSucesso, alertaErro } from "@/lib/alertas";
import Link from "next/link";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const isFormValid = username.trim() !== "" && password.trim() !== "";
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/login", {
        // Atualize a rota aqui
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, senha: password }),
      });

      const data = await res.json();
      if (res.ok) {
        alertaSucesso("Login realizado com sucesso!");
        const login = (user: any) => {
          localStorage.setItem("user", JSON.stringify(user));
        };
        login(data.usuario);
        router.push("/dashboard");
      } else {
        alertaErro(data.erro || "Credenciais inválidas");
      }
    } catch {
      alertaErro("Erro ao fazer login");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full border border-purple-200"
    >
      <div className="flex justify-center mb-10">
        <img
          src="/logo-txt-B.svg"
          alt="Logo da plataforma"
          className="h-30 w-auto"
        />
      </div>

      {/* Username */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <div className="relative">
          <FaUser className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Digite seu email"
            className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>

      {/* Password */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Senha
        </label>
        <div className="relative">
          <FaLock className="absolute left-3 top-3 text-gray-400" />
          <input
            type={mostrarSenha ? "text" : "password"}
            placeholder="Digite sua senha"
            className="w-full pl-10 pr-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={() => setMostrarSenha(!mostrarSenha)}
            className="absolute right-3 top-3 text-gray-500 cursor-pointer"
          >
            {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="text-right mt-1">
          <a href="#" className="text-sm text-gray-500 hover:underline">
            Esqueceu a senha?
          </a>
        </div>
      </div>

      <motion.button
        whileHover={isFormValid ? { scale: 1.03 } : {}}
        whileTap={isFormValid ? { scale: 0.97 } : {}}
        onClick={handleLogin}
        disabled={!isFormValid}
        className={`w-full py-2 mt-4 rounded-md font-semibold shadow text-white 
          ${
            isFormValid
              ? "bg-gradient-to-r from-blue-400 to-purple-500 cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          }`}
      >
        Login
      </motion.button>

      {/* Redes sociais */}
      <div className="text-center text-sm text-gray-600 my-6">
        Entrar com redes sociais
      </div>
      <div className="flex justify-center gap-4 mb-6">
        {[FaFacebookF, FaTwitter, FaGoogle].map((Icon, idx) => (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            key={idx}
            className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 transition"
          >
            <Icon className="text-gray-600" />
          </motion.button>
        ))}
      </div>

      {/* Sign Up */}
      <div className="text-center text-sm text-gray-600 my-6">
        Ainda não tem conta?
        <br />
        <Link
          href="/cadastro"
          className="text-blue-500 font-semibold hover:underline"
        >
          Criar nova conta
        </Link>
      </div>
    </motion.div>
  );
}

import { NextResponse } from 'next/server';
// Removed unused imports: fs, bcrypt
import path from 'path';

const filePath = path.join(process.cwd(), './src/data/usuarios.json');

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Funções de validação
    const emailValido = (email: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const senhaForte = (senha: string) =>
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(senha);

    // Validação dos campos obrigatórios
    if (!body.email || !body.senha || !body.nome || !body.escola) {
      return NextResponse.json(
        { erro: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    // Validação do email
    if (!emailValido(body.email)) {
      return NextResponse.json(
        { erro: "Email inválido" },
        { status: 400 }
      );
    }

    // Validação da senha
    if (!senhaForte(body.senha)) {
      return NextResponse.json(
        { erro: "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial" },
        { status: 400 }
      );
    }

    // Realiza a requisição para o backend Express
    const res = await fetch(filePath, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    // Retorna a resposta do backend com o status recebido
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Erro ao fazer proxy:", error);
    return NextResponse.json(
      { erro: "Erro de conexão com o servidor backend" },
      { status: 500 }
    );
  }
}
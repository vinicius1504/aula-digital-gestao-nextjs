import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Lê o corpo da requisição (JSON)
    const body = await req.json();

    // Faz o encaminhamento para o backend: a URL base do seu backend deve estar definida em uma variável de ambiente
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    // Lê a resposta do backend
    const data = await response.json();

    // Retorna a resposta recebida do backend com o mesmo status code
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Erro no proxy de login:', error);
    return NextResponse.json({ erro: 'Erro no proxy de login' }, { status: 500 });
  }
}

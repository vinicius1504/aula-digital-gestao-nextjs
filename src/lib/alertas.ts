import Swal from 'sweetalert2';

export const alertaSucesso = (mensagem: string = 'Operação realizada com sucesso!') => {
  return Swal.fire({
    icon: 'success',
    title: 'Sucesso',
    text: mensagem,
    showConfirmButton: false,
    timer: 2000,
  });
};

export const alertaErro = (mensagem: string = 'Ocorreu um erro') => {
  return Swal.fire({
    icon: 'error',
    title: 'Erro',
    text: mensagem,
  });
};

export const alertaConfirmacao = async (
  titulo: string,
  texto: string,
  confirmText: string = 'Sim',
  cancelText: string = 'Cancelar'
): Promise<boolean> => {
  const result = await Swal.fire({
    title: titulo,
    text: texto,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  });

  return result.isConfirmed;
};

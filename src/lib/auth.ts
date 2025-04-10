export const isAuthenticated = (): boolean => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('usuario');
  };
  
  export const login = (usuario: any) => {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  };
  
  export const logout = () => {
    localStorage.removeItem('usuario');
  };
  
  export const getUsuario = () => {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem('usuario');
    return data ? JSON.parse(data) : null;
  };
  
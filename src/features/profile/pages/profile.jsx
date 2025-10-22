import { useProfile } from '../hooks/useProfile';
import { useAuth } from '../../auth/hooks/useAuth';

const Profile = () => {
  const { profile, loading, error } = useProfile();
  const { logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center max-w-md">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 mb-2">Cargando perfil...</p>
          <p className="text-sm text-gray-500">
            Si esto toma mucho tiempo, puede ser un problema de conectividad con el servidor.
          </p>
          <button 
            onClick={() => globalThis.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    const isAuthError = error.includes('401') || error.includes('expirado') || error.includes('inválido');
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-pink-900 to-purple-900 flex items-center justify-center px-4">
        {/* Efectos de fondo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-red-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border border-white/20">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isAuthError ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              )}
            </svg>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
            {isAuthError ? 'Sesión Expirada' : 'Error al cargar perfil'}
          </h2>
          
          <p className="text-red-100 mb-6 text-lg">
            {isAuthError 
              ? 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.'
              : error
            }
          </p>
          
          <div className="space-y-3">
            <button 
              onClick={logout} 
              className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:from-red-600 hover:to-pink-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              {isAuthError ? 'Ir al Login' : 'Volver al Inicio'}
            </button>
            
            {!isAuthError && (
              <button 
                onClick={() => globalThis.location.reload()} 
                className="w-full bg-white/20 backdrop-blur-sm text-white py-3 px-4 rounded-xl font-semibold border border-white/30 hover:bg-white/30 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reintentar
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
   <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-pink-800 to-pink-600 px-4">
  {/* Fondo animado */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute w-72 h-72 bg-purple-500/20 rounded-full blur-3xl top-1/4 left-1/4 animate-pulse-slow"></div>
    <div className="absolute w-96 h-96 bg-pink-500/20 rounded-full blur-3xl bottom-1/4 right-1/4 animate-pulse-slow"></div>
    <div className="absolute w-64 h-64 bg-purple-300/20 rounded-full blur-2xl top-1/3 right-1/3 animate-pulse-slow"></div>
  </div>

  {/* Header del perfil */}
  <div className="relative overflow-hidden py-20 bg-white/10 backdrop-blur-xl rounded-b-3xl mx-4 md:mx-12 mb-12 shadow-2xl border border-white/20">
    <div className="relative max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
      {/* Avatar con halo */}
      <div className="relative flex-shrink-0">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 flex items-center justify-center text-white text-4xl font-bold shadow-2xl border-4 border-white/20 animate-pulse-slow">
          {profile?.name?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white shadow-lg animate-bounce"></div>
      </div>

      {/* Info usuario */}
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
          {profile?.name || 'Usuario'}
        </h1>
        <p className="text-blue-100 text-lg mb-3">@{profile?.user_name || 'username'}</p>
        <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/20">
          <span className="w-2 h-2 bg-blue-300 rounded-full"></span>
          {profile?.role?.name || 'Usuario'}
        </span>
      </div>
    </div>
  </div>

  {/* Contenido principal */}
  <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10">
    {/* Card Información Personal */}
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-300 hover:scale-105">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white">Información Personal</h3>
      </div>
      <div className="space-y-4">
        {['email', 'phone', 'country'].map((field) => (
          <div key={field} className="group">
            <p className="text-sm text-cyan-100 mb-1 font-medium">{field === 'phone' ? 'Teléfono' : field === 'email' ? 'Correo Electrónico' : 'País'}</p>
            <p className="text-white font-semibold bg-white/10 px-4 py-3 rounded-2xl group-hover:bg-pink-50/20 transition-all">
              {field === 'email' ? profile?.email : field === 'phone' ? profile?.phone || 'No registrado' : profile?.country?.name || 'No especificado'}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* Card Información de Cuenta */}
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-300 hover:scale-105">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white">Información de Cuenta</h3>
      </div>
      <div className="space-y-4">
        {['id', 'role', 'user_name'].map((field) => (
          <div key={field} className="group">
            <p className="text-sm text-cyan-100 mb-1 font-medium">
              {field === 'id' ? 'ID de Usuario' : field === 'role' ? 'Rol' : 'Usuario'}
            </p>
            <p className="text-white font-semibold bg-white/10 px-4 py-3 rounded-2xl group-hover:bg-pink-50/20 transition-all">
              {field === 'id' ? profile?.id : field === 'role' ? profile?.role?.name || 'Usuario' : '@' + profile?.user_name}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

  );
};

export default Profile;
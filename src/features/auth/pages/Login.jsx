import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useAuth } from '../hooks/useAuth';
import Alert from '../../../components/Alert';
import { useAsyncOperation, OPERATION_DELAYS } from '../../../hooks/useAsyncOperation';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const loginOperation = useAsyncOperation(OPERATION_DELAYS.LOGIN);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    loginOperation.reset();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginOperation.reset();

    try {
      const response = await loginUser(formData);
      if (!response.token) throw new Error('No se recibió el token de autenticación');
      const userData = response.user || { email: formData.email };
      login(response.token, userData);
      navigate('/profile');
    } catch (err) {
      loginOperation.setError(err.message || 'Error al iniciar sesión');
    }
  };

  const starCount = 30;

  // Distribución uniforme usando porcentaje basado en índice
  const stars = Array.from({ length: starCount }, (_, i) => ({
    size: Math.random() * 15 + 5,
    left: (i * (100 / starCount)) + Math.random() * 5, // evita que queden alineadas exacto
    top: Math.random() * 90,
    opacity: Math.random() * 0.5 + 0.3,
    duration: Math.random() * 15 + 5,
    delay: Math.random() * 5
  }));

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 bg-gradient-to-br from-purple-900 via-pink-800 to-pink-600">
      
      {/* Estrellas flotantes */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="star absolute"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: `rgba(255, 255, 255, ${star.opacity})`,
            left: `${star.left}%`,
            top: `${star.top}%`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Card central */}
      <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-10 w-full max-w-md shadow-2xl border border-white/20 z-10">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">GalaxyApp</h1>
          <p className="text-cyan-100">Inicia sesión y explora tu universo digital</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-cyan-100">Correo Electrónico</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-3xl text-white placeholder-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm transition-all"
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-cyan-100">Contraseña</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-3xl text-white placeholder-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {loginOperation.error && <Alert type="error" message={loginOperation.error} />}

          <button
            type="submit"
            disabled={loginOperation.loading}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 px-4 rounded-3xl font-semibold shadow-lg hover:scale-105 transform transition-all duration-200 flex items-center justify-center gap-2"
          >
            {loginOperation.loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Iniciando sesión...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Iniciar Sesión
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-blue-100">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-cyan-300 hover:text-white font-medium transition-colors underline decoration-cyan-300">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        .star {
          clip-path: polygon(
            50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%,
            50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%
          );
          position: absolute;
          animation-name: floatStar;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        @keyframes floatStar {
          0% { transform: translateY(0) translateX(0) rotate(0deg); }
          50% { transform: translateY(-50px) translateX(20px) rotate(180deg); }
          100% { transform: translateY(0) translateX(0) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Login;

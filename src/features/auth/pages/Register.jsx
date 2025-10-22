import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { useAsyncOperation, OPERATION_DELAYS } from '../../../hooks/useAsyncOperation';
import Alert from '../../../components/Alert';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    document_number: '',
    name: '',
    paternal_lastname: '',
    maternal_lastname: '',
    email: '',
    phone: '',
    user_name: '',
    password: '',
    document_type_id: 1,
    country_id: 179,
  });

  const [success, setSuccess] = useState(false);
  const registerOperation = useAsyncOperation(OPERATION_DELAYS.REGISTER);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    registerOperation.reset();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSend = {
        ...formData,
        last_session: new Date().toISOString().split('T')[0],
        account_statement: true,
      };

      await registerOperation.execute(async () => registerUser(dataToSend));
      setSuccess(true);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error('Error en registro:', err);
    }
  };

  // Fondo animado de estrellas
  const starCount = 35;
  const stars = Array.from({ length: starCount }, (_, i) => ({
    size: Math.random() * 15 + 5,
    left: (i * (100 / starCount)) + Math.random() * 4,
    top: Math.random() * 90,
    opacity: Math.random() * 0.5 + 0.3,
    duration: Math.random() * 15 + 6,
    delay: Math.random() * 6,
  }));

  // Pantalla de éxito
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900 flex items-center justify-center px-4 relative overflow-hidden">
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
        <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-10 max-w-md w-full text-center shadow-2xl border border-white/20 animate-fadeIn z-10">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
            ¡Registro exitoso!
          </h2>
          <p className="text-green-100 text-lg">Redirigiendo al inicio de sesión...</p>
          <div className="mt-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-300 mx-auto"></div>
          </div>
        </div>

        <style>{`
          .star {
            clip-path: polygon(
              50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%,
              50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%
            );
            position: absolute;
            animation: floatStar ease-in-out infinite;
          }
          @keyframes floatStar {
            0% { transform: translateY(0) translateX(0) rotate(0deg); }
            50% { transform: translateY(-50px) translateX(20px) rotate(180deg); }
            100% { transform: translateY(0) translateX(0) rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Formulario principal
  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-purple-900 via-pink-800 to-pink-600 overflow-hidden px-4 py-12">
      {/* Fondo con estrellas */}
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
      <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-10 w-full max-w-2xl shadow-2xl border border-white/20 animate-fadeIn z-10">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
            GalaxyApp
          </h1>
          <p className="text-cyan-100">Crea tu cuenta y explora tu universo digital</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "N° Documento", name: "document_number", type: "text", placeholder: "12345678" },
              { label: "Nombre", name: "name", type: "text", placeholder: "Juan" },
              { label: "Apellido Paterno", name: "paternal_lastname", type: "text", placeholder: "Pérez" },
              { label: "Apellido Materno", name: "maternal_lastname", type: "text", placeholder: "García" },
              { label: "Correo Electrónico", name: "email", type: "email", placeholder: "tu@email.com" },
              { label: "Teléfono", name: "phone", type: "tel", placeholder: "999888777" },
              { label: "Nombre de Usuario", name: "user_name", type: "text", placeholder: "juanperez" },
              { label: "Contraseña", name: "password", type: "password", placeholder: "Mínimo 8 caracteres" },
            ].map((field) => (
              <div key={field.name} className="space-y-2">
                <label htmlFor={field.name} className="block text-sm font-medium text-cyan-100">
                  {field.label}
                </label>
                <input
                  id={field.name}
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  minLength={field.name === "password" ? 8 : undefined}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-3xl text-white placeholder-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm transition-all duration-200 hover:scale-105 transform"
                />
              </div>
            ))}
          </div>

          {registerOperation.error && <Alert type="error" message={registerOperation.error} />}

          <button
            type="submit"
            disabled={registerOperation.loading}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 px-4 rounded-3xl font-semibold shadow-lg hover:scale-105 transform transition-all duration-200 flex items-center justify-center gap-2"
          >
            {registerOperation.loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Registrando...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Crear Cuenta
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-cyan-100">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-cyan-300 hover:text-white font-medium transition-colors underline decoration-cyan-300">
              Inicia sesión aquí
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
          animation: floatStar ease-in-out infinite;
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

export default Register;

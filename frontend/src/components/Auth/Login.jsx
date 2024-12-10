import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { showSuccessToast } from '../Utils/toastUtils';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrors({});
    setGeneralError('');

    let formIsValid = true;
    const newErrors = {};

    if (!email) {
      formIsValid = false;
      newErrors.email = 'Email tidak boleh kosong';
    }

    if (!password) {
      formIsValid = false;
      newErrors.password = 'Password tidak boleh kosong';
    }

    if (!formIsValid) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    showSuccessToast('Login berhasil');
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleInputChange = (field, value) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);
  };

  return (
    <div className="w-full flex items-center justify-center mt-28 mb-20">
      <div className="max-w-[330px] sm:max-w-[450px]">
        <div className="max-w-full flex justify-center sm:mb-5">
          <img className="text-center w-6 h-6 sm:w-12 sm:h-full" src="../../public/kreatikode-logo.png" />
        </div>
        <h1 className="text-[26px] font-semibold text-center">Selamat Datang di KreatiKode 👋🏻</h1>
        <p className="text-center text-base text-gray-500 mt-2">Silahkan masukkan email dan password untuk akses akun kamu di Kreatikode.</p>

        {generalError && <p className="text-red-500 text-center mt-4">{generalError}</p>}

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="space-y-6 mt-4 sm:mt-8 " autoComplete="off">
          <div className="flex flex-col">
            <label className="text-base font-medium">Masukkan Email</label>
            <input
              type="email"
              name="email-login"
              className={`w-full border-2 rounded-xl p-3 mt-1 bg-transparent focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'}`}
              placeholder="Masukan email anda"
              value={email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              autoComplete="off"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="flex flex-col">
            <label className="text-base font-medium">Masukkan Password</label>
            <div className="flex mt-2">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password-login"
                className={`w-full border-2 rounded-s-xl p-3 bg-transparent focus:outline-none ${errors.password ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'}`}
                placeholder="Masukan password anda"
                value={password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                autoComplete="off"
              />

              <button type="button" onClick={() => setShowPassword(!showPassword)} className="inline-flex items-center px-4 text-sm text-gray-900 bg-gray-100 hover:bg-gray-200 border-2 border-s-0 border-gray-200 rounded-e-md">
                {showPassword ? (
                  <svg className="w-6 h-6 text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
                    <path d="m4 15.6 3.055-3.056A4.913 4.913 0 0 1 7 12.012a5.006 5.006 0 0 1 5-5c.178.009.356.027.532.054l1.744-1.744A8.973 8.973 0 0 0 12 5.012c-5.388 0-10 5.336-10 7A6.49 6.49 0 0 0 4 15.6Z" />
                    <path d="m14.7 10.726 4.995-5.007A.998.998 0 0 0 18.99 4a1 1 0 0 0-.71.305l-4.995 5.007a2.98 2.98 0 0 0-.588-.21l-.035-.01a2.981 2.981 0 0 0-3.584 3.583c0 .012.008.022.01.033.05.204.12.402.211.59l-4.995 4.983a1 1 0 1 0 1.414 1.414l4.995-4.983c.189.091.386.162.59.211.011 0 .021.007.033.01a2.982 2.982 0 0 0 3.584-3.584c0-.012-.008-.023-.011-.035a3.05 3.05 0 0 0-.21-.588Z" />
                    <path d="m19.821 8.605-2.857 2.857a4.952 4.952 0 0 1-5.514 5.514l-1.785 1.785c.767.166 1.55.25 2.335.251 6.453 0 10-5.258 10-7 0-1.166-1.637-2.874-2.179-3.407Z" />
                  </svg>
                )}
                <span className="sr-only">{showPassword ? 'Hide' : 'Show'} password</span>
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div className="flex justify-between items-center mt-4">
            <div>
              <input className="rounded-[5px] sm:rounded-md" type="checkbox" id="remember" checked={rememberMe} onChange={handleRememberMeChange} />
              <label className="ml-2 font-medium text-base text-gray-600" htmlFor="remember">
                Ingat Saya
              </label>
            </div>
            <button className="font-medium text-base text-primary-500 hover:underline">Lupa Password?</button>
          </div>
          <div className="mt-8 flex flex-col gap-y-4">
            <button type="submit" className="w-full py-3 bg-primary-500 text-white rounded-xl font-semibold text-md hover:bg-blue-600 transition duration-200" disabled={isSubmitting}>
              {isSubmitting ? 'Loading...' : 'Masuk'}
            </button>
          </div>
        </form>

        {/* Register Link */}
        <div className="flex items-center justify-center mt-4">
          <p className="text-md font-regular text-center text-gray-600">
            Belum punya akun?{' '}
            <Link to="/register" className="font-medium text-primary-500 hover:underline">
              Daftar Sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

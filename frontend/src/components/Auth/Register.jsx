import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'flowbite-react';
import DatePicker from 'react-datepicker';
import { showErrorToast, showSuccessToast } from '../Utils/toastUtils';

function Register() {
  const navigate = useNavigate();
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const clearError = (field) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  const validateForm = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email diperlukan';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Format email tidak valid';
    }

    const phoneRegex = /^8\d{9,12}$/;
    if (!phone) {
      newErrors.phone = 'Nomor ponsel harus diisi.';
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = 'Nomor ponsel harus dimulai dengan "8" dan memiliki 10-13 digit.';
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!password) {
      newErrors.password = 'Kata sandi diperlukan.';
    } else if (!passwordRegex.test(password)) {
      newErrors.password = 'Kata sandi harus memiliki minimal 6 karakter, dengan 1 huruf besar, 1 huruf kecil, dan 1 angka';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi kata sandi diperlukan.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Kata sandi tidak cocok.';
    }

    if (!name) newErrors.name = 'Nama lengkap diperlukan';

    if (!gender) newErrors.gender = 'Jenis kelamin harus dipilih.';

    if (!selectedDate) newErrors.selectedDate = 'Tanggal lahir harus diisi.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormComplete = () => {
    return email && password && confirmPassword && name && gender && selectedDate && phone;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const simulatedResponse = { ok: true };

        if (simulatedResponse.ok) {
          showSuccessToast('Email berhasil terdaftar!');
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else if (simulatedResponse.status === 409) {
          showErrorToast('Email sudah terdaftar, silakan masuk menggunakan akun Anda');
          setErrors({ email: 'Email sudah terdaftar, silakan login.' });
        } else {
          console.error('Error: Terjadi kesalahan');
        }
      } catch (error) {
        console.log('Error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.startsWith('62')) {
      value = value.substring(2);
    }

    setPhone(value);
  };

  return (
    <div className="w-full flex items-center justify-center mt-28">
      <div className="w-[330px] sm:w-[420px]">
        <div className="max-w-full flex justify-center sm:mb-5">
          <img className="text-center w-6 h-6 sm:w-12 sm:h-full" src="../../public/kreatikode-logo.png" />
        </div>
        <h1 className="text-[26px]  font-semibold text-center">Pendaftaran Akun</h1>
        <p className="text-center text-base text-gray-500 mt-2">Yuk, daftarkan akunmu sekarang juga!</p>
        <form onSubmit={handleRegister} className="space-y-6 mt-8 mb-16">
          <div className="flex flex-col space-y-3">
            <label className="text-md font-medium">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full border-2 rounded-xl p-3 mt-1 bg-transparent focus:outline-none ${errors.fname ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'}`}
              placeholder="Masukan nama lengkap"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
                clearError('name');
              }}
            />
            {errors.fname && <p className="text-red-500 text-sm mt-1">{errors.fname}</p>}
          </div>
          <div className="flex flex-col space-y-3">
            <label className="text-md font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className={`w-full border-2 rounded-xl p-3 mt-1 bg-transparent focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'}`}
              placeholder="Masukan email anda"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearError('email');
              }}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Nomor Ponsel <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <p>+62</p>
              </span>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                className="bg-white border-[1px] border-gray-300 text-sm rounded-e-[10px] focus:bg-blue-100 focus:outline-gray-200 block w-full h-[50px] p-2.5"
                placeholder="Masukkan nomor ponsel"
                required
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
          <div className="flex space-x-4">
            <div>
              <label htmlFor="gender-select" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Jenis Kelamin <span className="text-red-500">*</span>
              </label>
              <select
                id="gender-select"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" disabled hidden>
                  Jenis Kelamin
                </option>
                <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
            </div>
            <div>
              <label htmlFor="default-datepicker" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Tanggal Lahir <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border-[1px] border-r-0 border-gray-300 rounded-l-md ">
                  <svg className="w-4 h-4 text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="custom-datepicker"
                  popperClassName="custom-datepicker-popper"
                  wrapperClassName="custom-datepicker-wrapper"
                  renderCustomHeader={({ date, changeYear, changeMonth }) => (
                    <div className="flex space-x-2 items-center justify-center custom-datepicker">
                      <select value={new Date(date).getFullYear()} onChange={({ target: { value } }) => changeYear(value)} className="px-2 py-1 border rounded-md focus:outline-none">
                        {Array.from({ length: 101 }).map((_, index) => (
                          <option key={index} value={1924 + index}>
                            {1924 + index}
                          </option>
                        ))}
                      </select>
                      <select value={new Date(date).getMonth()} onChange={({ target: { value } }) => changeMonth(value)} className="px-2 py-1 border rounded-md focus:outline-none">
                        {Array.from({ length: 12 }).map((_, index) => (
                          <option key={index} value={index}>
                            {new Date(0, index).toLocaleString('default', { month: 'long' })}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  required
                />
              </div>
              {errors.selectedDate && <p className="text-red-500 text-sm">{errors.selectedDate}</p>}
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <label className="text-md font-medium">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="flex mt-1">
              <input
                type={showPassword ? 'text' : 'password'}
                className={`w-full border-2 rounded-s-xl p-3 bg-transparent focus:outline-none ${errors.password ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'}`}
                placeholder="Masukan password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearError('password');
                }}
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
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div className="flex flex-col space-y-3">
            <label className="text-md font-medium">
              Konfirmasi Password <span className="text-red-500">*</span>
            </label>
            <div className="flex mt-1">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className={`w-full border-2 rounded-s-xl p-3 bg-transparent focus:outline-none ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'}`}
                placeholder="Konfirmasi password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  clearError('confirmPassword');
                }}
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="inline-flex items-center px-4 text-sm text-gray-900 bg-gray-100 hover:bg-gray-200 border-2 border-s-0 border-gray-200 rounded-e-md">
                {showConfirmPassword ? (
                  <svg className="w-6 h-6 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
                    <path d="m4 15.6 3.055-3.056A4.913 4.913 0 0 1 7 12.012a5.006 5.006 0 0 1 5-5c.178.009.356.027.532.054l1.744-1.744A8.973 8.973 0 0 0 12 5.012c-5.388 0-10 5.336-10 7A6.49 6.49 0 0 0 4 15.6Z" />
                    <path d="m14.7 10.726 4.995-5.007A.998.998 0 0 0 18.99 4a1 1 0 0 0-.71.305l-4.995 5.007a2.98 2.98 0 0 0-.588-.21l-.035-.01a2.981 2.981 0 0 0-3.584 3.583c0 .012.008.022.01.033.05.204.12.402.211.59l-4.995 4.983a1 1 0 1 0 1.414 1.414l4.995-4.983c.189.091.386.162.59.211.011 0 .021.007.033.01a2.982 2.982 0 0 0 3.584-3.584c0-.012-.008-.023-.011-.035a3.05 3.05 0 0 0-.21-.588Z" />
                    <path d="m19.821 8.605-2.857 2.857a4.952 4.952 0 0 1-5.514 5.514l-1.785 1.785c.767.166 1.55.25 2.335.251 6.453 0 10-5.258 10-7 0-1.166-1.637-2.874-2.179-3.407Z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>
          <div className="mt-8 flex flex-col gap-y-4">
            <button
              type="submit"
              className={`w-full py-3 rounded-xl font-medium text-md transition duration-200 ${isFormComplete() ? 'bg-primary-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              disabled={!isFormComplete()}
            >
              Daftar {isLoading && <Spinner size="sm" />}
            </button>
          </div>
          <div className="flex items-center justify-center mt-4">
            <p className="text-md font-regular text-center text-gray-600">
              Sudah punya akun?{' '}
              <a href="/Login" className="font-medium text-primary-500 hover:underline">
                Masuk Sekarang
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

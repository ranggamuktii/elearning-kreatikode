import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { showSuccessToast } from './Utils/toastUtils';

function Profile() {
  const [activeSection, setActiveSection] = useState('Detail Profil');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [ktp, setKtp] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (activeSection === 'Detail Profil') {
      if (!name) newErrors.name = 'Nama harus diisi.';
    }

    if (activeSection === 'Data Pribadi') {
      const phoneRegex = /^8\d{9,12}$/;
      if (!phone) {
        newErrors.phone = 'Nomor ponsel harus diisi.';
      } else if (!phoneRegex.test(phone)) {
        newErrors.phone = 'Nomor ponsel harus dimulai dengan "8" dan memiliki 10-13 digit.';
      }

      if (!selectedDate) newErrors.selectedDate = 'Tanggal lahir harus diisi.';
      if (!gender) newErrors.gender = 'Jenis kelamin harus dipilih.';
    }

    if (activeSection === 'Kata Sandi') {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
      if (!password) {
        newErrors.password = 'Password tidak boleh kosong.';
      } else if (!passwordRegex.test(password)) {
        newErrors.password = 'Password harus memiliki minimal 6 karakter, termasuk 1 huruf besar, 1 huruf kecil, dan 1 angka.';
      }

      if (!confirmPassword) {
        newErrors.confirmPassword = 'Konfirmasi password tidak boleh kosong.';
      } else if (confirmPassword !== password) {
        newErrors.confirmPassword = 'Konfirmasi password tidak cocok dengan password baru.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.startsWith('62')) {
      value = value.substring(2);
    } else if (value.startsWith('0')) {
      value = value.substring(1);
    }

    setPhone(value);
  };

  useEffect(() => {
    setPassword('');
    setConfirmPassword('');
  }, []);

  const handleSave = async () => {
    if (validateForm()) {
      showSuccessToast('Berhasil memperbarui profil');
    }
  };

  const contentMap = {
    'Detail Profil': (
      <div className="space-y-3 sm:space-y-5">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Detail Profil</h2>
        <div className="flex space-x-5">
          <div className="w-full">
            <label htmlFor="firstName" className="block mb-2 text-xs sm:text-sm font-normal text-gray-900 dark:text-white">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-describedby="helper-text-explanation"
              className="bg-white border-[1px] border-gray-300 text-xs sm:text-sm rounded-[10px] focus:bg-blue-100 focus:outline-gray-200 block w-full h-[50px] p-2.5"
              placeholder="Nama Lengkap"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="name" className="block mb-2 text-xs sm:text-sm font-normal text-gray-900 dark:text-white">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            // readOnly
            aria-describedby="helper-text-explanation"
            className="bg-white border-[1px] border-gray-300 text-xs sm:text-sm rounded-[10px] focus:bg-blue-100 focus:outline-gray-200 block w-full h-[50px] p-2.5"
            placeholder=""
            required
          />
        </div>
        <div className="w-full flex justify-end items-center">
          <button className="w-full text-sm sm:text-base sm:font-semibold px-4 py-2.5 rounded-lg bg-primary-500 hover:bg-primary-600 text-white" onClick={handleSave}>
            Simpan
          </button>
        </div>
      </div>
    ),
    'Data Pribadi': (
      <div className="space-y-3 sm:space-y-5">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Data Pribadi</h2>
        <div>
          <form className="w-full text-start flex flex-col sm:flex-colflex-warp space-y-4 sm:space-y-6 sm:space-x-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1">
                <label htmlFor="tel" className="block mb-2 text-xs sm:text-sm text-gray-900 dark:text-white">
                  Nomor Ponsel <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-xs sm:text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <p>+62</p>
                  </span>
                  <input
                    type="tel"
                    id="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="bg-white border-[1px] border-gray-300 text-xs sm:text-sm rounded-e-[10px] focus:bg-blue-100 focus:outline-gray-200 block w-full h-[50px] p-2.5"
                    placeholder="Masukkan nomor ponsel"
                    required
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs sm:text-sm">{errors.phone}</p>}
              </div>
              <div className="flex-1">
                <label htmlFor="default-datepicker" className="block mb-2 text-xs sm:text-sm text-gray-900 dark:text-white">
                  Tanggal Lahir <span className="text-red-500">*</span>
                </label>

                <div className="flex w-full">
                  <span className="inline-flex items-center px-3 text-xs sm:text-sm text-gray-900 bg-gray-200 border-[1px] border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <DatePicker
                    id="default-datepicker"
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
                  />
                </div>
                {errors.selectedDate && <p className="text-red-500 text-xs sm:text-sm">{errors.selectedDate}</p>}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1">
                <label htmlFor="ktp" className="block mb-2 text-xs sm:text-sm text-gray-900 dark:text-white">
                  Nomor KTP <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="ktp"
                  value={ktp}
                  onChange={(e) => setKtp(e.target.value)}
                  aria-describedby="helper-text-explanation"
                  className="bg-white border-[1px] border-gray-300 text-sm rounded-[10px] focus:bg-blue-100 focus:outline-gray-200 block w-full h-[50px] p-2.5"
                  placeholder=""
                  required
                />
                {errors.ktp && <p className="text-red-500 text-sm">{errors.ktp}</p>}
              </div>
              <div className="flex-1">
                <label htmlFor="gender-select" className="block mb-2 text-sm text-gray-900 dark:text-white">
                  Jenis Kelamin <span className="text-red-500">*</span>
                </label>
                <select
                  id="gender-select"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-[50px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Pilih Jenis Kelamin
                  </option>
                  <option value="male">Laki-laki</option>
                  <option value="female">Perempuan</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
              </div>
            </div>
          </form>
        </div>
        <div className="w-full flex justify-end items-center">
          <button className="w-full text-sm sm:text-base sm:font-semibold px-4 py-2.5 rounded-lg bg-primary-500 hover:bg-primary-600 text-white" onClick={handleSave}>
            Simpan
          </button>
        </div>
      </div>
    ),
    'Kata Sandi': (
      <div className="space-y-3 sm:space-y-5">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Ubah Kata Sandi</h2>
        <form className="flex flex-col space-y-4">
          <div>
            <label htmlFor="password" className="block mb-2 text-xs sm:text-sm font-normal text-gray-900 dark:text-white">
              Password Baru <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              aria-describedby="helper-text-explanation"
              className={`bg-white border-[1px] border-gray-300 text-xs sm:text-sm rounded-[10px] focus:bg-blue-100 focus:outline-gray-200 block w-full h-[50px] p-2.5 ${errors.password ? 'border-red-500' : ''}`}
              placeholder=""
              required
            />
            {errors.password && <p className="text-red-500 text-xs sm:text-sm">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-xs sm:text-sm font-normal text-gray-900 dark:text-white">
              Konfirmasi Password Baru <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              aria-describedby="helper-text-explanation"
              className={`bg-white border-[1px] border-gray-300 text-xs sm:text-sm rounded-[10px] focus:bg-blue-100 focus:outline-gray-200 block w-full h-[50px] p-2.5 ${errors.confirmPassword ? 'border-red-500' : ''}`}
              placeholder=""
              required
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs sm:text-sm">{errors.confirmPassword}</p>}
          </div>
        </form>
        <div className="w-full flex justify-end items-center">
          <button className="w-full text-sm sm:text-base sm:font-semibold px-4 py-2.5 rounded-lg bg-primary-500 hover:bg-primary-600 text-white" onClick={handleSave}>
            Simpan
          </button>
        </div>
      </div>
    ),
  };

  const sections = Object.keys(contentMap);

  return (
    <div className="w-full h-full sm:px-20">
      <ToastContainer />
      <div className="max-w-custom-1xl h-full flex flex-col mx-auto mt-[100px] sm:mt-[130px]">
        <h5 className="text-2xl font-semibold text-grey-800 text-start mb-5 sm:mb-4 px-5 sm:px-0">Ubah Profil</h5>
        <div className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-8 px-5 sm:px-0">
          <div className="w-full text-start flex basis-3/12 flex-col space-y-10">
            <div className=" bg-white sm:border sm:border-gray-200 rounded-[15px]">
              <ul className="bg-white border rounded-t-[10px] flex sm:hidden flex-row flex-wrap justify-center text-xs font-medium text-center text-gray-500">
                {sections.map((section) => (
                  <div key={section}>
                    <li className="mx-1">
                      <a
                        href="#"
                        onClick={() => setActiveSection(section)}
                        className={`inline-block px-4 py-5 ${activeSection === section ? 'text-primary-600 font-semibold' : 'text-gray-500 font-normal'}`}
                        aria-current={activeSection === section ? 'page' : undefined}
                      >
                        {section}
                      </a>
                    </li>
                  </div>
                ))}
              </ul>

              <ul className="hidden sm:block py-2 text-md text-gray-800 dark:text-gray-200" aria-labelledby="dropdownDividerButton">
                {sections.map((section) => (
                  <div key={section}>
                    <li>
                      <a href="#" onClick={() => setActiveSection(section)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        {section}
                      </a>
                    </li>
                    {section === 'Data Pribadi' && <hr className="border text-grey-500 my-3 mx-4" />}
                  </div>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full text-start flex basis-9/12 flex-col space-y-10">
            <div className="w-full h-full bg-white border border-gray-200 rounded-b-[15px] sm:rounded-[15px] px-5 py-5 sm:px-8 sm:py-8">{contentMap[activeSection]}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

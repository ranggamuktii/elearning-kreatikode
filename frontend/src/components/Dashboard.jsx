import Cookies from 'js-cookie';
import { decodeJwt } from 'jose';
import { useState, useEffect } from 'react';
import { showErrorToast, showSuccessToast } from './Utils/toastUtils';
import { ToastContainer } from 'react-toastify';
import DatePicker from 'react-datepicker';
import { updateProfileDetails, updatePersonalData, updatePassword } from '../services/api';
import { fetchCourses, getProgress } from '../services/api';
import { removeUserToken } from './Utils/tokendata';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';

const DashboardPage = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [activeProfileSection, setActiveProfileSection] = useState(null);
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeTab, setActiveTab] = useState('Semua Kelas');

  const [courses, setCourses] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = Cookies.get('TOKEN');
    if (token) {
      const decoded = decodeJwt(token);

      setUserDetails(decoded);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const { data } = await fetchCourses();

        if (!data || !Array.isArray(data)) {
          throw new Error('Invalid course data received');
        }

        const coursesWithProgress = await Promise.all(
          data.map(async (course) => {
            try {
              const progressResponse = await getProgress(course.id, userDetails.id);
              return {
                ...course,
                progress: progressResponse.data.progress || 0,
                completedSubmodules: progressResponse.data.completedSubmodules || 0,
                totalSubmodules: progressResponse.data.totalSubmodules || course.totalSubmodules || 0,
                icon: course.thumbnail ? `${import.meta.env.VITE_API_URL}/thumbnail//${course.thumbnail.split("\\").pop()}` : '/default-course-thumbnail.png', // Use a local default image
              };
            } catch (error) {
              console.error(`Error fetching progress for course ${course.id}:`, error);
              return {
                ...course,
                progress: 0,
                completedSubmodules: 0,
                totalSubmodules: course.totalSubmodules || 0,
                icon: course.thumbnail ? `${import.meta.env.VITE_API_URL}/thumbnail/${course.thumbnail}` : '/default-course-thumbnail.png',
              };
            }
          })
        );

        setCourses(coursesWithProgress);
      } catch (error) {
        console.error('Error loading courses:', error);
        showErrorToast('Gagal memuat data kelas');
        setError('Failed to load courses. Please try again later.');
      }
    };

    loadCourses();
  }, []);

  const filterCourses = (tab) => {
    switch (tab) {
      case 'Belum Dimulai':
        return courses.filter((course) => course.progress === 0);
      case 'Sedang Dipelajari':
        return courses.filter((course) => course.progress > 0 && course.progress < 100);
      case 'Selesai':
        return courses.filter((course) => course.progress === 100);
      default:
        return courses;
    }
  };

  const tabs = ['Semua Kelas', 'Belum Dimulai', 'Sedang Dipelajari', 'Selesai'];

  const filteredCourses = filterCourses(activeTab);

  const handleMenuClick = (menuText) => {
    if (menuText === 'Logout') {
      handleLogout();
      return;
    }
    setActiveMenu(menuText);
    setShowProfileDropdown(menuText === 'Profile');
    setActiveProfileSection(null);
    setPassword('');
    setConfirmPassword('');
  };

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
    setActiveMenu('Profile');
  };

  const handleProfileSectionClick = (section) => {
    setActiveProfileSection(section);
  };

  const handleLogout = async () => {
    try {
      removeUserToken();
      showSuccessToast('Berhasil logout');

      setTimeout(() => {
        Cookies.remove('TOKEN');
        window.location.pathname = '/';
      }, 2000);
    } catch (error) {
      console.error('Logout failed:', error);
      showErrorToast('Gagal logout');
    }
  };

  const sidebarItems = [
    {
      icon: (
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      text: 'Dashboard',
      path: '/profile',
    },
    {
      icon: (
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clipRule="evenodd" />
        </svg>
      ),
      text: 'Profile',
      hasDropdown: true,
    },
    {
      icon: (
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 19V5h4a1 1 0 0 1 1 1v11h1a1 1 0 0 1 0 2h-6Z" />
          <path fillRule="evenodd" d="M12 4.571a1 1 0 0 0-1.275-.961l-5 1.428A1 1 0 0 0 5 6v11H4a1 1 0 0 0 0 2h1.86l4.865 1.39A1 1 0 0 0 12 19.43V4.57ZM10 11a1 1 0 0 1 1 1v.5a1 1 0 0 1-2 0V12a1 1 0 0 1 1-1Z" clipRule="evenodd" />
        </svg>
      ),
      text: 'Kelas Saya',
      path: '/profile/my-classes',
    },
    {
      icon: (
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M9.586 2.586A2 2 0 0 1 11 2h2a2 2 0 0 1 2 2v.089l.473.196.063-.063a2.002 2.002 0 0 1 2.828 0l1.414 1.414a2 2 0 0 1 0 2.827l-.063.064.196.473H20a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-.089l-.196.473.063.063a2.002 2.002 0 0 1 0 2.828l-1.414 1.414a2 2 0 0 1-2.828 0l-.063-.063-.473.196V20a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-.089l-.473-.196-.063.063a2.002 2.002 0 0 1-2.828 0l-1.414-1.414a2 2 0 0 1 0-2.827l.063-.064L4.089 15H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h.09l.195-.473-.063-.063a2 2 0 0 1 0-2.828l1.414-1.414a2 2 0 0 1 2.827 0l.064.063L9 4.089V4a2 2 0 0 1 .586-1.414ZM8 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      text: 'Pengaturan',
      path: '/profile/settings',
    },
    {
      icon: (
        <svg className="w-5 h-5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
        </svg>
      ),
      text: 'Logout',
      onClick: handleLogout,
    },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (activeProfileSection === 'Detail Profil') {
      if (!name) newErrors.name = 'Nama harus diisi.';
    }
    if (activeProfileSection === 'Data Pribadi') {
      const phoneRegex = /^8\d{9,12}$/;
      if (!phone) {
        newErrors.phone = 'Nomor ponsel harus diisi.';
      } else if (!phoneRegex.test(phone)) {
        newErrors.phone = 'Nomor ponsel harus dimulai dengan "8" dan memiliki 10-13 digit.';
      }
      if (!selectedDate) newErrors.selectedDate = 'Tanggal lahir harus diisi.';
      if (!gender) newErrors.gender = 'Jenis kelamin harus dipilih.';
    }
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
    setName(userDetails.name);
    setPhone(userDetails.phone);
    setSelectedDate(userDetails.dateOfBirth);
    setGender(userDetails.gender);
    setPassword(userDetails.password);
  }, [userDetails]);

  const handleSave = async () => {
    try {
      setIsLoading(true);

      let isValid = false;
      let saveFunction;
      let successMessage;

      switch (activeProfileSection) {
        case 'Detail Profil':
          isValid = validateForm();
          saveFunction = () => updateProfileDetails(userDetails.id, { name });
          successMessage = 'Berhasil memperbarui profil';
          break;

        case 'Data Pribadi':
          isValid = validateForm();
          saveFunction = () =>
            updatePersonalData(userDetails.id, {
              phone,
              dateOfBirth: selectedDate,
              gender,
            });
          successMessage = 'Berhasil memperbarui data pribadi';
          break;

        default:
          if (activeMenu === 'Pengaturan') {
            isValid = validateForm();
            saveFunction = () => updatePassword(userDetails.id, { password });
            successMessage = 'Berhasil memperbarui password';
          }
          break;
      }

      if (!isValid) {
        return;
      }

      const response = await saveFunction();

      if (response?.status === 200 || response?.status === 201) {
        showSuccessToast(successMessage);

        // Update local state based on the section
        if (activeProfileSection === 'Detail Profil') {
          setUserDetails((prev) => ({ ...prev, name }));
        } else if (activeProfileSection === 'Data Pribadi') {
          setUserDetails((prev) => ({
            ...prev,
            phone,
            dateOfBirth: selectedDate,
            gender,
          }));
        } else if (activeMenu === 'Pengaturan') {
          setPassword('');
          setConfirmPassword('');
        }
      } else {
        throw new Error('Gagal menyimpan perubahan');
      }
    } catch (error) {
      console.error('Save error:', error);
      showErrorToast(error.message || 'Terjadi kesalahan saat menyimpan data');
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (activeMenu === 'Dashboard') {
      return renderWelcomeContent();
    }
    if (activeProfileSection) {
      return renderProfileContent();
    }
    if (activeMenu === 'Pengaturan') {
      return renderSettingsContent();
    }
    if (activeMenu === 'Kelas Saya') {
      return renderClassContent();
    }
    return renderWelcomeContent();
  };

  const renderWelcomeContent = () => {
    if (isLoading) {
      return <div className="p-6">Loading...</div>;
    }

    if (error) {
      return <div className="p-6 text-red-500">{error}</div>;
    }

    const lastActiveCourse = courses.find((course) => course.progress > 0 && course.progress < 100);

    return (
      <div className="p-6">
        <div className="bg-primary-500 text-white rounded-lg p-8 mb-8">
          <h1 className="text-2xl font-bold mb-2">Halo, {userDetails?.name || 'Selamat Datang'}!</h1>
          <p className="text-lg">Mulai belajar lagi, dan jadilah mahir bersama Kreatikode.</p>
        </div>

        {lastActiveCourse ? (
          <div>
            <h2 className="text-lg text-gray-600 mb-6">Lanjutkan Progress Terakhir Kelas</h2>
            <div className="bg-white rounded-lg p-4 border flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={lastActiveCourse.icon} alt={lastActiveCourse.title} className="rounded-lg w-24 h-24" />
                <div>
                  <h3 className="font-medium text-lg mb-2">{lastActiveCourse.title}</h3>
                  <span className="flex items-center gap-1">📚 {lastActiveCourse.totalSubmodules} Materi</span>
                  <div className="mt-2">
                    <div className="w-64 h-2 bg-gray-200 rounded-full">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${lastActiveCourse.progress}%` }} />
                    </div>
                    <span className="text-sm text-gray-500">
                      {lastActiveCourse.completedSubmodules} / {lastActiveCourse.totalSubmodules} Materi
                    </span>
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 text-white bg-primary-500 rounded-lg hover:bg-primary-600">Lihat Detail Kelas</button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">Belum ada kelas yang sedang dipelajari</div>
        )}
      </div>
    );
  };

  const renderProfileContent = () => {
    switch (activeProfileSection) {
      case 'Detail Profil':
        return (
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-semibold mb-5">Detail Profil</h2>
            <div className="space-y-5">
              <div>
                <label className="block mb-2 text-xs sm:text-sm ">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 border-gray-300 rounded-xl text-xs sm:text-sm "
                  placeholder="Nama Lengkap"
                  aria-describedby="helper-text-explanation"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-xs sm:text-sm">
                  Email <span className="text-red-500">*</span>
                </label>
                <input type="email" value={userDetails.email} className="w-full p-2.5 border-gray-300 rounded-xl text-xs sm:text-sm " readOnly />
              </div>
            </div>
            <button onClick={handleSave} className="bg-primary-500 text-white py-2 px-5 rounded-xl">
              Simpan
            </button>
          </div>
        );

      case 'Data Pribadi':
        return (
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-semibold">Data Pribadi</h2>
            <div className="space-y-3">
              <div>
                <label className="block mb-2 text-sm">
                  Nomor Ponsel <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-gray-200 border rounded-l-lg">+62</span>
                  <input type="tel" value={phone} onChange={handlePhoneChange} className="flex-1 p-2 border-gray-300 rounded-r-lg" />
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm">
                  Tanggal Lahir <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-gray-200 border rounded-l-lg">
                    <svg className="w-5 h-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
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
                    className="custom-datepicker w-full p-2 border rounded-lg"
                    popperClassName="custom-datepicker-popper"
                    wrapperClassName="custom-datepicker-wrapper"
                    renderCustomHeader={({ date, changeYear, changeMonth }) => (
                      <div className="flex space-x-2 items-center justify-center ">
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
              </div>
              <div>
                <label className="block mb-2 text-sm">
                  Jenis Kelamin <span className="text-red-500">*</span>
                </label>
                <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-2 border-gray-300 rounded-lg">
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="male">Laki-laki</option>
                  <option value="female">Perempuan</option>
                </select>
              </div>
            </div>
            <button onClick={handleSave} className="w-full bg-primary-500 text-white p-2 rounded-lg">
              Simpan
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  const renderSettingsContent = () => {
    return (
      <div className="p-4 space-y-4">
        <h2 className="text-lg font-semibold">Ubah Kata Sandi</h2>
        <div className="space-y-3">
          <div>
            <label className="block mb-2 text-sm">
              Password Baru <span className="text-red-500">*</span>
            </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block mb-2 text-sm">
              Konfirmasi Password <span className="text-red-500">*</span>
            </label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-2 border-gray-300 rounded-lg" />
          </div>
        </div>
        <button onClick={handleSave} className="w-full bg-primary-500 text-white p-2 rounded-lg">
          Simpan
        </button>
      </div>
    );
  };

  const renderClassContent = () => {
    if (isLoading) {
      return <div className="p-6">Loading...</div>;
    }

    if (error) {
      return <div className="p-6 text-red-500">{error}</div>;
    }

    return (
      <>
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <h1 className="text-2xl font-semibold px-4 py-4">Kelas Saya</h1>
          <div className="border-b px-4 py-3">
            <div className="flex space-x-6">
              {tabs.map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-2 ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 space-y-4">
            {filteredCourses.length === 0 ? (
              <div className="text-center py-8 text-gray-500">Tidak ada kelas yang tersedia untuk kategori ini</div>
            ) : (
              filteredCourses.map((course) => (
                <div key={course.id} className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center space-x-4">
                    <img src={course.icon} alt={course.title} className="w-12 h-12 rounded-lg" />
                    <div>
                      <h3 className="font-medium">{course.title}</h3>
                      <span className="flex items-center">📚 {course.materials.length}</span>
                      <div className="mt-2">
                        <div className="w-64 h-2 bg-gray-200 rounded-full">
                          <div className="h-full bg-blue-600 rounded-full" style={{ width: `${course.progress}%` }} />
                        </div>
                        <span className="text-sm text-gray-500">
                          {course.completedSubmodules} / {course.totalSubmodules} Submateri
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="px-4 py-2 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50"
                    onClick={() => {
                      console.log(`Viewing details for course: ${course.title}`);
                    }}
                  >
                    Lihat Detail Kelas
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <ToastContainer />
      <div className="flex">
        <aside className="w-64 bg-white min-h-screen p-4 border-r">
          <div className="flex flex-col items-center space-y-5 mb-8">
            <img
              src={userDetails?.photoURL || 'https://placehold.co/400x400/png'}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/400x400/png';
              }}
            />
            <h3 className="font-medium">{userDetails?.name || 'User'}</h3>
          </div>

          <div className="space-y-2">
            {sidebarItems.map((item, index) => (
              <div key={index}>
                <div
                  onClick={item.text === 'Profile' ? handleProfileClick : item.text === 'Logout' ? item.onClick : () => handleMenuClick(item.text)}
                  className={`flex items-center space-x-3 p-2 text-sm sm:text-base rounded-lg cursor-pointer
          ${activeMenu === item.text ? 'bg-primary-100 bg-opacity-30 text-primary-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
                {item.text === 'Profile' && showProfileDropdown && (
                  <div className="pl-8 py-2 space-y-3">
                    <div onClick={() => handleProfileSectionClick('Detail Profil')} className={`cursor-pointer p-2 hover:text-primary-600 ${activeProfileSection === 'Detail Profil' ? 'text-primary-600 bg-gray-50 rounded-lg' : ''}`}>
                      Detail Profil
                    </div>
                    <div onClick={() => handleProfileSectionClick('Data Pribadi')} className={`cursor-pointer p-2 hover:text-primary-600 ${activeProfileSection === 'Data Pribadi' ? 'text-primary-600 bg-gray-50 rounded-lg' : ''}`}>
                      Data Pribadi
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;

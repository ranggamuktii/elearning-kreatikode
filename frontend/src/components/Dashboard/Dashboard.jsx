import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { decodeJwt } from 'jose';
import { ToastContainer } from 'react-toastify';
import { showErrorToast, showSuccessToast } from '../Utils/toastUtils';
import { removeUserToken } from '../Utils/tokendata';
import { updateProfileDetails, updatePersonalData, updatePassword, updateUser, fetchCourses, getProgress } from '../../services/api';

import Sidebar from './Sidebar';
import Welcome from './Welcome';
import { DetailProfile, PersonalData } from './Profile';
import Settings from './Setting';
import MyCourse from './MyCourse';

const DashboardPage = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [activeProfileSection, setActiveProfileSection] = useState(null);
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [userDetails, setUserDetails] = useState({});
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeTab, setActiveTab] = useState('Semua Kelas');
  const [uploading, setUploading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Constants
  const tabs = ['Semua Kelas', 'Sedang Dipelajari', 'Selesai'];

  // Definisi sidebarItems
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
    },
    {
      icon: (
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clipRule="evenodd" />
        </svg>
      ),
      text: 'Profile',
      hasDropdown: true,
    },
    {
      icon: (
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 19V5h4a1 1 0 0 1 1 1v11h1a1 1 0 0 1 0 2h-6Z" />
          <path fillRule="evenodd" d="M12 4.571a1 1 0 0 0-1.275-.961l-5 1.428A1 1 0 0 0 5 6v11H4a1 1 0 0 0 0 2h1.86l4.865 1.39A1 1 0 0 0 12 19.43V4.57Z" clipRule="evenodd" />
        </svg>
      ),
      text: 'Kelas Saya',
    },
    {
      icon: (
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M9.586 2.586A2 2 0 0 1 11 2h2a2 2 0 0 1 2 2v.089l.473.196.063-.063a2.002 2.002 0 0 1 2.828 0l1.414 1.414a2 2 0 0 1 0 2.827l-.063.064.196.473H20a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-.089l-.196.473.063.063a2.002 2.002 0 0 1 0 2.828l-1.414 1.414a2 2 0 0 1-2.828 0l-.063-.063-.473.196V20a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-.089l-.473-.196-.063.063a2.002 2.002 0 0 1-2.828 0l-1.414-1.414a2 2 0 0 1 0-2.827l.063-.064L4.089 15H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h.09l.195-.473-.063-.063a2 2 0 0 1 0-2.828l1.414-1.414a2 2 0 0 1 2.827 0l.064.063L9 4.089V4a2 2 0 0 1 .586-1.414Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      text: 'Pengaturan',
    },
    {
      icon: (
        <svg className="w-5 h-5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
        </svg>
      ),
      text: 'Logout',
    },
  ];

  // Handler untuk nomor telepon
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.startsWith('62')) {
      value = value.substring(2);
    } else if (value.startsWith('0')) {
      value = value.substring(1);
    }
    setPhone(value);
  };

  // Handler untuk upload file
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      showErrorToast('Hanya file JPG, JPEG, dan PNG yang diperbolehkan');
      return;
    }

    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      showErrorToast('Ukuran file maksimal 2MB');
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('photo', file);

      const response = await updateUser(userDetails.id, formData);

      if (response?.status === 200) {
        setUserDetails((prev) => ({
          ...prev,
          photoURL: response.data.photoURL,
        }));
        showSuccessToast('Foto profil berhasil diperbarui');
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      showErrorToast(error.response?.data?.message || 'Gagal mengunggah foto');
    } finally {
      setUploading(false);
    }
  };

  // Handler untuk upload avatar
  const handleUpload = () => {
    document.getElementById('fileInput').click();
  };

  // Fungsi untuk menampilkan inisial nama
  const displayNameAlias = () => {
    return userDetails.name ? `${userDetails.name.charAt(0)}`.toUpperCase() : '';
  };

  // Validation
  const validateForm = () => {
    const errors = {};

    if (activeProfileSection === 'Detail Profil' && !name) {
      errors.name = 'Nama harus diisi';
    }

    if (activeProfileSection === 'Data Pribadi') {
      if (!phone) errors.phone = 'Nomor telepon harus diisi';
      if (!selectedDate) errors.date = 'Tanggal lahir harus diisi';
      if (!gender) errors.gender = 'Jenis kelamin harus dipilih';
    }

    if (activeMenu === 'Pengaturan') {
      if (!password) errors.password = 'Password baru harus diisi';
      if (password !== confirmPassword) {
        errors.confirmPassword = 'Password tidak cocok';
      }
    }

    return Object.keys(errors).length === 0;
  };

  // Handler untuk menyimpan perubahan
  const handleSave = async () => {
    try {
      if (!validateForm()) {
        showErrorToast('Mohon lengkapi semua field yang diperlukan');
        return;
      }

      setIsLoading(true);
      let response;

      switch (activeProfileSection) {
        case 'Detail Profil':
          response = await updateProfileDetails(userDetails.id, { name });
          if (response.status === 200) {
            setUserDetails((prev) => ({ ...prev, name }));
            showSuccessToast('Profil berhasil diperbarui');
          }
          break;

        case 'Data Pribadi':
          response = await updatePersonalData(userDetails.id, {
            phone,
            dateOfBirth: selectedDate,
            gender,
          });
          if (response.status === 200) {
            setUserDetails((prev) => ({
              ...prev,
              phone,
              dateOfBirth: selectedDate,
              gender,
            }));
            showSuccessToast('Data pribadi berhasil diperbarui');
          }
          break;

        case 'Pengaturan':
          response = await updatePassword(userDetails.id, { password });
          if (response.status === 200) {
            setPassword('');
            setConfirmPassword('');
            showSuccessToast('Password berhasil diperbarui');
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.error('Save error:', error);
      showErrorToast(error.response?.data?.message || 'Terjadi kesalahan saat menyimpan');
    } finally {
      setIsLoading(false);
    }
  };

  // Effects
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
        const coursesWithProgress = await Promise.all(
          data.map(async (course) => {
            try {
              const progressResponse = await getProgress(course.id, userDetails.id);
              return {
                ...course,
                progress: progressResponse.data.progress || 0,
                completedSubmodules: progressResponse.data.completedSubmodules || 0,
                totalSubmodules: progressResponse.data.totalSubmodules || course.totalSubmodules || 0,
                icon: course.thumbnail ? `${import.meta.env.VITE_API_URL}/thumbnail/${course.thumbnail}` : '/default-course-thumbnail.png',
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
  }, [userDetails.id]);

  // Handlers
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

  const filterCourses = (tab) => {
    switch (tab) {
      case 'Sedang Dipelajari':
        return courses.filter((course) => course.progress > 0 && course.progress < 100);
      case 'Selesai':
        return courses.filter((course) => course.progress === 100);
      default:
        return courses;
    }
  };

  const renderContent = () => {
    if (activeMenu === 'Dashboard') {
      const lastActiveCourse = courses.find((course) => course.progress > 0 && course.progress < 100);
      return <Welcome isLoading={isLoading} error={error} userDetails={userDetails} lastActiveCourse={lastActiveCourse} />;
    }

    if (activeProfileSection === 'Detail Profil') {
      return <DetailProfile name={name} setName={setName} userDetails={userDetails} handleFileChange={handleFileChange} uploading={uploading} handleUpload={handleUpload} displayNameAlias={displayNameAlias} handleSave={handleSave} />;
    }

    if (activeProfileSection === 'Data Pribadi') {
      return <PersonalData phone={phone} handlePhoneChange={handlePhoneChange} selectedDate={selectedDate} setSelectedDate={setSelectedDate} gender={gender} setGender={setGender} handleSave={handleSave} />;
    }

    if (activeMenu === 'Pengaturan') {
      return <Settings password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} handleSave={handleSave} />;
    }

    if (activeMenu === 'Kelas Saya') {
      return <MyCourse isLoading={isLoading} error={error} tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} filteredCourses={filterCourses(activeTab)} />;
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <ToastContainer />
      <div className="flex">
        <Sidebar
          userDetails={userDetails}
          sidebarItems={sidebarItems}
          activeMenu={activeMenu}
          showProfileDropdown={showProfileDropdown}
          activeProfileSection={activeProfileSection}
          handleProfileClick={handleProfileClick}
          handleProfileSectionClick={handleProfileSectionClick}
          handleMenuClick={handleMenuClick}
        />
        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;

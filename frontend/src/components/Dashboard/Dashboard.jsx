import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { decodeJwt } from 'jose';
import { ToastContainer } from 'react-toastify';
import { showErrorToast, showSuccessToast } from '../Utils/toastUtils';
import { removeUserToken, getUserData, setUserToken } from '../Utils/tokendata';
import { updateProfileDetails, updatePersonalData, updatePassword, fetchCourses, getProgress } from '../../services/api';

import Sidebar from './Sidebar';
import Welcome from './Welcome';
import { DetailProfile, PersonalData } from './Profile';
import Settings from './Setting';
import MyCourse from './MyCourse';
import ModalValidation from './ModalValidation';
import ModalLogout from './ModalLogout';
import MobileSidebar from './MobileSidebar';

const DashboardPage = ({ defaultMenu = 'Dashboard' }) => {
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
  const [temporaryPhoto, setTemporaryPhoto] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [nextPath, setNextPath] = useState('');
  const [nextMenu, setNextMenu] = useState('');
  const [nextSection, setNextSection] = useState('');

  const tabs = ['Semua Kelas', 'Sedang Dipelajari', 'Selesai'];

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

  const resetFileState = () => {
    if (temporaryPhoto) {
      URL.revokeObjectURL(temporaryPhoto);
      setTemporaryPhoto(null);
    }
    setSelectedFile(null);
  };

  useEffect(() => {
    return () => {
      resetFileState();
    };
  }, []);

  const resetAllStates = () => {
    resetFileState();

    const currentUserData = getUserData();
    setName(currentUserData.name);
    setPhone(currentUserData.phone?.replace(/^62/, ''));
    setSelectedDate(currentUserData.dateOfBirth);
    setGender(currentUserData.gender);
    setPassword('');
    setConfirmPassword('');
    setShowDiscardModal(false);
    setIsNavigating(false);
    setNextPath('');
    setNextMenu('');
    setNextSection('');
  };

  useEffect(() => {
    if (defaultMenu) {
      setActiveMenu(defaultMenu);
    }
  }, [defaultMenu]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const hasUnsavedChanges =
        temporaryPhoto !== null ||
        selectedFile !== null ||
        (userDetails.name && name !== userDetails.name) ||
        (userDetails.phone && phone !== userDetails.phone) ||
        (userDetails.dateOfBirth && selectedDate?.toISOString() !== new Date(userDetails.dateOfBirth).toISOString()) ||
        (userDetails.gender && gender !== userDetails.gender) ||
        password !== '' ||
        confirmPassword !== '';

      if (hasUnsavedChanges && !isLoading) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [temporaryPhoto, selectedFile, name, phone, selectedDate, gender, password, confirmPassword, isLoading, userDetails]);

  useEffect(() => {
    return () => {
      if (temporaryPhoto) {
        URL.revokeObjectURL(temporaryPhoto);
      }
    };
  }, []);

  useEffect(() => {
    const fetchUserData = () => {
      const token = Cookies.get('TOKEN');
      if (token) {
        const decoded = decodeJwt(token);
        setUserDetails(decoded);
      }

      const userData = getUserData();
      if (Object.keys(userData).length > 0) {
        setUserDetails(userData);
        setName(userData.name || '');
        setPhone(userData.phone || '');
        setSelectedDate(userData.dateOfBirth ? new Date(userData.dateOfBirth) : null);
        setGender(userData.gender || '');
        setPassword('');
        setConfirmPassword('');
      } else {
        window.location.pathname = '/';
      }
      setIsLoading(false);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const { data: coursesData } = await fetchCourses();

        const coursesWithProgress = await Promise.all(
          coursesData.map(async (course) => {
            try {
              const response = await getProgress(course._id, userDetails.id);
              const progressData = response.data.data[0];

              const totalMaterials = course.materials.length || 0;
              const completedMaterials = progressData?.completedMaterials?.length || 0;
              const progressPercentage = totalMaterials > 0 ? (completedMaterials / totalMaterials) * 100 : 0;

              return {
                ...course,
                progress: {
                  percentage: Math.round(progressPercentage),
                  completedMaterials: progressData?.completedMaterials || [],
                  lastAccessedMaterial: progressData?.lastAccessedMaterial || null,
                },
              };
            } catch (error) {
              console.error(`Error fetching progress for course ${course._id}:`, error);
              return {
                ...course,
                progress: {
                  percentage: 0,
                  completedMaterials: [],
                  lastAccessedMaterial: null,
                },
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

    if (userDetails?.id) {
      loadCourses();
    }
  }, [userDetails?.id]);

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.startsWith('62')) {
      value = value.substring(2);
    } else if (value.startsWith('0')) {
      value = value.substring(1);
    }
    setPhone(value);
  };

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

    setUploading(true);
    try {
      const tempUrl = URL.createObjectURL(file);
      setTemporaryPhoto(tempUrl);
      setSelectedFile(file);
    } catch (error) {
      console.error('Error handling file:', error);
      showErrorToast('Gagal memproses file');
    } finally {
      setUploading(false);
    }
  };

  const handleDiscardChanges = () => {
    resetAllStates();

    if (isNavigating) {
      if (nextPath) {
        if (nextPath === '/') {
          handleLogout();
        } else {
          window.location.pathname = nextPath;
        }
      } else if (nextMenu) {
        navigateToMenu(nextMenu);
      } else if (nextSection) {
        setActiveProfileSection(nextSection);
      }
    }
  };

  const handleUpload = () => {
    document.getElementById('fileInput').click();
  };

  const displayNameAlias = () => {
    return userDetails.name ? `${userDetails.name.charAt(0)}`.toUpperCase() : '';
  };

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

  const handleSave = async () => {
    try {
      if (!validateForm()) {
        showErrorToast('Mohon lengkapi semua field yang diperlukan');
        return;
      }

      setIsLoading(true);
      let response;
      let shouldRedirect = false;

      switch (activeProfileSection) {
        case 'Detail Profil':
          // Update foto jika ada
          if (selectedFile) {
            const photoFormData = new FormData();
            photoFormData.append('photo', selectedFile);

            try {
              response = await updateProfileDetails(userDetails.id, photoFormData);
              if (response.data?.token) {
                setUserToken(response.data.token);
                shouldRedirect = true;
              }
            } catch (error) {
              console.error('Photo upload error:', error);
              showErrorToast('Gagal mengupload foto');
            }
          }

          // Update nama jika berubah
          if (name !== userDetails.name) {
            try {
              response = await updateProfileDetails(userDetails.id, { name });

              if (response.data?.token) {
                setUserToken(response.data.token);

                setUserDetails((prevDetails) => ({
                  ...prevDetails,
                  name: name,
                }));

                shouldRedirect = true;
                showSuccessToast('Nama berhasil diperbarui');
              }
            } catch (error) {
              console.error('Name update error:', error);
              showErrorToast('Gagal mengupdate nama');
            }
          }

          // Redirect jika ada perubahan
          if (shouldRedirect) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            resetAllStates();
            window.location.pathname = '/profile';
          }
          break;

        case 'Data Pribadi':
          response = await updatePersonalData(userDetails.id, {
            phone,
            dateOfBirth: selectedDate,
            gender,
          });

          if (response.status === 200 && response.data?.token) {
            setUserToken(response.data.token);
            showSuccessToast('Data pribadi berhasil diperbarui');
            await new Promise((resolve) => setTimeout(resolve, 1000));
            resetAllStates();
            window.location.pathname = '/profile';
          }
          break;

        case 'Pengaturan':
          response = await updatePassword(userDetails.id, { password });
          if (response.status === 200) {
            showSuccessToast('Password berhasil diperbarui');
            await new Promise((resolve) => setTimeout(resolve, 1000));
            resetAllStates();
            window.location.pathname = '/profile';
          }
          break;

        default:
          break;
      }
    } catch (error) {
      showErrorToast(error.response?.data?.message || 'Terjadi kesalahan saat menyimpan');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMenuClick = (menuText) => {
    console.log('Menu clicked:', menuText);
    if (temporaryPhoto) {
      setShowDiscardModal(true);
      setIsNavigating(true);
      setNextPath(menuText === 'Logout' ? '/' : null);
      setNextMenu(menuText);
      return;
    }

    if (menuText === 'Logout') {
      console.log('Setting logout modal to true');
      setShowLogoutModal(true);
      return;
    }

    navigateToMenu(menuText);
  };

  const navigateToMenu = (menuText) => {
    setActiveMenu(menuText);
    setShowProfileDropdown(menuText === 'Profile');
    setActiveProfileSection(menuText);
    setPassword('');
    setConfirmPassword('');
  };

  const handleProfileClick = () => {
    if (temporaryPhoto) {
      setShowDiscardModal(true);
      setIsNavigating(true);
      setNextMenu('Profile');
      return;
    }

    setShowProfileDropdown(!showProfileDropdown);
    setActiveMenu('Profile');
    setActiveProfileSection('Detail Profil');
  };

  const handleProfileSectionClick = (section) => {
    if (temporaryPhoto) {
      setShowDiscardModal(true);
      setIsNavigating(true);
      setNextSection(section);
      return;
    }

    setActiveProfileSection(section);
  };

  const handleLogout = async () => {
    console.log('Logout initiated');
    try {
      removeUserToken();
      showSuccessToast('Berhasil logout');
      console.log('Closing logout modal');
      setShowLogoutModal(false);
      setTimeout(() => {
        Cookies.remove('TOKEN');
        window.location.pathname = '/';
      }, 2000);
    } catch (error) {
      console.error('Logout failed:', error);
      showErrorToast('Gagal logout');
      setShowLogoutModal(false);
    }
  };

  const filterCourses = (tab) => {
    switch (tab) {
      case 'Semua Kelas':
        return courses;
      case 'Sedang Dipelajari':
        return courses.filter((course) => course.progress.percentage > 0 && course.progress.percentage < 100);
      case 'Selesai':
        return courses.filter((course) => course.progress.percentage === 100);
      default:
        return courses;
    }
  };

  const renderContent = () => {
    if (activeMenu === 'Dashboard') {
      const lastActiveCourse = courses.find((course) => course.progress.percentage > 0 && course.progress.percentage < 100);
      return <Welcome isLoading={isLoading} error={error} userDetails={userDetails} lastActiveCourse={lastActiveCourse} />;
    }

    if (activeProfileSection === 'Detail Profil') {
      return (
        <DetailProfile
          userDetails={userDetails}
          handleFileChange={handleFileChange}
          uploading={uploading}
          handleUpload={handleUpload}
          displayNameAlias={displayNameAlias}
          handleSave={handleSave}
          temporaryPhoto={temporaryPhoto}
          handleDiscardChanges={handleDiscardChanges}
          name={name}
          onNameChange={setName}
        />
      );
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
    <div className="min-h-screen bg-gray-50 mt-16 sm:mt-20">
      <ToastContainer />
      <div className="flex">
        <div className="hidden md:block">
          <Sidebar
            userDetails={{
              ...userDetails,
              temporaryPhoto: temporaryPhoto,
            }}
            sidebarItems={sidebarItems}
            activeMenu={activeMenu}
            showProfileDropdown={showProfileDropdown}
            activeProfileSection={activeProfileSection}
            handleProfileClick={handleProfileClick}
            handleProfileSectionClick={handleProfileSectionClick}
            handleMenuClick={handleMenuClick}
          />
        </div>

        <main className="flex-1 p-6 space-y-5 sm:space-y-0">
          <MobileSidebar
            userDetails={{
              ...userDetails,
              temporaryPhoto: temporaryPhoto,
            }}
            sidebarItems={sidebarItems}
            activeMenu={activeMenu}
            showProfileDropdown={showProfileDropdown}
            activeProfileSection={activeProfileSection}
            handleProfileClick={handleProfileClick}
            handleProfileSectionClick={handleProfileSectionClick}
            handleMenuClick={handleMenuClick}
          />
          <div className="bg-white rounded-xl shadow-sm">{renderContent()}</div>
        </main>
      </div>

      <ModalValidation isOpen={showDiscardModal} onClose={() => setShowDiscardModal(false)} onConfirm={handleDiscardChanges} />
      <ModalLogout isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)} onLogout={handleLogout} />
    </div>
  );
};

DashboardPage.propTypes = {
  defaultMenu: PropTypes.oneOf(['Dashboard', 'Kelas Saya', 'Pengaturan']),
};

export default DashboardPage;

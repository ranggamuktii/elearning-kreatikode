import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Dropdown } from 'flowbite-react';
import PropTypes from 'prop-types';

const Navbar = ({ userDetails, isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const minimalNavbarRoutes = ['/register', '/login'];
  const isMinimalNavbar = minimalNavbarRoutes.includes(location.pathname);

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => document.body.classList.remove('overflow-hidden');
  }, [isMenuOpen]);

  const profileImage = (() => {
    if(userDetails?.photo){
      return <img src={`${import.meta.env.VITE_API_URL}${userDetails.photo}`} className="bg-gray-300 w-10 h-10 rounded-full"></img>
    }
    if (userDetails?.gender === 'male') {
      return <img src="/male-profile.svg" alt="Male Profile" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full" />;
    }
    if (userDetails?.gender === 'female') {
      return <img src="/female-profile.svg" alt="Female Profile" className="w-6 h-6 rounded-full" />;
    }
    return <img src="/unknown-profile.svg" alt="Default" className="w-6 h-6 rounded-full" />;
  })();

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 left-0 w-full h-[60px] sm:h-[75px] shadow-sm z-50">
      <div className="max-w-7xl h-full mx-auto px-6 sm:px-4">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse z-50">
              <img src="/kreatikode-texthitam.png" className="h-7 sm:h-9" alt="Logo" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          {!isMinimalNavbar && (
            <div className="hidden md:flex items-center justify-center flex-1">
              <ul className="flex space-x-12">
                <li>
                  <Link to="/" className="block py-6 px-4 text-neutral-800 hover:text-primary-600 font-normal hover:font-medium border-b-4 border-transparent hover:border-primary-600 transition-colors duration-200">
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link to="/course" className="block py-6 px-4 text-neutral-800 hover:text-primary-600 font-normal hover:font-medium border-b-4 border-transparent hover:border-primary-600 transition-colors duration-200">
                    Kelas
                  </Link>
                </li>
                <li>
                  <Link to="/about_us" className="block py-6 px-4 text-neutral-800 hover:text-primary-600 font-normal hover:font-medium border-b-4 border-transparent hover:border-primary-600 transition-colors duration-200">
                    Tentang Kami
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* Right Section - Profile/Auth */}
          <div className="flex items-center">
            {isLoggedIn ? (
              <>
                {/* Mobile Profile Dropdown */}
                <div className="md:hidden">
                  <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                      <div className="bg-white border rounded-[10px] flex justify-center items-center space-x-2 p-2 z-50">
                        {profileImage}
                        <p className="text-[15px] font-normal">{userDetails.name?.split(' ')[0]}</p>
                      </div>
                    }
                    className="p-2 rounded-[15px]"
                  >
                    <Dropdown.Header className="flex space-x-3 mb-3">
                      <div className="space-y-1.5">
                        <p className="block text-[17px] font-semibold">{userDetails.name}</p>
                        <span className="block truncate text-sm font-normal">{userDetails.email}</span>
                      </div>
                    </Dropdown.Header>
                    <Dropdown.Item
                      className="custom-dropdown-item rounded-lg bg-white hover:bg-primary-100 hover:text-primary-600 hover:font-medium"
                      onClick={() => {
                        navigate('/profile');
                        handleMenuClose();
                      }}
                    >
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      className="custom-dropdown-item font-semibold rounded-lg bg-red-100 hover:bg-red-500 text-red-600 hover:text-white flex justify-center items-center"
                      onClick={() => {
                        handleLogout();
                        handleMenuClose();
                      }}
                    >
                      Keluar
                    </Dropdown.Item>
                  </Dropdown>
                </div>

                {/* Desktop Profile Dropdown */}
                <div className="hidden md:block">
                  <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                      <div className="bg-white border rounded-[10px] flex justify-center items-center space-x-2 p-2 z-50">
                        {profileImage}
                        <p className="text-[15px] font-normal">{userDetails.name?.split(' ')[0]}</p>
                      </div>
                    }
                    className="p-2 rounded-[15px]"
                  >
                    <Dropdown.Header className="flex space-x-3 mb-3">
                      <div className="space-y-1.5">
                        <p className="block text-[17px] font-semibold">{userDetails.name}</p>
                        <span className="block truncate text-sm font-normal">{userDetails.email}</span>
                      </div>
                    </Dropdown.Header>
                    <Dropdown.Item
                      className="custom-dropdown-item rounded-lg bg-white hover:bg-primary-100 hover:text-primary-600 hover:font-medium"
                      onClick={() => {
                        navigate('/profile');
                        handleMenuClose();
                      }}
                    >
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      className="custom-dropdown-item font-semibold rounded-lg bg-red-100 hover:bg-red-500 text-red-600 hover:text-white flex justify-center items-center"
                      onClick={() => {
                        handleLogout();
                        handleMenuClose();
                      }}
                    >
                      Keluar
                    </Dropdown.Item>
                  </Dropdown>
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login" className="text-primary-600 hover:text-white bg-primary-100 hover:bg-primary-600 focus:outline-none font-semibold rounded-lg text-sm px-4 py-2.5 text-center">
                  Masuk
                </Link>
                <Link to="/register" className="text-primary-600 hover:text-white bg-primary-100 hover:bg-primary-600 focus:outline-none font-semibold rounded-lg text-sm px-4 py-2.5 text-center">
                  Daftar
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            {!isMinimalNavbar && (
              <button type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none z-50 ml-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <span className="sr-only">Toggle menu</span>
                <div className="relative w-5 h-5">
                  <svg className={`absolute w-5 h-5 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                  </svg>
                  <svg className={`absolute w-5 h-5 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {!isMinimalNavbar && (
          <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden fixed inset-0 top-[60px] bg-white h-screen`}>
            <div className="p-4">
              <ul className="space-y-4">
                <li>
                  <Link to="/" className="block py-2 text-neutral-800 hover:text-primary-600 font-normal hover:font-medium" onClick={handleMenuClose}>
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link to="/course" className="block py-2 text-neutral-800 hover:text-primary-600 font-normal hover:font-medium" onClick={handleMenuClose}>
                    Kelas
                  </Link>
                </li>
                <li>
                  <Link to="/about_us" className="block py-2 text-neutral-800 hover:text-primary-600 font-normal hover:font-medium" onClick={handleMenuClose}>
                    Tentang Kami
                  </Link>
                </li>
              </ul>

              {!isLoggedIn && (
                <div className="mt-4 space-y-2">
                  <Link to="/login" className="block w-full text-primary-600 hover:text-white bg-primary-100 hover:bg-primary-600 focus:outline-none font-semibold rounded-lg text-sm px-4 py-2.5 text-center" onClick={handleMenuClose}>
                    Masuk
                  </Link>
                  <Link to="/register" className="block w-full text-primary-600 hover:text-white bg-primary-100 hover:bg-primary-600 focus:outline-none font-semibold rounded-lg text-sm px-4 py-2.5 text-center" onClick={handleMenuClose}>
                    Daftar
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  userDetails: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
  }),
  isLoggedIn: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Navbar;

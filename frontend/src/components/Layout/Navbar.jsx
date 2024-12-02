import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 left-0 w-full h-[60px] sm:h-[75px] shadow-lg z-50">
      <div className="max-w-7xl h-full mx-auto px-6 sm:px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse z-50">
          <img src="/kreatikode-texthitam.png" className="h-7 sm:h-9" alt="Logo" />
        </a>

        {/* Main Navigation Menu */}
        <div
          className={`${
            isMenuOpen ? 'block h-screen z-40' : 'hidden'
          } md:flex flex-col md:flex-row justify-between md:justify-center md:items-center md:space-x-12 bg-white md:bg-transparent absolute md:static left-0 w-full md:w-auto top-0 md:top-auto shadow-lg md:shadow-none pt-20 md:pt-0 p-4 md:p-0`}
          id="navbar-menu"
        >
          <ul className="flex flex-col md:flex-row text-base font-normal space-y-2 md:space-y-0 md:space-x-12 px-4 py-1 md:px-0 md:py-0">
            <li>
              <a href="/" className="block md:inline-block text-left" onClick={handleMenuClose}>
                <p className="w-full md:w-auto py-2 md:py-6 px-2 md:px-4 text-neutral-800 hover:text-primary-600 font-normal hover:font-medium border-b-4 border-transparent md:hover:border-primary-600 transition-colors duration-200">
                  Beranda
                </p>
              </a>
            </li>
            <li>
              <a href="/tiket-saya" className="block md:inline-block text-left" onClick={handleMenuClose}>
                <p className="w-full md:w-auto py-2 md:py-6 px-2 md:px-4 text-neutral-800 hover:text-primary-600 font-normal hover:font-medium border-b-4 border-transparent md:hover:border-primary-600 transition-colors duration-200">
                  Kelas
                </p>
              </a>
            </li>
            <li>
              <a href="/riwayat-transaksi" className="block md:inline-block text-left" onClick={handleMenuClose}>
                <p className="w-full md:w-auto py-2 md:py-6 px-2 md:px-4 text-neutral-800 hover:text-primary-600 font-normal hover:font-medium border-b-4 border-transparent md:hover:border-primary-600 transition-colors duration-200">
                  Tentang Kami
                </p>
              </a>
            </li>
          </ul>

          {/* Mobile Auth Buttons */}
          <div className="flex flex-row items-center space-y-0 md:hidden space-x-3 px-4 py-1 pb-40">
            <button
              type="button"
              onClick={() => {
                window.location.href = '/login';
                handleMenuClose();
              }}
              className="w-full text-primary-600 hover:text-white bg-primary-100 hover:bg-primary-600 focus:outline-none font-semibold rounded-lg text-sm px-4 py-2.5 text-center sm:mr-3"
            >
              Masuk
            </button>
            <button
              type="button"
              onClick={() => {
                window.location.href = '/register';
                handleMenuClose();
              }}
              className="w-full text-primary-600 hover:text-white bg-primary-100 hover:bg-primary-600 focus:outline-none font-semibold rounded-lg text-sm px-4 py-2.5 text-center"
            >
              Daftar
            </button>
          </div>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          <button
            type="button"
            onClick={() => {
              window.location.href = '/login';
            }}
            className="text-primary-600 hover:text-white bg-primary-100 hover:bg-primary-600 focus:outline-none font-semibold rounded-lg text-sm px-4 py-2.5 text-center"
          >
            Masuk
          </button>
          <button
            type="button"
            onClick={() => {
              window.location.href = '/register';
            }}
            className="text-primary-600 hover:text-white bg-primary-100 hover:bg-primary-600 focus:outline-none font-semibold rounded-lg text-sm px-4 py-2.5 text-center"
          >
            Daftar
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg focus:outline-none z-50"
            aria-controls="navbar-menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Hamburger Menu</span>
            <div className="relative w-5 h-5">
              <svg className={`absolute w-5 h-5 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
              </svg>
              <svg className={`absolute w-5 h-5 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { useLocation, Link } from 'react-router-dom';

function Footer() {
  const location = useLocation();

  const hiddenFooterRoutes = ['/register', '/login'];

  const isHiddenFooter = hiddenFooterRoutes.includes(location.pathname);

  if (isHiddenFooter) {
    return null;
  }

  return (
    <footer className="bg-white w-full h-full sm:h-[400px] border-t flex items-center px-0 sm:px-28 mt-16 sm:mt-24 pt-0 sm:pt-12">
      <div className="mx-auto w-full py-8">
        <div className="flex flex-col md:flex-row md:justify-between px-8 sm:px-0">
          <div className="max-w-full sm:max-w-[500px]  flex flex-col mb-6 md:mb-0 space-y-2 sm:space-y-4">
            <a href="/" className="flex items-center mb-3 sm:mb-0">
              <img
                src="/kreatikode-texthitam.png"
                className="h-9 sm:h-12 hover:drop-shadow-md hover:shadow-purple-100 hover:shadow-custom-light hover:scale-105 sm:hover:scale-125 hover:-rotate-2 transform transition-transform duration-500"
                alt="Flowbite Logo"
              />
            </a>
            <div className="flex items-start space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 sm:h-14 sm:w-14 text-gray-500 -mt-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <div className="flex flex-col">
                <p className="text-black text-xs sm:text-lg font-medium mb-2">Kreatikode</p>
                <p className="text-gray-500 text-xs sm:text-base font-normal">Jl. H. R. Rasuna Said No.22 Kavling C, RT.2/RW.5, Karet Kuningan, Kecamatan Setiabudi, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12940</p>
                <a
                  href="https://www.google.com/maps?ll=-6.222087,106.833223&z=15&t=m&hl=id&gl=ID&mapclient=embed&cid=12824869922347718793"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-500 hover:text-primary-600 text-xs sm:text-base font-medium underline"
                >
                  Lihat di Google Maps
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <p className="text-gray-500 text-xs sm:text-base font-normal">kreatikode@gmail.com</p>
            </div>
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <p className="text-gray-500 text-xs sm:text-base font-normal">+62 800-0000-0000</p>
            </div>
          </div>
          <div className="flex flex-warp gap-5 sm:gap-10 sm:grid-cols-3 text-left sm:text-center">
            <div className="flex flex-col  w-full sm:w-auto ">
              <h2 className="mb-2 sm:mb-6 text-xs sm:text-base font-semibold uppercase text-black ">Kreatikode</h2>
              <ul className="text-gray-600  text-xs sm:text-base font-normal space-y-2 sm:space-y-4">
                <li className="">
                  <Link to="/page_faq" className="hover:underline">
                    FAQ
                  </Link>
                </li>
                <li className="mb-4">
                  <a href="/terms" className="hover:underline">
                    Kebijakan privasi
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col  w-full sm:w-auto">
              <h2 className="mb-2 sm:mb-6 text-xs sm:text-base font-semibold uppercase text-black">Layanan</h2>
              <ul className="text-gray-600 text-xs sm:text-base space-y-2 sm:space-y-4 font-normal">
                <li>
                  <a href="/" target="_blank" className="hover:underline">
                    kelas
                  </a>
                </li>
                <li>
                  <a href="/" target="_blank" className="hover:underline">
                    Tentang Kami
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col w-full sm:w-auto">
              <h2 className="mb-2 sm:mb-6 text-xs sm:text-base font-semibold uppercase text-black">Follow us</h2>
              <ul className="text-gray-600 text-xs sm:text-base font-sm space-y-2 sm:space-y-4 font-normal">
                <li>
                  <a href="https://www.instagram.com/" target="_blank" className="hover:underline">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/" target="_blank" className="hover:underline">
                    Linkedin
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/" target="_blank" className="hover:underline">
                    Youtube
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 mx-6 border-gray-200 sm:mx-auto sm:my-8" />
        <div className="flex flex-col justify-center items-center sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm sm:text-base text-gray-500 sm:text-center">
            © 2024{' '}
            <a href="/" className="hover:underline">
              Kreatikode
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <a href="https://www.instagram.com/" className="text-gray-500 hover:scale-125 transform transition-transform duration-500">
              <svg className="w-5 h-5 sm:w-7 sm:h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Instagram Kreatikode</span>
            </a>
            <a href="https://www.linkedin.com/" className="text-gray-500 hover:scale-125 transform transition-transform duration-500 ms-5">
              <svg className="w-5 h-5 sm:w-7 sm:h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                  clipRule="evenodd"
                />
                <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
              </svg>
              <span className="sr-only">linkedin Kreatikode</span>
            </a>
            <a href="https://www.youtube.com/" className="text-gray-500 hover:scale-125 transform transition-transform duration-500 ms-5">
              <svg className="w-5 h-5 sm:w-7 sm:h-7 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z"
                  clipRule="evenodd"
                />
              </svg>

              <span className="sr-only">Youtube Kreatikode</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

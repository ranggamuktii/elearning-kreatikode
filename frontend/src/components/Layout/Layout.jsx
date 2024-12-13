import PropTypes from 'prop-types';
import { decodeJwt } from 'jose';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Loading from '../Loader/Loading';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showSuccessToast } from '../Utils/toastUtils';

const Layout = ({ children }) => {
  const [userDetails, setUserDetails] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('TOKEN');
    if (token) {
      setIsLoggedIn(true);

      const decoded = decodeJwt(token);

      setUserDetails(decoded);
    } else {
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  }, []);

  const handleLogout = async () => {
    showSuccessToast('Berhasil logout');

    setTimeout(() => {
      setIsLoggedIn(false);
      Cookies.remove('TOKEN');
      window.location.pathname = '/';
    }, 2000);
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <ToastContainer />
          <Navbar userDetails={userDetails} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      )}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

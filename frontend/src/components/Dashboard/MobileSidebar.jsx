import { useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, X } from 'lucide-react';

const MobileSidebar = ({ userDetails, sidebarItems, activeMenu, showProfileDropdown, activeProfileSection, handleProfileSectionClick, handleMenuClick }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleMobileMenuClick = (item) => {
    handleMenuClick(item.text);
    if (item.text === 'Profile') {
      handleProfileSectionClick('Detail Profil');
    }
    setIsMobileSidebarOpen(false);
  };

  const handleMobileProfileSectionClick = (section) => {
    handleProfileSectionClick(section);
    setIsMobileSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile Navigation Toggle Button */}
      <button onClick={toggleMobileSidebar} className="md:hidden w-full px-4 py-2 border rounded-lg flex items-center justify-center bg-white">
        <Menu className="w-4 h-4 mr-2" />
        Menu
      </button>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleMobileSidebar} />}

      {/* Mobile Sidebar Slide-out */}
      <div
        className={`
          fixed inset-y-0 right-0 max-w-[300px] w-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
          ${isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
          md:hidden
        `}
      >
        <div className="p-4 maxh-screen">
          {/* Close Button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Menu</h2>
            <button onClick={toggleMobileSidebar} className="p-2">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* User Profile Section */}
          <div className="flex flex-col items-center space-y-4 mb-6">
            {userDetails?.photo || userDetails?.temporaryPhoto ? (
              <img
                src={userDetails.temporaryPhoto || `${import.meta.env.VITE_API_URL}${userDetails.photo}`}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/400x400/png';
                }}
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-2xl text-white font-semibold">{userDetails?.name ? userDetails.name.charAt(0).toUpperCase() : 'U'}</div>
            )}
            <h3 className="font-medium">{userDetails?.name || 'User'}</h3>
          </div>

          {/* Navigation Items */}
          <div className="space-y-2">
            {sidebarItems.map((item, index) => (
              <div key={index}>
                <div
                  onClick={() => handleMobileMenuClick(item)}
                  className={`flex items-center space-x-3 p-3 text-sm rounded-lg cursor-pointer
                    ${activeMenu === item.text ? 'bg-primary-100 bg-opacity-30 text-primary-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
                {item.text === 'Profile' && showProfileDropdown && (
                  <div className="pl-8 py-2 space-y-3">
                    <div
                      onClick={() => handleMobileProfileSectionClick('Detail Profil')}
                      className={`cursor-pointer text-sm sm:text-base font-sm p-2 hover:text-primary-600 ${activeProfileSection === 'Detail Profil' ? 'text-primary-600 bg-gray-50 rounded-lg' : ''}`}
                    >
                      Detail Profil
                    </div>
                    <div
                      onClick={() => handleMobileProfileSectionClick('Data Pribadi')}
                      className={`cursor-pointer text-sm sm:text-base p-2 hover:text-primary-600 ${activeProfileSection === 'Data Pribadi' ? 'text-primary-600 bg-gray-50 rounded-lg' : ''}`}
                    >
                      Data Pribadi
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

MobileSidebar.propTypes = {
  userDetails: PropTypes.shape({
    name: PropTypes.string,
    photo: PropTypes.string,
    temporaryPhoto: PropTypes.string,
  }).isRequired,
  sidebarItems: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node.isRequired,
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    })
  ).isRequired,
  activeMenu: PropTypes.string.isRequired,
  showProfileDropdown: PropTypes.bool.isRequired,
  activeProfileSection: PropTypes.string,
  handleProfileSectionClick: PropTypes.func.isRequired,
  handleMenuClick: PropTypes.func.isRequired,
};

export default MobileSidebar;

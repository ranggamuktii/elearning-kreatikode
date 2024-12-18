import PropTypes from 'prop-types';

const Sidebar = ({ userDetails, sidebarItems, activeMenu, showProfileDropdown, activeProfileSection, handleProfileClick, handleProfileSectionClick, handleMenuClick }) => {
  return (
    <aside className="w-64 bg-white min-h-screen p-4 border-r">
      <div className="flex flex-col items-center space-y-5 mb-8">
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

      <div className="space-y-2">
        {sidebarItems.map((item, index) => (
          <div key={index}>
            <div
              onClick={item.text === 'Profile' ? handleProfileClick : item.text === 'Logout' ? () => handleMenuClick('Logout') : () => handleMenuClick(item.text)}
              className={`flex items-center space-x-3 p-2 text-sm sm:text-base rounded-lg cursor-pointer
                ${activeMenu === item.text ? 'bg-primary-100 bg-opacity-30 text-primary-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
            {item.text === 'Profile' && showProfileDropdown && (
              <div className="pl-8 py-2 space-y-3">
                <div
                  onClick={() => handleProfileSectionClick('Detail Profil')}
                  className={`cursor-pointer text-sm sm:text-base p-2 hover:text-primary-600 ${activeProfileSection === 'Detail Profil' ? 'text-primary-600 bg-gray-50 rounded-lg' : ''}`}
                >
                  Detail Profil
                </div>
                <div
                  onClick={() => handleProfileSectionClick('Data Pribadi')}
                  className={`cursor-pointer text-sm sm:text-base p-2 hover:text-primary-600 ${activeProfileSection === 'Data Pribadi' ? 'text-primary-600 bg-gray-50 rounded-lg' : ''}`}
                >
                  Data Pribadi
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
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
  handleProfileClick: PropTypes.func.isRequired,
  handleProfileSectionClick: PropTypes.func.isRequired,
  handleMenuClick: PropTypes.func.isRequired,
};

export default Sidebar;

import PropTypes from 'prop-types';

const ModalLogout = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg max-w-md w-full p-6">
          <h3 className="text-lg font-semibold mb-4">Ingin Keluar?</h3>
          <p className="mb-6">Apakah anda yakin ingin keluar akun?</p>
          <div className="flex justify-end space-x-4">
            <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
              Tidak
            </button>
            <button onClick={onLogout} className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white">
              Ya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ModalLogout.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default ModalLogout;

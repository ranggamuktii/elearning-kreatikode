import PropTypes from 'prop-types';

const Settings = ({ password, setPassword, confirmPassword, setConfirmPassword, handleSave }) => {
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

Settings.propTypes = {
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  setConfirmPassword: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default Settings;

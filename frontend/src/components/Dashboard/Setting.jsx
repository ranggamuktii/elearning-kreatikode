import PropTypes from 'prop-types';
import { useState } from 'react';

const Settings = ({ currentPassword, updatePassword }) => {
  const [enteredOldPassword, setEnteredOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setErrors] = useState('');

  const validateAndSave = () => {
    setErrors('');

    if (enteredOldPassword !== currentPassword) {
      setErrors('Password lama tidak sesuai.');
      return;
    }

    if (newPassword === '') {
      setErrors('Password baru tidak boleh kosong.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setErrors('Password baru dan konfirmasi password tidak cocok.');
      return;
    }

    updatePassword(newPassword);
    alert('Password berhasil diubah.');

    setEnteredOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Ubah Kata Sandi</h2>
      <div className="space-y-3">
        <div>
          <label className="block mb-2 text-sm">
            Password Lama <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            value={enteredOldPassword}
            onChange={(e) => setEnteredOldPassword(e.target.value)}
            className="w-full p-2 border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm">
            Password Baru <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm">
            Konfirmasi Password Baru <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="w-full p-2 border-gray-300 rounded-lg"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      <button onClick={validateAndSave} className="w-full bg-primary-500 text-white p-2 rounded-lg">
        Simpan
      </button>
    </div>
  );
};

Settings.propTypes = {
  currentPassword: PropTypes.string.isRequired, 
  updatePassword: PropTypes.func.isRequired,
};

export default Settings;

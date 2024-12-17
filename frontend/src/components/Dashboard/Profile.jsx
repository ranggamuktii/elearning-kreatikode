import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

export const DetailProfile = ({ name, setName, userDetails, uploading, handleFileChange, handleUpload, displayNameAlias, handleSave }) => {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold mb-5">Detail Profil</h2>
      <div>
        <label className="block mb-2 text-sm font-normal text-gray-900">
          Foto Profil <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center space-x-8">
          {userDetails?.photo ? (
            <img
              src={`${import.meta.env.VITE_API_URL}${userDetails.photo}`}
              alt="User profile"
              className="object-cover w-[100px] h-[100px] rounded-full"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/400x400/png';
              }}
            />
          ) : (
            <div className="flex items-center justify-center w-[100px] h-[100px] rounded-full text-white font-semibold text-2xl bg-gray-300">{displayNameAlias()}</div>
          )}

          <input type="file" id="fileInput" accept="image/jpeg,image/png,image/jpg" onChange={handleFileChange} style={{ display: 'none' }} />

          <button type="button" onClick={() => document.getElementById('fileInput').click()} className="font-semibold px-4 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white disabled:opacity-50" disabled={uploading}>
            {uploading ? 'Mengunggah...' : 'Unggah Foto'}
          </button>

          {!userDetails.photo && (
            <button type="button" onClick={handleUpload} className="font-semibold px-4 py-2.5 rounded-xl hover:bg-purple-50 text-primary-500 hover:text-primary-600">
              Gunakan Karakter Avatar
            </button>
          )}
        </div>
        <p className="mt-2 text-sm text-gray-500">Format yang didukung: JPG, JPEG, PNG. Maksimal 2MB.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block mb-2 text-xs sm:text-sm">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2.5 border-gray-300 rounded-xl text-xs sm:text-sm" placeholder="Nama Lengkap" required />
        </div>
        <div>
          <label className="block mb-2 text-xs sm:text-sm">
            Email <span className="text-red-500">*</span>
          </label>
          <input type="email" value={userDetails.email} className="w-full p-2.5 border-gray-300 rounded-xl text-xs sm:text-sm" readOnly />
        </div>
      </div>

      <button onClick={handleSave} className="bg-primary-500 text-white py-2 px-5 rounded-xl">
        Simpan
      </button>
    </div>
  );
};

export const PersonalData = ({ phone, handlePhoneChange, selectedDate, setSelectedDate, gender, setGender, handleSave }) => {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Data Pribadi</h2>
      <div className="space-y-3">
        <div>
          <label className="block mb-2 text-sm">
            Nomor Ponsel <span className="text-red-500">*</span>
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 bg-gray-200 border rounded-l-lg">+62</span>
            <input type="tel" value={phone} onChange={handlePhoneChange} className="flex-1 p-2 border-gray-300 rounded-r-lg" />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm">
            Tanggal Lahir <span className="text-red-500">*</span>
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 bg-gray-200 border rounded-l-lg">
              <CalendarIcon />
            </span>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="custom-datepicker w-full p-2 border rounded-lg"
              renderCustomHeader={({ date, changeYear, changeMonth }) => <CustomDatePickerHeader date={date} changeYear={changeYear} changeMonth={changeMonth} />}
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm">
            Jenis Kelamin <span className="text-red-500">*</span>
          </label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-2 border-gray-300 rounded-lg">
            <option value="">Pilih Jenis Kelamin</option>
            <option value="male">Laki-laki</option>
            <option value="female">Perempuan</option>
          </select>
        </div>
      </div>

      <button onClick={handleSave} className="w-full bg-primary-500 text-white p-2 rounded-lg">
        Simpan
      </button>
    </div>
  );
};

const CalendarIcon = () => (
  <svg className="w-5 h-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"
      clipRule="evenodd"
    />
  </svg>
);

const CustomDatePickerHeader = ({ date, changeYear, changeMonth }) => (
  <div className="flex space-x-2 items-center justify-center">
    <select value={new Date(date).getFullYear()} onChange={({ target: { value } }) => changeYear(value)} className="px-2 py-1 border rounded-md focus:outline-none">
      {Array.from({ length: 101 }).map((_, index) => (
        <option key={index} value={1924 + index}>
          {1924 + index}
        </option>
      ))}
    </select>
    <select value={new Date(date).getMonth()} onChange={({ target: { value } }) => changeMonth(value)} className="px-2 py-1 border rounded-md focus:outline-none">
      {Array.from({ length: 12 }).map((_, index) => (
        <option key={index} value={index}>
          {new Date(0, index).toLocaleString('default', { month: 'long' })}
        </option>
      ))}
    </select>
  </div>
);

DetailProfile.propTypes = {
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  userDetails: PropTypes.shape({
    photoURL: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  uploading: PropTypes.bool.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired,
  displayNameAlias: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

PersonalData.propTypes = {
  phone: PropTypes.string.isRequired,
  handlePhoneChange: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date),
  setSelectedDate: PropTypes.func.isRequired,
  gender: PropTypes.string.isRequired,
  setGender: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

CustomDatePickerHeader.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  changeYear: PropTypes.func.isRequired,
  changeMonth: PropTypes.func.isRequired,
};

export default {
  DetailProfile,
  PersonalData,
};

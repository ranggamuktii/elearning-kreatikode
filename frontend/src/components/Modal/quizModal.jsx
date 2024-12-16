import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { postComment } from '../../services/api';
import { decodeJwt } from 'jose';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Modal = ({ skor, courseId }) => {
  const [userDetails, setUserDetails] = useState({});
  const [showModal, setShowModal] = useState(true);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const closeModal = () => {
    setShowModal(false);
    navigate(`/course/${courseId}`);
  };

  useEffect(() => {
    const token = Cookies.get('TOKEN');
    if (token) {
      const decoded = decodeJwt(token);

      setUserDetails(decoded);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '') {
      alert('Komentar harus diisi!');
      return;
    }
    const user = userDetails.id;
    const course = courseId;
    const data = { user, course, text, rating };

    postComment(courseId, data)
      .then((response) => {
        console.log('Komentar berhasil dikirim:', response);
        setText('');
      })
      .catch((error) => {
        console.error('Gagal mengirim komentar:', error);
        alert('Gagal mengirim komentar. Silakan coba lagi.');
      });

    closeModal();
  };

  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg text-center mx-4 overflow-auto">
          {/* Header */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Selamat!</h2>
          <p className="text-gray-600 mb-6">Kamu telah berhasil menyelesaikan Kelas ini dan meraih:</p>

          {/* Star Rating */}
          <div className="bg-blue-50 text-blue-600 rounded-lg p-4 mb-4">
            <span className="text-xl font-semibold block mb-2">Beri Penilaian</span>
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setRating(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)} className="focus:outline-none">
                  <Star size={32} className={`${star <= (hover || rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} transition-colors duration-200`} />
                </button>
              ))}
            </div>
          </div>

          {/* Card: Nilai */}
          <div className="bg-yellow-100 text-yellow-700 rounded-lg flex justify-between items-center p-4 mb-6">
            <span className="text-xl font-semibold">🎯 Nilai</span>
            <span className="text-2xl font-bold">{skor}</span>
          </div>

          {/* Comment Section */}
          <div className="mb-6">
            <label htmlFor="comment" className="block text-gray-700 mb-2">
              Berikan komentar Anda
            </label>
            <textarea
              id="comment"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              placeholder="Tulis komentar Anda di sini..."
            />
          </div>

          {/* Close Button */}
          <button onClick={handleSubmit} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 font-semibold">
            Kirim Ulasan
          </button>
        </div>
      </div>
    )
  );
};

export default Modal;

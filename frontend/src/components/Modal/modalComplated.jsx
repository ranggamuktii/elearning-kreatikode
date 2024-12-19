import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { postComment } from '../../services/api';
import { decodeJwt } from 'jose';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { loadComment } from '../../services/api';

const Modal = ({ skor, courseId, onClose }) => {
    const [userDetails, setUserDetails] = useState({});
    const [showModal, setShowModal] = useState(true);
    const [comments, setComments] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('TOKEN');
        if (token) {
            const decoded = decodeJwt(token);

            setUserDetails(decoded);
        }
    }, []);

    useEffect(() => {
        if (userDetails.id) {
            loadComment(courseId)
                .then((response) => {
                    const filteredComments = response.data.filter(comment => {
                        return comment.user._id === userDetails.id;
                    });
                    setComments(filteredComments);
                })
                .catch((error) => console.log(error));
        }
    }, [courseId, userDetails.id])

    const rating = comments.length > 0 ? comments[0].rating : 0;
    const commentText = comments.length > 0 ? comments[0].text : '';

    return (
        showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg text-center mx-4 overflow-auto">
                    {/* Header */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Selamat!</h2>
                    <p className="text-gray-600 mb-6">Kamu telah berhasil menyelesaikan Kelas ini dan meraih:</p>

                    {/* Star Rating */}
                    <div className="bg-blue-50 text-blue-600 rounded-lg p-4 mb-4">
                        <span className="text-xl font-semibold block mb-2">Penilaian Anda</span>
                        <div className="flex items-center justify-center gap-1">
                            {Array.from({ length: 5 }, (_, i) => (
                                <Star key={i} size={32} className={`${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} transition-colors duration-200`} />
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
                            komentar Anda
                        </label>
                        <div className='bg-gray-100 rounded-lg border p-3'>
                            <p className="text-gray-600">{commentText}</p>
                        </div>

                    </div>

                    {/* Close Button */}
                    <button onClick={onClose} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 font-semibold">
                        Kembali
                    </button>
                </div>
            </div>
        )
    );
};

export default Modal;

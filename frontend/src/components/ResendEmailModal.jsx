import { useState } from 'react';
import PropTypes from 'prop-types';
import { resendVerification } from '../services/api';
import { Spinner } from 'flowbite-react';
import { X } from 'lucide-react';

function ResendEmailModal({ email, isOpen, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('idle');

  const handleResend = async () => {
    setIsSubmitting(true);
    setStatus('sending');

    try {
      await resendVerification({ email });
      setStatus('success');
    } catch (error) {
      setStatus('error', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
        {/* Tombol silang */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Verifikasi Email</h2>

        {status === 'idle' && (
          <>
            <p className="text-gray-600 mb-4">Email Anda belum terverifikasi. Silakan cek email Anda atau kirim ulang email verifikasi.</p>
            <div className="flex justify-end gap-2">
              <button onClick={handleResend} disabled={isSubmitting} className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50">
                {isSubmitting ? (
                  <span className="flex items-center">
                    <Spinner size="sm" className="mr-2" />
                    Mengirim...
                  </span>
                ) : (
                  'Kirim Ulang Email'
                )}
              </button>
            </div>
          </>
        )}

        {status === 'sending' && (
          <div className="text-center py-4">
            <Spinner size="lg" />
            <p className="mt-2">Mengirim email verifikasi...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center py-4">
            <div className="text-green-500 text-lg mb-2">✓</div>
            <p className="text-gray-600">Email verifikasi telah dikirim. Silakan cek inbox email Anda.</p>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center py-4">
            <p className="text-red-500 mb-4">Gagal mengirim email verifikasi. Silakan coba lagi.</p>
            <button onClick={handleResend} className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-blue-600">
              Coba Lagi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

ResendEmailModal.propTypes = {
  email: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ResendEmailModal;

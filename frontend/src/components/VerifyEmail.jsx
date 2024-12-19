import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../services/api';
import { Spinner } from 'flowbite-react';

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const doVerifyEmail = async () => {
      if (isVerifying) return;
      setIsVerifying(true);

      try {
        await verifyEmail(token);

        setStatus('success');
        setTimeout(() => {
          navigate('/login', {
            state: { message: 'Email berhasil diverifikasi. Silakan login.' },
          });
        }, 3000);
      } catch (error) {
        setStatus('error');
        console.log(error);
      } finally {
        setIsVerifying(false);
      }
    };

    doVerifyEmail();
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        {status === 'verifying' && (
          <div>
            <h2 className="text-xl font-semibold">Memverifikasi email...</h2>
            <Spinner size="xl" />
          </div>
        )}
        {status === 'success' && (
          <div>
            <h2 className="text-xl font-semibold text-green-600">Email berhasil diverifikasi!</h2>
            <p className="mt-2">Anda akan diarahkan ke halaman login dalam beberapa detik...</p>
          </div>
        )}
        {status === 'error' && (
          <div>
            <h2 className="text-xl font-semibold text-red-600">Verifikasi email gagal</h2>
            <p className="mt-2">Link verifikasi tidak valid atau sudah kadaluarsa.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;

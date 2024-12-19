import nodemailer from 'nodemailer';

// Buat fungsi untuk memverifikasi dan membuat transporter
const createTransporter = async () => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports like 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, // Untuk development
    },
  });

  // Verifikasi koneksi
  try {
    await transporter.verify();
    console.log('SMTP connection verified, ready to send emails');
    return transporter;
  } catch (error) {
    console.error('SMTP verification failed:', error);
    console.log('Current email config:', {
      user: process.env.EMAIL_USER,
      hasPassword: !!process.env.EMAIL_PASS,
    });
    throw error;
  }
};

// Buat template email yang lebih rapi
const createEmailTemplate = (name, verificationToken) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #1f2937;">KreatiKode</h1>
    </div>
    <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <h2 style="color: #1f2937; margin-bottom: 20px;">Verifikasi Email</h2>
      <p style="color: #4b5563; margin-bottom: 15px;">Hai ${name},</p>
      <p style="color: #4b5563; margin-bottom: 25px;">Terima kasih telah mendaftar di KreatiKode. Untuk melanjutkan, silakan verifikasi email Anda dengan mengklik tombol di bawah ini:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.FRONTEND_URL}/verify-email/${verificationToken}" 
           style="background-color: #3B82F6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
          Verifikasi Email
        </a>
      </div>
      <p style="color: #6b7280; font-size: 14px;">Atau salin dan tempel link berikut di browser Anda:</p>
      <p style="color: #3B82F6; word-break: break-all; margin-bottom: 25px;">
        ${process.env.FRONTEND_URL}/verify-email/${verificationToken}
      </p>
      <p style="color: #ef4444; font-size: 14px; margin-bottom: 25px;">
        Link verifikasi ini akan kadaluarsa dalam 24 jam.
      </p>
      <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 25px 0;">
      <p style="color: #6b7280; font-size: 14px;">
        Jika Anda tidak merasa mendaftar di KreatiKode, abaikan email ini.
      </p>
    </div>
    <div style="text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px;">
      <p>Salam,<br>Tim KreatiKode</p>
    </div>
  </div>
`;

export const sendVerificationEmail = async (to, name, verificationToken) => {
  try {
    console.log('Initializing email sending process...');

    // Buat transporter
    const transporter = await createTransporter();

    console.log('Preparing email content...');
    const mailOptions = {
      from: {
        name: 'KreatiKode',
        address: process.env.EMAIL_USER,
      },
      to: to,
      subject: 'Verifikasi Email KreatiKode',
      html: createEmailTemplate(name, verificationToken),
    };

    console.log('Sending email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
};

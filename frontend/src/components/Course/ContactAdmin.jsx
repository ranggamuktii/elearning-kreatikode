import React from 'react';

const ContactAdmin = () => {
  return (
    <div className="flex justify-center rounded-lg bg-secondary-400 text-color-text-2 font-medium text-base m-9 p-4">
      Apabila ada kendala teknis atau sistem, dapat menghubungi admin Kreatikode melalui{' '}
      <a href="https://web.telegram.org" target="_blank" className="underline hover:text-blue-800 mx-1">
        Telegram
      </a>{' '}
      atau{' '}
      <a href="https://www.whatsapp.com/" target="_blank" className="underline hover:text-blue-800 ml-1">
        Whatsapp
      </a>
    </div>
  );
};

export default ContactAdmin;

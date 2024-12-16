const ContactAdmin = () => {
  return (
    <div className="flex flex-col items-center rounded-lg bg-secondary-400 text-color-text-2 font-medium text-sm sm:text-base mt-16 md:mt-20 mx-4 sm:mx-9 p-6 space-y-4 text-center">
      <p className="leading-relaxed">
        Apabila ada kendala teknis atau sistem, Anda dapat menghubungi admin Kreatikode melalui: 
        {' '}
        <a
          href="https://web.telegram.org"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-800 font-semibold"
        >
          Telegram
        </a>
        {' '}atau{' '}
        <a
          href="https://www.whatsapp.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-800 font-semibold"
        >
          Whatsapp
        </a>
        .
      </p>
    </div>
  );
};

export default ContactAdmin;

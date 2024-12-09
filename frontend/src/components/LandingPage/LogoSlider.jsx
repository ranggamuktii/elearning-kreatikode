import Marquee from 'react-fast-marquee';

const LogoSlider = () => {
  return (
    <div className="bg-[#f8f8f8] mt-24">
      <Marquee className="mx-auto max-w-[80%]" autoFill speed={50} pauseOnHover>
        <div
          className="bg-[#fffefe] m-4 rounded-full flex p-2 text-medium cursor-pointer text-[#343434] shadow-md text-sm "
          onClick={() => {
            window.location.href = 'https://www.google.com';
          }}
        >
          Web Development
        </div>
        <div
          className="bg-[#fffefe] m-4 rounded-full flex p-2 text-medium cursor-pointer text-[#343434] shadow-md text-sm"
          onClick={() => {
            window.location.href = 'https://www.google.com';
          }}
        >
          Mobile Development
        </div>
        <div
          className="bg-[#fffefe] m-4 rounded-full flex p-2 text-medium cursor-pointer text-[#343434] shadow-md text-sm"
          onClick={() => {
            window.location.href = 'https://www.google.com';
          }}
        >
          Fulstack Javascript
        </div>
        <div
          className="bg-[#fffefe] m-4 rounded-full flex p-2 text-medium cursor-pointer text-[#343434] shadow-md text-sm"
          onClick={() => {
            window.location.href = 'https://www.google.com';
          }}
        >
          Cloud Computing
        </div>
        <div
          className="bg-[#fffefe] m-4 rounded-full flex p-2 text-medium cursor-pointer text-[#343434] shadow-md text-sm"
          onClick={() => {
            window.location.href = 'https://www.google.com';
          }}
        >
          Web Development
        </div>
        <div
          className="bg-[#fffefe] m-4 rounded-full flex p-2 text-medium cursor-pointer text-[#343434] shadow-md text-sm"
          onClick={() => {
            window.location.href = 'https://www.google.com';
          }}
        >
          UI/UX Designer
        </div>
        <div
          className="bg-[#fffefe] m-4 rounded-full flex p-2 text-medium cursor-pointer text-[#343434] shadow-md text-sm"
          onClick={() => {
            window.location.href = 'https://www.google.com';
          }}
        >
          Web Development
        </div>
      </Marquee>
    </div>
  );
};

export default LogoSlider;

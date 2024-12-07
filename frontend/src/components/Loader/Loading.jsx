const Loader = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="relative w-48 h-48" style={{ perspective: '800px' }}>
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className={`
                absolute top-1/2 left-1/2 w-16 h-16 rounded-lg opacity-0 invisible
                [transform-origin:bottom_center]
                [animation:spin_4s_linear_infinite,emerge_2s_ease-in-out_infinite_alternate,fadeIn_0.3s_ease-out_forwards]
              `}
            style={{
              animationDelay: `${index * 0.3}s`,
              background: getGradient(index),
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes spin {
          from {
            transform: translate(-50%, -50%) rotateX(45deg) rotateZ(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotateX(45deg) rotateZ(360deg);
          }
        }

        @keyframes emerge {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          to {
            visibility: visible;
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

const getGradient = (index) => {
  const gradients = [
    'linear-gradient(45deg, #003366, #336699)',
    'linear-gradient(45deg, #003399, #3366cc)',
    'linear-gradient(45deg, #0066cc, #3399ff)',
    'linear-gradient(45deg, #0099ff, #66ccff)',
    'linear-gradient(45deg, #33ccff, #99ccff)',
    'linear-gradient(45deg, #66ffff, #ccffff)',
  ];
  return gradients[index];
};

export default Loader;

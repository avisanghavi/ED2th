import React, { useEffect, useState } from 'react';

const LoadingScreen: React.FC<{ onFinish?: () => void }> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => setProgress(progress + 2), 18);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          if (onFinish) onFinish();
        }, 500);
      }, 400);
    }
  }, [progress, onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#181818] transition-opacity duration-500 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <h1
        className="text-6xl md:text-7xl font-extrabold tracking-widest mb-10 bg-gradient-to-r from-company-blue via-company-accent to-company-purple text-transparent bg-clip-text drop-shadow-lg"
        style={{ letterSpacing: '0.18em' }}
      >
        Jarvis
      </h1>
      <div className="w-64 max-w-[80vw] h-2 bg-company-dark/80 rounded-full overflow-hidden flex items-center shadow-lg">
        <div
          className="h-full bg-gradient-to-r from-company-accent via-company-blue to-company-purple rounded-full transition-all duration-100 shadow"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen; 
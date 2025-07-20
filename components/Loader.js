"use client";
import React from "react";

const SignInLoading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black transition-colors duration-300">
      <div className="relative w-20 h-20">
        {/* Spinner Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-zinc-900 dark:border-t-white animate-spin-glow" />
        <div className="absolute inset-0 flex items-center justify-center text-3xl text-zinc-900 dark:text-white animate-pulse-soft">
          🛒
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-glow {
          0% {
            transform: rotate(0deg);
            box-shadow: 0 0 0px rgba(255, 255, 255, 0.1);
          }
          50% {
            box-shadow: 0 0 18px rgba(0, 0, 0, 0.1),
              0 0 24px rgba(255, 255, 255, 0.2);
          }
          100% {
            transform: rotate(360deg);
            box-shadow: 0 0 0px rgba(255, 255, 255, 0.1);
          }
        }
        .animate-spin-glow {
          animation: spin-glow 1.8s linear infinite;
        }

        @keyframes pulse-soft {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
        .animate-pulse-soft {
          animation: pulse-soft 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SignInLoading;

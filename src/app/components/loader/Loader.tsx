// components/CarLoader.tsx
export default function Loader() {
    return (
      <div className="relative flex justify-center items-center w-full h-full">
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-full h-[5px] bg-gray-400 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute flex items-center animate-car-animation">
          <div className="w-16 h-8 bg-blue-500 rounded-lg shadow-lg relative">
            <div className="absolute top-1 left-2 w-3 h-3 bg-white rounded-full shadow-sm"></div>
            <div className="absolute top-1 right-2 w-3 h-3 bg-white rounded-full shadow-sm"></div>
            <div className="absolute bottom-0 left-0 w-8 h-3 bg-gray-800 rounded-t-lg"></div>
          </div>
        </div>
        <div className="absolute bottom-2 left-3 w-3 h-3 bg-black rounded-full animate-wheel-rotation"></div>
        <div className="absolute bottom-2 right-3 w-3 h-3 bg-black rounded-full animate-wheel-rotation"></div>
      </div>
    );
  }
  


const App = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button className="relative inline-flex items-center w-48 h-12 font-bold text-lg group focus:outline-none">
        <span className="absolute inset-0 w-12 h-12 rounded-full bg-gray-900 transition-all duration-500 ease-out group-hover:w-full group-hover:rounded-lg"></span>
        <span className="relative text-gray-900 group-hover:text-white transition-all duration-500 ease-out">Learn More</span>
        <span className="absolute left-4 w-4 h-4 border-t-2 border-r-2 border-white transform rotate-45 transition-all duration-500 ease-out group-hover:translate-x-4"></span>
      </button>
    </div>
  );
};

export default App;

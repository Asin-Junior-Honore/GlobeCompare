const LoadingSpinner = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        </div>
    );
};

export default LoadingSpinner;

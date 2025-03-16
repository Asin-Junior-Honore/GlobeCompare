"use client"
import React from "react";
import { useRouter } from "next/navigation";



const NotFoundMessage: React.FC<NotFoundMessageProps> = ({ message, showButton}) => {
    const router = useRouter();

    return (
        <div className="flex flex-col justify-center items-center h-screen text-center">
            <p className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
                {message}
            </p>
            {showButton && (
                <button
                    onClick={() => router.push("/")}
                    className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                >
                    Go to Home
                </button>
            )}
        </div>
    );
};

export default NotFoundMessage;

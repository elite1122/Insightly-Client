import React from 'react';

const LoadingSpinner = ({ 
    size = 'medium', 
    text = 'Loading...', 
    variant = 'newspaper',
    fullScreen = false 
}) => {
    const sizeClasses = {
        small: 'w-8 h-8',
        medium: 'w-16 h-16', 
        large: 'w-24 h-24'
    };

    const textSizes = {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg'
    };

    const LoadingContent = () => (
        <div className="text-center">
            {variant === 'newspaper' ? (
                <div className="relative inline-block">
                    {/* Enhanced Newspaper style loading */}
                    <div className={`${sizeClasses[size]} mx-auto mb-6 relative`}>
                        {/* Outer rotating border with newspaper colors */}
                        <div className="absolute inset-0 border-4 border-gray-900 border-t-yellow-400 rounded-full animate-spin"></div>
                        {/* Secondary rotating ring */}
                        <div className="absolute inset-1 border-2 border-gray-300 border-b-yellow-500 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
                        {/* Inner pulsing circle */}
                        <div className="absolute inset-3 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full animate-pulse"></div>
                        {/* Center newspaper icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-yellow-400 font-black text-sm animate-bounce">📰</span>
                        </div>
                    </div>
                    
                    {/* Enhanced loading text */}
                    <div className="space-y-3">
                        <p className={`newspaper-meta text-gray-800 uppercase tracking-widest ${textSizes[size]} font-black`}>
                            {text}
                        </p>
                        <div className="newspaper-body text-gray-600 text-xs uppercase tracking-wider">
                            Please wait while we prepare your content
                        </div>
                    </div>
                    
                    {/* Enhanced loading dots */}
                    <div className="flex justify-center space-x-2 mt-4">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-gray-900 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-3 h-3 bg-gray-900 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                    
                    {/* Progress indicator */}
                    <div className="mt-6 max-w-xs mx-auto">
                        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-yellow-400 to-gray-900 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>
            ) : variant === 'pulse' ? (
                <div className="text-center">
                    {/* Pulsing style loading */}
                    <div className={`${sizeClasses[size]} mx-auto mb-4 relative`}>
                        <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-75"></div>
                        <div className="absolute inset-0 bg-blue-600 rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white font-black text-xs">⚡</span>
                        </div>
                    </div>
                    <p className={`text-gray-600 ${textSizes[size]} font-semibold animate-pulse`}>
                        {text}
                    </p>
                </div>
            ) : (
                <div className="text-center">
                    {/* Classic spinner */}
                    <div className={`${sizeClasses[size]} mx-auto mb-4`}>
                        <div className="border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin h-full w-full"></div>
                    </div>
                    <p className={`text-gray-600 ${textSizes[size]} font-medium`}>
                        {text}
                    </p>
                </div>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center z-50">
                <div className="bg-white border-4 border-gray-900 p-8 sm:p-12 newspaper-card shadow-2xl max-w-md mx-4">
                    <LoadingContent />
                </div>
                {/* Animated background pattern */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-10 -left-10 w-20 h-20 border-2 border-gray-300 rounded-full animate-pulse opacity-30"></div>
                    <div className="absolute top-1/4 right-10 w-16 h-16 border-2 border-yellow-400 rounded-full animate-bounce opacity-20"></div>
                    <div className="absolute bottom-1/4 left-1/4 w-12 h-12 border-2 border-gray-400 rounded-full animate-ping opacity-25"></div>
                    <div className="absolute bottom-10 right-1/3 w-8 h-8 border-2 border-gray-300 rounded-full animate-pulse opacity-30" style={{animationDelay: '1s'}}></div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center py-12">
            <LoadingContent />
        </div>
    );
};

export default LoadingSpinner;

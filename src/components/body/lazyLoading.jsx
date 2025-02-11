import React, { useState, useEffect, useRef } from "react";

const LazyImage = ({ src, alt, placeholderSrc, ...props }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const imageRef = useRef(null);

    const handleImageLoad = () => {
        setIsLoaded(true);
    };

    // Lazy load the image using Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !isLoaded) {
                    const image = imageRef.current;
                    if (image) {
                        image.src = src;
                        image.onload = handleImageLoad;
                    }
                    observer.disconnect();
                }
            });
        });

        if (imageRef.current) {
            observer.observe(imageRef.current);
        }

        return () => {
            if (imageRef.current) {
                observer.disconnect();
            }
        };
    }, [src, isLoaded]);

    return (
        <div className="relative">
            <img
                ref={imageRef}
                src={placeholderSrc}
                alt={alt}
                className={`w-full h-60 object-cover transition-all duration-500 ${isLoaded ? 'blur-0' : 'blur-sm'}`}
                {...props}
            />
        </div>
    );
};

export default LazyImage;

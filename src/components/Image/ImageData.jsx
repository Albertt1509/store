import React, { useEffect, useState, useRef, useCallback } from 'react';

export default function ProductList() {
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const observerRef = useRef(null);

    const fetchImages = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=10`);
            const data = await response.json();           
            setImages((prev) => [...prev, ...data]);
        } catch (error) {
            console.error('Failed to fetch images:', error);
        } finally {
            setLoading(false);
        }
    }, [page]);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    const lastImageRef = useCallback(
        (node) => {
            if (loading) return;
            if (observerRef.current) observerRef.current.disconnect();

            observerRef.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prev) => prev + 1);
                }
            });

            if (node) observerRef.current.observe(node);
        },
        [loading]
    );

    const renderImageCard = (image, index) => {
    const imageComponent = (
        <div
            key={`${image.id}-${index}`}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
        >
            <img
                src={`https://picsum.photos/id/${image.id}/400/300`}
                alt={image.author}
                className="w-full h-48 object-cover"
                loading="lazy"
            />
            <div className="p-4">
                <p className="text-gray-800 font-semibold text-sm">Author: {image.author}</p>
                <p className="text-gray-500 text-xs">ID: {image.id}</p>
            </div>
        </div>
    );

    if (index === images.length - 1) {
        return (
            <div ref={lastImageRef} key={`ref-${image.id}-${index}`}>
                {imageComponent}
            </div>
        );
    }

    return imageComponent;
};


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img, index) => renderImageCard(img, index))}
            {loading && (
                <div className="col-span-full text-center py-6">
                    <p className="text-gray-500 animate-pulse">Loading more images...</p>
                </div>
            )}
        </div>
    );
}

import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import DeliveryLottie from '../img/lottie/delivery.json';
import KeranjangLottie from '../img/lottie/keranjang.json';
import SaleLottie from '../img/lottie/sale.json';
import Loading from '../img/Animation - 1712724325266.json';

export const Delivery = () => {
    const animationContainer = useRef(null);

    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: animationContainer.current,
            animationData: DeliveryLottie,
            renderer: 'svg',
            loop: true,
            autoplay: true,
        });

        return () => {
            anim.destroy();
        };
    }, []);

    return (
        <div ref={animationContainer} style={{ width: '50%', height: '50%' }}></div>
    );
};
export const Keranjang = () => {
    const animationContainer = useRef(null);

    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: animationContainer.current,
            animationData: KeranjangLottie,
            renderer: 'svg',
            loop: true,
            autoplay: true,
        });

        return () => {
            anim.destroy();
        };
    }, []);

    return (
        <div ref={animationContainer} style={{ width: '50%', height: '50%' }}></div>
    );
};
export const Sale = () => {
    const animationContainer = useRef(null);

    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: animationContainer.current,
            animationData: SaleLottie,
            renderer: 'svg',
            loop: true,
            autoplay: true,
        });

        return () => {
            anim.destroy();
        };
    }, []);

    return (
        <div ref={animationContainer} style={{ width: '50%', height: '50%' }}></div>
    );
};
export const LoadingAnimation = () => {
    const animationContainer = useRef(null);

    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: animationContainer.current,
            animationData: Loading,
            renderer: 'svg',
            loop: true,
            autoplay: true,
        });

        return () => {
            anim.destroy();
        };
    }, []);

    return (
        <div className="flex justify-center items-center h-screen">
            <div ref={animationContainer} style={{ width: '20%', height: '20%' }} ></div>
        </div>
    );
};

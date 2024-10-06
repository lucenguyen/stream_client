import React, {useEffect, useRef} from 'react';
import Clappr from 'clappr';

const ClapprPlayer = ({source, width = '100%', height = '70vh'}) => {
    const playerRef = useRef(null);

    useEffect(() => {
        // Kiểm tra xem playerRef đã tồn tại chưa
        if (!playerRef.current) return;

        // Khởi tạo player Clappr
        const player = new Clappr.Player({
            source: source,
            parent: playerRef.current,
            width: width,
            height: height,
        });

        // Cleanup: hủy player khi component unmount
        return () => {
            player.destroy();
        };
    }, [source, width, height]); // Gọi lại khi source, width hoặc height thay đổi

    return <div ref={playerRef}/>; // Sử dụng useRef để gán ref cho div
};

export default ClapprPlayer;

import React, {useEffect, useRef, useState} from 'react';
import Clappr from 'clappr';
import '../App.css';

const ClapprPlayer = ({source, img='', width = '100%', height = '70vh'}) => {
    const playerRef = useRef(null);
    useEffect(() => {
        // Kiểm tra xem playerRef đã tồn tại chưa
        if (!playerRef.current) return;

        // Khởi tạo player Clappr
        const player = new Clappr.Player({
            source: source,
            parent: playerRef.current,
            autoPlay: true,
            mute: true,
            width: width,
            height: height,

        });
        // Bắt sự kiện khi video bắt đầu phát, ẩn background
        player.on(Clappr.Events.PLAYER_PLAY, () => {
            // setSrc(source);
        });

        // Bắt sự kiện khi video bị tạm dừng hoặc dừng, hiển thị background
        player.on(Clappr.Events.PLAYER_PAUSE, () => {
            // setSrc(source);
        });

        player.on(Clappr.Events.PLAYER_STOP, () => {
            // setIsPlaying(false);
        });
        // Cleanup: hủy player khi component unmount
        return () => {
            player.destroy();
        };
    }, [source, width, height]); // Gọi lại khi source, width hoặc height thay đổi

    return (
        <div>
            <div ref={playerRef} />
        </div>
    )
};

export default ClapprPlayer;

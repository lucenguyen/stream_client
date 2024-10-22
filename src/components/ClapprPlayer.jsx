import React, {useEffect, useRef, useState} from 'react';
import Clappr from 'clappr';
import '../App.css';
import './ClapprPlayer.css';

const ClapprPlayer = ({source, img='', width = '100%', height = '70vh'}) => {
    const playerRef = useRef(null);
    const [isplay, setIsplay] = useState(false);
    useEffect(() => {
        // Kiểm tra xem playerRef đã tồn tại chưa
        if (!playerRef.current) return;

        // Khởi tạo player Clappr
        const player = new Clappr.Player({
            source: source,
            parent: playerRef.current,
            parentId: '#player',
            autoPlay: true,
            mute: false,
            width: width,
            height: height,
            disableErrorScreen: true,
            poster: `${img}`
        });

        // player.on(Clappr.Events.PLAYER_PLAY, () => {
        //     setIsplay(true);
        // });
        // player.on(Clappr.Events.PLAYER_PAUSE, () => {
        //     setIsplay(false);
        // });
        // player.on(Clappr.Events.PLAYER_STOP, () => {
        //     console.log('stop');
            
        //     setIsplay(false);
        // });
        // player.on(Clappr.Events.PLAYER_ERROR , () => {
        //     setIsplay(false);
        // });
        // Cleanup: hủy player khi component unmount
        return () => {
            player.destroy();
        };
    }, [source, width, height]); // Gọi lại khi source, width hoặc height thay đổi

    return (
        <div>
            {img !== '' ? <div id='player' ref={playerRef} /> :  ''}
        </div>
    )
};

export default ClapprPlayer;

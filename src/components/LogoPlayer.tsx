import * as React from "react";
import videojs from "video.js";

// Styles
import "video.js/dist/video-js.css";

interface ILogoPlayerProps {
    options: videojs.PlayerOptions;
}

const initialOptions: videojs.PlayerOptions = {
    autoplay: 'muted',
    loop: true,
    // preload: 'auto',
    fluid: true,
};

const LogoPlayer: React.FC<ILogoPlayerProps> = ({ options }) => {
    const videoNode = React.useRef<HTMLVideoElement>(null);
    const player = React.useRef<videojs.Player>();

    React.useEffect(() => {
        player.current = videojs(videoNode.current!, {
            ...initialOptions,
            ...options
        }).ready(function() {
        // console.log('onPlayerReady', this);
        });
        return () => {
            if (player.current) {
                player.current.dispose();
            }
        };
    }, [options]);

    return <video ref={videoNode} className="video-js" />;
};

export default LogoPlayer;

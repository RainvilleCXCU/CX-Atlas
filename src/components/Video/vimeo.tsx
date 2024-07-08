import { useEffect, useState } from "react";
import { embedVimeo } from 'lib/vimeo';
export interface Props {
	id: string;
    hasBackground: boolean;
    player_id: boolean;
    app_id: string;
    badge: boolean;
    responsive: boolean;
}

function Vimeo({ 
    id, 
    hasBackground = true,
    player_id = false,
    app_id = '58746',
    badge = false,
    responsive = true
}: Props): JSX.Element {
    const [isLoaded, setIsLoaded] = useState(false);

    // const embedVimeo = (
    //     {container}
    // ) => {
    //     console.log('VIDEO LOAD');    
    //     if(Player && !isLoaded && id) {
    //         const options = {
    //             id: id,
    //             background: hasBackground,
    //             responsive: responsive
    //         }
    //         const videoPlayer = new Player(container, options);
    //         videoPlayer.on('play', function() {
    //             console.log('Played the video');
    //         });        
    //     }
    // }

	useEffect(() => {
        console.log('TRY LOADING VIMEO')
        if(!isLoaded && id) {
            embedVimeo({container:`vimeo${id}`,id: id, hasBackground: hasBackground, responsive: responsive});
            setIsLoaded(true);
        }
        return () => {
    		console.log('Cleanup!');
            setIsLoaded(false);
    	}
    }, [id])
	return (
		<div id={`vimeo${id}`} className="cx-vimeo__video" 
            // data-vimeo-id={id}
            // data-vimeo-background={hasBackground ? 1 : 0} 
            // data-vimeo-player_id={player_id ? 1 : 0}
            // data-vimeo-app_id={app_id}
            // data-vimeo-badge={badge ? 1 : 0}
            // data-vimeo-responsive={responsive ?? 1}
        ></div>
	);
}

export default Vimeo;

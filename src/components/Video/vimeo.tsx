import { useEffect } from "react";
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
	useEffect(() => {
        embedVimeo({container:`vimeo${id}`});
    }, [id])
	return (
		<div id={`vimeo${id}`} className="cx-vimeo__video" 
            data-vimeo-id={id}
            data-vimeo-background={hasBackground ? 1 : 0} 
            data-vimeo-player_id={player_id ? 1 : 0}
            data-vimeo-app_id={app_id}
            data-vimeo-badge={badge ? 1 : 0}
            data-vimeo-responsive={responsive ?? 1}
        ></div>
	);
}

export default Vimeo;

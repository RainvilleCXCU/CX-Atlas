import Player from '@vimeo/player';

export const embedVimeo = (
    {   
        container,
        id,
        hasBackground = true,
        responsive = true
    }
) => {
    console.log('VIDEO LOAD');    
    if(Player) {
        const options = {
            id: id,
            background: hasBackground,
            responsive: responsive
        }
        const videoPlayer = new Player(container, options);
        videoPlayer.on('play', function() {
            console.log('Played the video');
        });        
    }
}
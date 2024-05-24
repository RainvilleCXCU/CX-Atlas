import Player from '@vimeo/player';

export const embedVimeo = (
    {container}
) => {
    console.log('VIDEO LOAD');
    
    if(Player) {
        const videoPlayer = new Player(container);
        videoPlayer.on('play', function() {
            console.log('Played the video');
        });        
    }
}
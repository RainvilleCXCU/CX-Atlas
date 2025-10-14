import { niceChat } from "lib/chat";
import { FC, useEffect, useState } from 'react';
interface NiceChatProps {
	children: string;
    className: string;
}

const NiceChat: FC<NiceChatProps> = ({ className = '', children = <></> }) => {
    const [chatLoaded, setChatLoaded] = useState(false);
    useEffect(() => {
        if(!chatLoaded && window.CXoneDfo == undefined) {
            (function(n,u){
                let e;
                window.CXoneDfo=n,
                window[n]=window[n]||function(){(window[n].q=window[n].q||[]).push(arguments)},window[n].u=u,
                e=document.createElement("script"),e.type="module",e.src=u+"?"+Math.round(Date.now()/1e3/3600),
                document.head.appendChild(e)
            })('cxone','https://web-modules-de-na1.niceincontact.com/loader/1/loader.js');

            niceChat().initChat();
            setChatLoaded(true);
        }
    },[])
    const showChat = e => {
        e.preventDefault();
        if(document.querySelector<HTMLElement>('[data-selector="GUIDE_CHANNEL_BUTTON"]')) {
            document.querySelector<HTMLElement>('[data-selector="GUIDE_CHANNEL_BUTTON"]').click()
        }
    }
	return (        
        <a href="" className={className} onClick={showChat}>{children}</a>
	);
};

export default NiceChat;
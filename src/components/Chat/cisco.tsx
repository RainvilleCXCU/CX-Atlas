import { ciscoBubbleChat } from "lib/chat";
interface ChatProps {
	children: string;
    className: string;
}

const Chat: React.FC<ChatProps> = ({ className = '', children = <></> }) => {
    const showChat = e => {
        e.preventDefault();
        ciscoBubbleChat().showChatWindow();
    }
	return (
        
        <a href="" className={className} onClick={showChat}>{children}</a>
	);
};

export default Chat;

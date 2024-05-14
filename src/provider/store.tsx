import { Store } from "../context/store";
import { toggleContentContext } from "context/toggleContext";
import { useState } from 'react';
const Index = (props) => { 
    const [state, setState] = useState({
        version: 1
    });
    const [toggleContent, setToggleContent] = useState('');
    return (
        <Store.Provider value={[state, setState]}>
            <toggleContentContext.Provider value={{toggleContent, setToggleContent}}>
                {props.children} 
            </toggleContentContext.Provider>
        </Store.Provider>
    );
};
export default Index;
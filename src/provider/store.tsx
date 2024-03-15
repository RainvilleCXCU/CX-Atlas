import { Store } from "../context/store";
import { useState } from 'react';;
const Index = (props) => { 
    const [state, setState] = useState({
        version: 1
    });
    return (
        <Store.Provider value={[state, setState]}>
            {props.children} 
        </Store.Provider>
    );
};
export default Index;
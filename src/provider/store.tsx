import React from "react";
import { Store } from "../context/store";
var { useState } = React;
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
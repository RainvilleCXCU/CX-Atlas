import React, { useContext, useEffect, useRef, useState } from "react";
import { client } from 'client';
import Accordion from "components/Accordion/Accordion";
import { parseHtml } from "lib/parser";
import { Store } from "context/store";

export interface Props {
    id: string;
    type: string;
    name: string;
    label?: string;
    content?: string;
    label_pos: string;
    required: boolean;
    description?: string;
    container_classes?: string;
    element_classes?: string;
    error_message?: string;
}

function NFField({ id, type = 'text', name, label, label_pos = "label-above", container_classes, element_classes, description, content, required = false, error_message }: Props): JSX.Element {
    const { useQuery } = client;
    const fieldRef = useRef(null);
    const emailValid = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'i');
    const formData = useQuery().getForm({
        formId: id.toString()
    });
    
    const [state, setState] = useContext(Store);
    const [errorMessage, setErrorMessage] = useState(null);
    const [edited, setEdited] = useState(false);

    const validateField = () => {
        setErrorMessage(null);
        if(fieldRef.current.value === '' && required) {
            setErrorMessage(state.formSettings.validateRequiredField);
            setEdited(true);
        } else {
            if(!emailValid.test(fieldRef.current.value)) {
                setErrorMessage(state.formSettings.changeEmailErrorMsg);
                setEdited(true);
            }
        }
    }

    const changeField = () => {
        if(edited) {
            validateField();
        }
    }

    useEffect(() => {
        setErrorMessage(error_message);
    }, []);

    return (
        <div id={`nf-field-${id}-container`} className={`nf-field-container ${type}-container ${`label-${label_pos === 'default' || label_pos === 'label-above' ? 'above' : label_pos}`} ${container_classes}`}>
            <div className="nf-field">
                <div id={`nf-field-${id}-wrap`} className={`field-wrap ${type}-wrap${errorMessage && ' nf-fail nf-error'}${(edited && !errorMessage) ? ' nf-pass' : ''}`} data-field-id={id}>
                    {type !== 'button' && type !== 'submit' &&
                        <div className="nf-field-label">
                                <label htmlFor={`nf-field-${id}`} id={`nf-label-field-${id}`} className="">
                                    {label} {required && <span className="ninja-forms-req-symbol">*</span> }
                                </label>
                        </div>
                    }
                    <div className="nf-field-element">
                        {type !== 'textarea' && type !== 'button' && type !== 'html'  && type !== 'submit' &&   
                            <input id={`nf-field${id}`} ref={fieldRef} data-field-id={id} name={name || `nf-field${id}`} aria-invalid="false" aria-describedby={`nf-error-${id}`} onChange={changeField} onBlur={validateField} className={`ninja-forms-field nf-element ${element_classes}`} aria-labelledby={`nf-label-field-${id}`} aria-required={required ? 'true' : 'false'} required={required}/>
                        }
                        {type === 'textarea' && 
                            <textarea id={`nf-field${id}`} ref={fieldRef} data-field-id={id} name={name || `nf-field${id}`} aria-invalid="false" aria-describedby={`nf-error-${id}`} className={`ninja-forms-field nf-element ${element_classes}`} aria-labelledby={`nf-label-field-${id}`}  aria-required={required ? 'true' : 'false'} required={required}></textarea>
                        }
                        {type === 'button' || type === 'submit' && 
                            <input id={`nf-field${id}`} ref={fieldRef} className={`ninja-forms-field nf-element ${element_classes}`} type="submit" value="Submit"></input>
                        }
                        {type === 'html' && 
                            parseHtml(content)
                        }
                    </div>
                    { description &&
                        <div className="nf-field-description">{parseHtml(description)}</div>
                    }
                </div>
            </div>
            <div className="nf-after-field">
                <div className="nf-input-limit"></div>
                { errorMessage &&
                    <div id={`nf-error-${id}`} className="nf-error-wrap nf-error" role="alert">
                        <div className="nf-error-msg nf-error-invalid-email">{errorMessage}</div>
                    </div>
                }
            </div>
        </div>
    );
}

export default NFField;

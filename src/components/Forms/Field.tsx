import React, { useContext, useEffect, useRef, useState } from "react";
import { client } from 'client';
import Accordion from "components/Accordion/Accordion";
import { parseHtml } from "lib/parser";
import { Store } from "context/store";

export interface Props {
    id: string;
    type: string;
    form: string;
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

function NFField({ id, form, type = 'text', name, label, label_pos = "label-above", container_classes, element_classes, description, content, required = false, error_message }: Props): JSX.Element {

    const fieldRef = useRef(null);
    const emailValid = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'i');
    
    const [state, setState] = useContext(Store);
    const [errorMessage, setErrorMessage] = useState(null);
    const [edited, setEdited] = useState(false);
    const [isValid, setValid] = useState(false)

    const validateField = () => {
        setErrorMessage(null);
        let error = null;
        if(fieldRef.current.value === '' && required) {
            setEdited(true);
            error = state.formSettings.validateRequiredField;
        } else {
            if(type === 'email' && !emailValid.test(fieldRef.current.value)) {
                setEdited(true);
                error = state.formSettings.changeEmailErrorMsg;
            }
        }

        setErrorMessage(error);

        setState({
            ...state,
            forms: {
                ...state.forms,
                [form]: {
                    ...state.forms?.[form],
                    fields: {
                        ...state.forms?.[form].fields,
                        [id]: {
                            ...state.forms?.[form]?.fields?.[id],
                            error
                        }
                    }
                }
            }
        });
    }

    const changeField = e => {
        if(edited) {
            validateField();
        }
        setState({
            ...state,
            forms: {
                ...state.forms,
                [form]: {
                    ...state.forms?.[form],
                    fields: {
                        ...state.forms?.[form].fields,
                        [id]: {
                            ...state.forms?.[form]?.fields?.[id],
                            value: e.target.value
                        }
                    }
                }
            }
        })
    }

    const showSubmit = () => {
        for( const field in state?.forms?.[form]?.fields) {
            const hasError = state?.forms?.[form]?.fields[field].error !== null;
            const missingReq = ( (!state?.forms?.[form]?.fields[field].value || state?.forms?.[form]?.fields[field].value == '') && state?.forms?.[form]?.fields[field].required)
            if(missingReq || hasError) {
                return false;
            }
        }
        return true;
    }

    useEffect(() => {
        if(!state.forms?.[form]?.fields?.[id]) {
            setState(state => ({
                ...state,
                forms: {
                    ...state.forms,
                    [form]: {
                        ...state.forms?.[form],
                        fields: {
                            ...state.forms?.[form].fields,
                            [id]: {
                                ...state.forms?.[form]?.fields?.[id],
                                required,
                                error: null
                            }
                        }
                    }
                }
            }));
        }
    });

    useEffect(() => {
        setValid(showSubmit());
    }, [state?.forms?.[form]?.fields]);

    return (
        <div id={`nf-field-${id}-container`} className={`nf-field-container ${type}-container ${`label-${label_pos === 'default' || label_pos === 'label-above' ? 'above' : label_pos}`} ${container_classes}`}>
            <div className="nf-field">
                <div id={`nf-field-${id}-wrap`} className={`field-wrap ${type}-wrap${errorMessage && ' nf-fail nf-error'}${(edited && !errorMessage) ? ' nf-pass' : ''}`} data-field-id={id}>
                    {type !== 'button' && type !== 'submit' && required &&
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
                            <textarea id={`nf-field${id}`} ref={fieldRef} data-field-id={id} name={name || `nf-field${id}`} aria-invalid="false" aria-describedby={`nf-error-${id}`} onChange={changeField} onBlur={validateField} className={`ninja-forms-field nf-element ${element_classes}`} aria-labelledby={`nf-label-field-${id}`}  aria-required={required ? 'true' : 'false'} required={required}></textarea>
                        }
                        {type === 'button' || type === 'submit' && 
                            <input id={`nf-field${id}`} ref={fieldRef} className={`ninja-forms-field nf-element ${element_classes}`} type="submit" value="Submit" disabled={!isValid}></input>
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
                        <div className="nf-error-msg nf-error-invalid-email">{parseHtml(errorMessage)}</div>
                    </div>
                }
            </div>
        </div>
    );
}

export default NFField;

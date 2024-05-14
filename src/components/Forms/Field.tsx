import { useContext, useEffect, useRef, useState } from "react";
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
    submitNum?
    options?
    formSettings?
}

function NFField({ id, form, type = 'text', name, label, label_pos = "label-above", container_classes, options, element_classes, description, content, formSettings, required = false, error_message, submitNum }: Props): JSX.Element {

    const fieldRef = useRef(null);
    const [fieldVal, setFieldVal] = useState(null);
    const [ subNum, setSubNum ] = useState(0);
    const emailValid = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'i');
    
    const [state, setState] = useContext(Store);
    const [errorMessage, setErrorMessage] = useState(null);
    const [edited, setEdited] = useState(false);
    const [isValid, setValid] = useState(false);
    const [val, setVal] = useState(null);

    const validateField = () => {
        setErrorMessage(null);
        let error = null;
        console.log('Validate');
        console.log(fieldVal);
        console.log(required)
        if((fieldVal === null || fieldVal === '' || fieldVal === false) && required) {
            setEdited(true);
            error = formSettings.validateRequiredField;
        } else {
            if(name === 'email' && !emailValid.test(fieldVal)) {
                setEdited(true);
                error = formSettings.changeEmailErrorMsg;
            }
        }

        setErrorMessage(error);
        console.log('ERROR MESSAGE');
        console.log(error);
        setState({
            ...state,
            forms: {
                ...state.forms,
                [form]: {
                    ...state.forms?.[form],
                    fields: {
                        ...state.forms?.[form]?.fields,
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
        setFieldVal(type === 'checkbox' ? e.currentTarget.checked : e.currentTarget.value);
        if(type === 'checkbox') {
            setEdited(true);
        }
        console.log('CHANGE FIELD');
        console.log(e.currentTarget.checked)
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
                            value: type === 'checkbox' ? e.target.checked : e.target.value
                        }
                    }
                }
            }
        })
    }

    useEffect(() => {
        if(edited) {
            console.log('ValidateField')
            validateField();
        }
    }, [fieldVal])

    useEffect(() => {
        if(submitNum !== subNum) {
            validateField();
            setSubNum(submitNum);
        }
    }, [submitNum])
    

    useEffect(() => {
        if(!state.forms?.[form]?.fields?.[id]) {
            setState(state => ({
                ...state,
                forms: {
                    ...state.forms,
                    [form]: {
                        ...state.forms?.[form],
                        fields: {
                            ...state.forms?.[form]?.fields,
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
        setValid(showSubmit());
    }, [form, state?.forms, state?.forms?.[form]?.fields]);

    return (
        <div id={`nf-field-${id}-container`} className={`nf-field-container ${type}-container ${`label-${label_pos === 'default' || label_pos === 'label-above' ? 'above' : label_pos}`} ${container_classes}`}>
            <div className="nf-field">
                <div id={`nf-field-${id}-wrap`} className={`field-wrap ${type}-wrap${type === 'listradio' ? ' list-wrap list-radio-wrap' : ""}${type === 'listselect' ? ' list-wrap list-select-wrap' : ""}${errorMessage ? ' nf-fail nf-error' : ''}${(edited && !errorMessage) ? ' nf-pass' : ''}`} data-field-id={id}>
                    {type !== 'button' && type !== 'submit' &&
                        <div className="nf-field-label">
                                <label htmlFor={`nf-field-${id}`} id={`nf-label-field-${id}`} className={`${type === 'checkbox' && fieldVal ? ' nf-checked-label' : ''}`}>
                                    {label} {required && <span className="ninja-forms-req-symbol">*</span> }
                                </label>
                        </div>
                    }
                    <div className="nf-field-element">
                        {type === 'button' || type === 'submit' && 
                            <input ref={fieldRef} className={`ninja-forms-field nf-element ${element_classes}`} type={type} value={label}></input>
                        }
                        {type === 'checkbox' &&
                            <input type={'checkbox'} ref={fieldRef} data-field-id={id} name={name || `nf-field-${id}`} id={name || `nf-field-${id}`} aria-invalid="false" aria-describedby={`nf-error-${id}`} onChange={changeField} className={`ninja-forms-field nf-element ${element_classes}${type === 'checkbox' && fieldVal ? ' nf-checked' : ''}`} aria-labelledby={`nf-label-field-${id}`} aria-required={required ? 'true' : 'false'} required={required}/>
                        }
                        {type === 'listradio' && 
                            <ul>
                                {options && options.map(({label, value, selected}, index) => (
                                    <li key={`nf-field-${id}-${index}`}>
                                        <input type="radio" id={`nf-field-${id}-${index}`} value={value} ref={fieldRef} name={name || `nf-field-${id}`} aria-describedby={`nf-error-${id}-${index}`} className={`ninja-forms-field nf-element`} aria-labelledby={`nf-label-field-${id}`} onChange={changeField} aria-required={required ? 'true' : 'false'} required={required} />
                                        <label htmlFor={`nf-field-${id}-${index}`} id={`nf-label-class-field-${id}`} className={val === value ? 'nf-checked-label' : ''}>{label}</label>
                                    </li>
                                ))}
                            </ul>
                        }
                        {type === 'listselect' && 
                            <select ref={fieldRef} name={name || `nf-field${id}`} aria-invalid="false"aria-describedby={`nf-error-${id}`} onChange={changeField} onBlur={validateField} className={`custom-select-opener ninja-forms-field nf-element ${element_classes}`} aria-labelledby={`nf-label-field-${id}`}  aria-required={required ? 'true' : 'false'} required={required}>
                                {options && options.map(({label, value, selected}, index) => (
                                    <option value={value} key={`nf-field${id}-${index}`} selected={val}>{label}</option>
                                ))}
                            </select>
                        }
                        {type === 'textarea' && 
                            <textarea ref={fieldRef} data-field-id={id} name={name || `nf-field${id}`} aria-invalid="false" aria-describedby={`nf-error-${id}`} onChange={changeField} onBlur={validateField} className={`ninja-forms-field nf-element ${element_classes}`} aria-labelledby={`nf-label-field-${id}`}  aria-required={required ? 'true' : 'false'} required={required}></textarea>
                        }
                        {type === 'html' && 
                            parseHtml(content)
                        }
                        {type !== 'textarea' && type !== 'button' && type !== 'html'  && type !== 'submit' && type !== 'listradio' && type !== 'listselect' && type !== 'checkbox' &&
                            <input type={type === 'phone' ? 'tel' : type === 'checkbox' ? 'checkbox' : 'text'} ref={fieldRef} data-field-id={id} name={name || `nf-field-${id}`} id={name || `nf-field-${id}`} aria-invalid="false" aria-describedby={`nf-error-${id}`} onChange={changeField} onBlur={type !== 'checkbox' ? validateField : null} className={`ninja-forms-field nf-element ${element_classes}${type === 'checkbox' && fieldVal ? ' nf-checked' : ''}`} aria-labelledby={`nf-label-field-${id}`} aria-required={required ? 'true' : 'false'} required={required} autoComplete="given-name" />
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

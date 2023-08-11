import React from "react";
import { client } from 'client';
import Accordion from "components/Accordion/Accordion";
import { parseHtml } from "lib/parser";

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
}

function NFField({ id, type = 'text', name, label, label_pos = "label-above", container_classes, element_classes, description, content, required = false }: Props): JSX.Element {
    const { useQuery } = client;
    const formData = useQuery().getForm({
        formId: id.toString()
    });
    console.log('Form Data:');
    console.log(formData.settings);
    return (
        <div id={`nf-field-${id}-container`} className={`nf-field-container ${type}-container ${`label-${label_pos === 'default' || label_pos === 'label-above' ? 'above' : label_pos}`} ${container_classes}`}>
            <div className="nf-field">
                <div id={`nf-field-${id}-wrap`} className={`field-wrap ${type}-wrap`} data-field-id={id}>
                    {type !== 'button' && type !== 'submit' &&
                        <div className="nf-field-label">
                                <label htmlFor={`nf-field-${id}`} id={`nf-label-field-${id}`} className="">
                                    {label} {required && <span className="ninja-forms-req-symbol">*</span> }
                                </label>
                        </div>
                    }
                    <div className="nf-field-element">
                        {type !== 'textarea' && type !== 'button' && type !== 'html'  && type !== 'submit' &&   
                            <input id={`nf-field${id}`} name={name || `nf-field${id}`} aria-invalid="false" aria-describedby={`nf-error-${id}`} className={`ninja-forms-field nf-element ${element_classes}`} aria-labelledby={`nf-label-field-${id}`} aria-required={required ? 'true' : 'false'} required={required}/>
                        }
                        {type === 'textarea' && 
                            <textarea id={`nf-field${id}`} name={name || `nf-field${id}`} aria-invalid="false" aria-describedby={`nf-error-${id}`} className={`ninja-forms-field nf-element ${element_classes}`} aria-labelledby={`nf-label-field-${id}`}  aria-required={required ? 'true' : 'false'} required={required}></textarea>
                        }
                        {type === 'button' || type === 'submit' && 
                            <input id={`nf-field${id}`} className={`ninja-forms-field nf-element ${element_classes}`} type="submit" value="Submit"></input>
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
        </div>
    );
}

export default NFField;

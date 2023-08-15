import React, { useContext, useEffect, useState } from "react";
import { client } from 'client';
import Accordion from "components/Accordion/Accordion";
import { parseHtml } from "lib/parser";
import NFField from "./Field";
import { Store } from "context/store";

export interface Props {
    id: string;
}

function Form({ id }: Props): JSX.Element {
    const { useQuery } = client;
    const [state, setState] = useContext(Store);
    const formData = useQuery().getForm({
        formId: id.toString()
    });
    const [ response, setResponse ] = useState(null);

    const formSettings = formData?.settings && JSON.parse(formData?.settings);
    const nonce = formData?.ajaxNonce;

    useEffect(() => {
        setState({
            ...state,
            formSettings: {
                ...state.formSettings, 
                ...formSettings
            }
        });
    }, [formData?.settings]);

    const submitForm = e => {
        e.preventDefault();
        let fields = {};

        for (const element of e.target.elements) {
            if(element.attributes['data-field-id']) {
                fields[element.attributes['data-field-id'].value] =  {
                    id: element.attributes['data-field-id'].value,
                    value: element.value
                }
            }
        }
        const data = {
            "id": id,
            "fields": fields,
            "settings": formSettings,
            "extra": {}
        };

        const submitData = {
            'formData': JSON.stringify(data),
            action: 'nf_ajax_submit',
            security: nonce
        }

        const formBody = Object.keys(submitData).map(key =>      encodeURIComponent(key) + '=' + encodeURIComponent(submitData[key])).join('&');

        fetch(
            "/wp-admin/admin-ajax.php",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: formBody
            }
        )
            .then((res) => res.json())
            .then((data) => {
                setResponse(data);
            });
    }

    return (
        <div id="nf-form-1-cont" className="nf-form-cont" aria-live="polite" aria-labelledby="nf-form-title-1" aria-describedby="nf-form-errors-1" role="form">
            <span id="nf-form-title-1" className="nf-form-title">
                {formSettings && formSettings.show_title !== 0 && parseHtml(formSettings.title)}
            </span>
            <div className="nf-form-wrap ninja-forms-form-wrap">
                { response?.data?.actions?.success_message &&
                    <div className="nf-response-message">
                        {parseHtml(`<span>${response?.data?.actions?.success_message}</span>`)}
                    </div>
                }
                { !response?.data?.actions?.success_message &&
                    <div className="nf-form-layout">
                        <form onSubmit={submitForm}>
                            <div className="nf-form-cont">
                                <div className="nf-before-form-content">
                                    <div className="nf-form-fields-required">
                                        Fields marked with an <span className="ninja-forms-req-symbol">*</span> are required
                                    </div>
                                </div>
                                <div className="nf-form-content">
                                    {formData?.fields && JSON.parse(formData?.fields).map((field, index) => (
                                        <NFField
                                            id={field.id}
                                            key={`form-${id}-field-${field.id}`}
                                            form={id}
                                            type={field.type}
                                            name={field.custom_name_attribute}
                                            label={field.label}
                                            label_pos={field.label_pos === 'default' ? formSettings.default_label_pos : field?.label_pos?.replace('label-', '')}
                                            content={field.default ? field.default : ''}
                                            required={field.required?.toString() === "1" ? true : false}
                                            container_classes={field.container_class}
                                            element_classes={field.element_class}
                                            description={field.desc_text}
                                            error_message={response?.errors?.fields && response?.errors?.fields[field.id] || null}
                                        />
                                    ))
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                }
            </div>
        </div>
    );
}

export default Form;

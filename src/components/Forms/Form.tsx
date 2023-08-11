import React from "react";
import { client } from 'client';
import Accordion from "components/Accordion/Accordion";
import { parseHtml } from "lib/parser";
import NFField from "./Field";

export interface Props {
    id: string;
}

function Form({ id }: Props): JSX.Element {
    const { useQuery } = client;
    const formData = useQuery().getForm({
        formId: id.toString()
    });
    const formSettings = formData?.settings && JSON.parse(formData?.settings);
    console.log('Form Data:');
    console.log(formData.settings);
    return (
        <div id="nf-form-1-cont" className="nf-form-cont" aria-live="polite" aria-labelledby="nf-form-title-1" aria-describedby="nf-form-errors-1" role="form">
            <span id="nf-form-title-1" className="nf-form-title">
                {formSettings && formSettings.show_title !== 0 && parseHtml(formSettings.title)}
			</span>
            <div className="nf-form-wrap ninja-forms-form-wrap">
                <div className="nf-form-layout">
                    <form>
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
                                        type={field.type}
                                        name={field.custom_name_attribute}
                                        label={field.label}
                                        label_pos={field.label_pos === 'default' ? formSettings.default_label_pos : field?.label_pos?.replace('label-', '')}
                                        content={field.default ? field.default : ''}
                                        required={field.required}
                                        container_classes={field.container_class}
                                        element_classes={field.element_class}
                                        description={field.desc_text}
                                    />
                                ))
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Form;

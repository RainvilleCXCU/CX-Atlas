import { useContext, useEffect, useRef, useState } from "react";
import { parseHtml } from "lib/parser";
import NFField from "./Field";
import { Store } from "context/store";
import { gql, useQuery } from "@apollo/client";
import apolloClient from "apolloClient";
import Head from "next/head";

export interface Props {
    id: string;
}

function Form({ id }: Props): JSX.Element {
    const [state, setState] = useContext(Store);
    const formRef = useRef(null);

    const [submitNum, setSubmitNum] = useState(0);

    const [formSettings, setFormSettings] = useState(null);
    const [nonce, setNonce] = useState('');
    const [ formId, setFormId ] = useState('');
    const [isLinkElementLoaded, setLinkElementLoaded] = useState(false)
    // const formData = useQuery().getForm({
    //     formId: id.toString()
    // });



    // Use the standalone Apollo client (plain HttpLink) so this query is sent as
    // a POST. The default Faust client uses automatic persisted queries with
    // useGETForHashedQueries, which forces GET and can't be overridden per-query.
    const FormQuery = useQuery(gql`
    query GetFormData($id: String!) {
        getForm(formId: $id) {
            settings
            fields
            ajaxNonce
        }

    }`, {
        client: apolloClient,
        variables: {
            id: id
        }
    });

    const [ response, setResponse ] = useState(null);


    const getForm = ($id: string) => {
        console.log('Form Info')
        console.log(`${$id} = ${formId}`)
        if($id !== formId) {
            FormQuery?.refetch({formid: $id});
            setFormId($id);
        }
    }


    useEffect(() => {
        setState(state => ({
            ...state,
            formSettings: {
                ...state.formSettings, 
                ...formSettings
            }
        }));
        console.log('FORM DATA')
        if(FormQuery?.data) {
            console.log(JSON.parse(FormQuery?.data?.getForm?.settings));
            setFormSettings(FormQuery?.data?.getForm?.settings && JSON.parse(FormQuery?.data?.getForm?.settings));
            setNonce(FormQuery?.data?.getForm?.ajaxNonce);
        }
    }, [FormQuery?.data]);

    useEffect(() => {
        console.log('Form Effect')
        getForm(id);
        setLinkElementLoaded(true)
    }, [id])

    const submitForm = e => {
        e.preventDefault();
        let fields = {};

        for (const element of e.target.elements) {
            if(element.attributes['data-field-id']) {
                fields[element.attributes['data-field-id'].value] =  {
                    id: element.attributes['data-field-id'].value,
                    value: element.type === 'checkbox' ? element.checked : element.value
                }
            }
        }
        const formSubmitFields = {
            "id": id,
            "fields": fields,
            "settings": formSettings,
            "extra": {}
        };

        const submitData = {
            'formData': JSON.stringify(formSubmitFields),
            action: 'nf_ajax_submit',
            security: nonce
        }
        console.log('SUBMIT DATA');
        console.log(submitData);

        const formBody = Object.keys(submitData).map(key =>      encodeURIComponent(key) + '=' + encodeURIComponent(submitData[key])).join('&');

        setSubmitNum(submitNum+1);

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
        <>
        {/*
            These were previously injected with document.head.prepend(), which
            put them at the front of <head> — inside the region next/head
            reclaims positionally — and never removed them, re-adding a pair on
            every `id` change. Declaring them here keeps them managed and keyed.
        */}
        <Head>
            <link
                key="nf-display-opinions-light"
                rel="stylesheet"
                type="text/css"
                href="/wp-content/plugins/ninja-forms/assets/css/display-opinions-light.css?ver=6.2.4"
            />
            <link
                key="nf-font-awesome"
                rel="stylesheet"
                type="text/css"
                href="/wp-content/plugins/ninja-forms/assets/css/font-awesome.min.css?ver=6.2.4"
            />
        </Head>
        <div id="nf-form-1-cont" className="nf-form-cont" aria-live="polite" aria-labelledby="nf-form-title-1" aria-describedby="nf-form-errors-1" role="form">
            
            <span id="nf-form-title-1" className="nf-form-title">
                {formSettings && formSettings?.show_title !== 0 && parseHtml(formSettings?.title)}
            </span>
            <div className="nf-form-wrap ninja-forms-form-wrap">
                { response?.data?.actions?.success_message &&
                    <div className="nf-response-message">
                        {parseHtml(`<span>${response?.data?.actions?.success_message}</span>`)}
                    </div>
                }
                { !response?.data?.actions?.success_message &&
                    <div className="nf-form-layout">
                        <form onSubmit={submitForm} ref={formRef} noValidate>
                            <div className="nf-form-cont">
                                <div className="nf-before-form-content">
                                    <div className="nf-form-fields-required">
                                        Fields marked with an <span className="ninja-forms-req-symbol">*</span> are required
                                    </div>
                                </div>
                                <div className="nf-form-content">
                                    {FormQuery?.data?.getForm?.fields && JSON.parse(FormQuery?.data?.getForm?.fields).map((field, index) => (
                                        <NFField
                                            id={field.id}
                                            key={`form-${id}-field-${field.id}`}
                                            form={id}
                                            type={field.type}
                                            name={field.custom_name_attribute}
                                            label={field.label}
                                            options={field.options}
                                            label_pos={field.label_pos === 'default' ? formSettings?.default_label_pos : field?.label_pos?.replace('label-', '')}
                                            content={field.default ? field.default : ''}
                                            required={field.required?.toString() === "1" ? true : false}
                                            container_classes={field.container_class}
                                            element_classes={field.element_class}
                                            description={field.desc_text}
                                            formSettings={formSettings}
                                            submitNum={submitNum}
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
        </>
    );
}

export default Form;

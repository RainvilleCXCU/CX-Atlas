import { useContext, useEffect, useRef, useState, useMemo, useCallback } from "react";
import NFField from "./Field";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { Store } from "context/store";

const GET_FORM_DATA = gql`
    query GetFormData($id: String!) {
        getForm(formId: $id) {
            settings
            fields
            ajaxNonce
        }
    }
`;

export interface Props {
    id?: string;
    href?: string;
    isMinor?: boolean;
}

function MLForm({ id, href, isMinor = false }: Props): JSX.Element {
    const formRef = useRef(null);
    const [state, setState] = useContext(Store);

    const [submitNum, setSubmitNum] = useState(0); 
    const [Fields, setFields] = useState([]);
    const router = useRouter()

    const [formSettings, setFormSettings] = useState({
        changeEmailErrorMsg: '',
        default_label_pos: 'top',
        validateRequiredField: 'This field is required'
    });

    const [nonce, setNonce] = useState('');
    const [formId, setFormId] = useState('');
    const [isLinkElementLoaded, setLinkElementLoaded] = useState(false)

    const FormQuery = useQuery(GET_FORM_DATA, {
        variables: { id },
        skip: !id,
        fetchPolicy: 'cache-first'
    });

    const [response, setResponse] = useState(null);

    const parsedFormData = useMemo(() => {
        if (!FormQuery?.data?.getForm) return null;
        
        const { settings, fields, ajaxNonce } = FormQuery.data.getForm;
        return {
            settings: settings ? JSON.parse(settings) : {},
            fields: fields ? JSON.parse(fields) : [],
            nonce: ajaxNonce
        };
    }, [FormQuery?.data]);

    useEffect(() => {
        if (parsedFormData) {
            setFormSettings(parsedFormData.settings);
            setFields(parsedFormData.fields);
            setNonce(parsedFormData.nonce || '');
        }
    }, [parsedFormData]);

    useEffect(() => {
        setState(state => ({
            ...state,
            formSettings: {
                ...state.formSettings, 
                ...formSettings
            }
        }));
    }, [formSettings, setState]);

    // Use useCallback to prevent recreating the function on every render
    const validateAllFields = useCallback(() => {
        console.log('Validating form fields');
        if (!formRef.current) {
            console.log('Form ref not available');
            return false;
        }

        const inputs = formRef.current.querySelectorAll(
            'input:not([type="hidden"]):not([type="submit"]):not([type="button"]), textarea, select'
        );

        console.log(`Found ${inputs.length} inputs to validate`);

        let isValid = true;

        inputs.forEach((input) => {
            console.log('Validating input:', input.name, 'type:', input.type);
            
            // Force validation by focusing and blurring
            input.focus();
            input.blur();
            
            // Trigger change event for additional validation
            const changeEvent = new Event('change', { bubbles: true });
            input.dispatchEvent(changeEvent);

            // Trigger blur event as well (some validation libraries use this)
            const blurEvent = new Event('blur', { bubbles: true });
            input.dispatchEvent(blurEvent);

            // Check HTML5 validity
            if (!input.checkValidity()) {
                console.log('Input invalid:', input.name, 'validation message:', input.validationMessage);
                isValid = false;
            }
        });

        console.log('Overall form validity:', isValid);
        return isValid;
    }, []); // Empty deps since it only uses refs
    const submitForm = useCallback((e) => {
        e.preventDefault();
        console.log('Form submit triggered');

        const isValid = validateAllFields();
        
        if (!isValid) {
            console.log('Form has validation errors - stopping submission');
            // Increment submitNum to trigger re-validation in child components
            setSubmitNum(prev => prev + 1);
            return;
        }
        

        console.log('Form is valid - proceeding with submission');
        const formData = new FormData(e.target);
        const opt_out = formData.get('Opt_out');
        const isOptedOut = opt_out !== null;
        e.target.action += `&opt_out=${isOptedOut}`;
        e.target.submit();
    }, [validateAllFields]);

    useEffect(() => {
        if(!isLinkElementLoaded) {
            const linkElement = document.createElement("link");
            linkElement.setAttribute("rel", "stylesheet");
            linkElement.setAttribute("type", "text/css");
            linkElement.setAttribute(
                "href",
                "/wp-content/plugins/ninja-forms/assets/css/display-opinions-light.css?ver=6.2.4"
            );
            document.head.prepend(linkElement);

            const fonts = document.createElement("link");
            fonts.setAttribute("rel", "stylesheet");
            fonts.setAttribute("type", "text/css");
            fonts.setAttribute(
                "href",
                "/wp-content/plugins/ninja-forms/assets/css/font-awesome.min.css?ver=6.2.4"
            );
            document.head.prepend(fonts);

            setLinkElementLoaded(true);
        }
    }, [id])

    return (
        <div id="nf-form-1-cont" className="nf-form-cont" aria-live="polite" aria-labelledby="nf-form-title-1" aria-describedby="nf-form-errors-1" role="form">
            
            {/* <span id="nf-form-title-1" className="nf-form-title center">
                Let's get started!
            </span> */}
            <div className="nf-form-wrap ninja-forms-form-wrap">
                <div className="nf-form-layout">
                    <form ref={formRef} action={href} onSubmit={submitForm} method="POST" noValidate>
                        <div className="nf-form-cont">
                            <div className="nf-before-form-content">
                                <div className="nf-form-fields-required">
                                    {/* Fields marked with an <span className="ninja-forms-req-symbol">*</span> are required */}
                                </div>
                            </div>
                            <div>
                                {FormQuery.loading && <div>Loading form...</div>}
                                {FormQuery.error && <div>Error loading form: {FormQuery.error.message}</div>}
                                {Fields && Fields.map((field) => (
                                    <NFField
                                        id={field.id}
                                        key={`form-${id}-field-${field.id}`}
                                        form={id}
                                        type={field.type}
                                        container_classes={field.container_class ? field.container_class : ''}
                                        element_classes={field.element_class ? field.element_class : ''}
                                        name={field.custom_name_attribute ? field.custom_name_attribute : field.type == 'checkbox' ? field.checked_value : field?.id}
                                        value={field?.value || ''}
                                        label={field.label}
                                        options={field.options}
                                        label_pos={field.label_pos === 'default' ? formSettings?.default_label_pos : field?.label_pos?.replace('label-', '')}
                                        required={field.required?.toString() === "1" ? true : false}
                                        formSettings={formSettings}
                                        submitNum={submitNum}
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

export default MLForm;
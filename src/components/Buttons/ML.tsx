import Column from "components/Blocks/Column";
import Columns from "components/Blocks/Columns";
import Container from "components/Blocks/Container";
import MLForm from "components/Forms/ML";
import { isModalOpenContext, modalContentContext } from "components/Modal/modalContext";
import { bridgeFlowSettingsContext } from "context/bridgeFlowSettings";
import MarketingCloudForm from "components/Salesforce/cloudpage";
import { useContext, useState } from "react";
import { getDynamicQueryVal } from "utils/urlParser";

export interface Props {
    href?,
    target?,
    children?,
    classNames?
}

function MLButton({
    href,
    target,
    children = <></>,
    classNames = ''
}: Props): JSX.Element {
    const [ showForm, setShowForm ] = useState(false);
    const {setIsModalOpen} = useContext(isModalOpenContext);
    const {setModalContent} = useContext(modalContentContext);
    const {bridgeFlowSettings} = useContext(bridgeFlowSettingsContext);

    let formComponent = <MLForm id={bridgeFlowSettings?.preApplicationFormId || null} href={href} />

    const getProductFields = product => {
        if(product.includes('VehicleLoan')) {
            return `
                <h4>Loan Information</h4>
                <p><label>Who are you purchasing the vehicle from?</label>
                <select name="LoanPurpose">
                    <option value="DEALERSHIP PURCHASE">Dealership</option>
                    <option value="PRIVATE PARTY PURCHASE">Private Party</option>
                </select>
            `;
        }
    }

    const handleClick = e => {
        e.preventDefault();
        // Create a URL object from the string
        const url = new URL(href);

        // Access the searchParams property
        const preFormEnable = url.searchParams.get('prePopulateFormEnabled');

        console.log('preFormEnable');
        console.log(preFormEnable);
        if(preFormEnable && preFormEnable == 'yes' && bridgeFlowSettings?.preApplicationFormId) {
            setShowForm(true);
            let html = `<form action=${href} method="POST">
                <h4>Your information</h4>
                <p><label>First Name</label>
                <input type='text' required name='fname' /></p>
                <p><label>Last Name</label>
                <input type='text' required name='lname' /></p>
                <p><label>Email</label>
                <input type='email' required name='email' /></p>
                <p><label>Phone</label>
                <input type='tel' name="HomePhone" /></p>
                <p><button type='submit' className='cx-button cx-button--color-positive'>Continue</button></p>
                <div style="font-size:small; font-style: italic; font-weight: inherit;">Please note: Compliance copy.</div>
            </form>`;
            let component = <MarketingCloudForm formUrl={'https://cloud.email.connexuscu.org/Lending_Form'} />
            setModalContent({
                title: 'Let\'s get started!',
                titleClass: 'cx-h4',
                copy: 'We’ll begin your application by collecting some basic contact information.',
                copyClass: 'cx-text--small',
                forceAction: true,
                bodyTakeover: true,
                centerText: true,
                // html
                component: formComponent
            })
            setIsModalOpen(true);
        } else {
            window.location.href = href;
        }
    }
    return (
        <>
            <a href={href} className={`${classNames}`} target={target} onClick={handleClick}>
                {children}
            </a>
        </>
    );
}

export default MLButton;

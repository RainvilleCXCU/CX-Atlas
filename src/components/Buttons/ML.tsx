import Column from "components/Blocks/Column";
import Columns from "components/Blocks/Columns";
import Container from "components/Blocks/Container";
import { isModalOpenContext, modalContentContext } from "components/Modal/modalContext";
import { useContext, useState } from "react";

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

    const getApplicantInfo = () => {

    }

    const handleClick = e => {
        // e.preventDefault();
        // setShowForm(true);
        // let html = `<form action=${href} method="POST">
        //     ${getProductFields(e.currentTarget.href)}
        //     <h4>Your information</h4>
        //     <p><label>First Name</label>
        //     <input type='text' required name='fname' /></p>
        //     <p><label>Last Name</label>
        //     <input type='text' required name='lname' /></p>
        //     <p><label>Email</label>
        //     <input type='email' required name='email' /></p>
        //     <p><label>Phone</label>
        //     <input type='tel' name="HomePhone" /></p>
        //     <p><button type='submit' className='cx-button cx-button--color-positive'>Continue</button></p>
        //     <div style="font-size:small; font-style: italic; font-weight: inherit;">Please note: Compliance copy.</div>
        // </form>`;
        // setModalContent({
        //     // title: 'About application',
        //     // copy: 'Provide some information for your application.',
        //     forceAction: true,
        //     bodyTakeover: true,
        //     html
        // })
        // setIsModalOpen(true);
    }
    return (
        <>
            <a href={href} className={`${classNames}`} target={target}>
                {children}
            </a>
        </>
    );
}

export default MLButton;

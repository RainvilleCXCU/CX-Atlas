export interface Props {
    id: string;
    name: string;
    address: string;
    address2?: string;
    city: string;
    state: string;
    zip: string;
    phoneLabel?: string;
    phone?: string;
    fax?: string;
    email?: string;
    emailLabel?: string;
}

const InfoBox = ({ id, name, address, address2, city, state, zip, phoneLabel, phone, fax, email, emailLabel }: Props): JSX.Element   => {

    return (
        <div data-store-id={id} className="wpsl-info-window">
            <p>
                <strong>{name}</strong>
                <span>{address}</span>
                { address2 && 
                    <span>{address2}</span>
                }
                <span>{city} {state}, {zip}</span>
            </p>
                { phone && 
                    
                    <span><strong>{phoneLabel}</strong>: {phone}</span>
                }
                { fax && 
                    <span><strong>{fax}</strong></span>
                }
                { email && 
                    <span><strong>{emailLabel}</strong>: {email}</span>
                }
        </div>
    );
}

export default InfoBox;

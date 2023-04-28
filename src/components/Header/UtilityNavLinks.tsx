import { client } from 'client';
import parseHtml from 'lib/parser';

interface UtilityNavLinksProps {
    device?: string;
    children?;
}

export default function UtilityNavLinks({ device, children = <></> }: UtilityNavLinksProps) {
    const { useQuery } = client;
    const {headerUtilities} = useQuery().headerSettings;
    return (
        <>
        {parseHtml(headerUtilities ?? '' )}
        </>
    );
};
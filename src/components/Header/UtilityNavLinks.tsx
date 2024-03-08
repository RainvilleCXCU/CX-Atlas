import { parseHtml } from 'lib/parser';

interface UtilityNavLinksProps {
    device?: string;
    children?;
    headerUtilities?;
}

export default function UtilityNavLinks({ headerUtilities, device, children = <></> }: UtilityNavLinksProps) {
    return (
        <>
        {parseHtml(headerUtilities ?? '' )}
        </>
    );
};
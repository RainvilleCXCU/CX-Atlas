import parse, { domToReact } from "html-react-parser";
import Link from "next/link";

export default function parseHtml(html) {
    const options = {
        replace: ({ name, attribs, children}) => {
            console.log(attribs);
            const isInternalLink =  name === "a";

            if(isInternalLink) {
                return (
                    <Link href={attribs.href}>
                        <a {...attribs}>{domToReact(children, options)}</a>
                    </Link>
                );
            }
        },
    }
    return parse(html, options);
};
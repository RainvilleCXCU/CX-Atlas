import parse, { domToReact, attributesToProps } from "html-react-parser";
import Link from "next/link";

export default function parseHtml(html) {
    const options = {
        replace: ({ name, attribs, children}) => {
            const isInternalLink =  name === "a";

            if(isInternalLink) {
                return (
                    <Link href={attribs.href}>
                        <a {...attributesToProps(attribs)}>{domToReact(children, options)}</a>
                    </Link>
                );
            }
        },
    }
    return parse(html, options);
};
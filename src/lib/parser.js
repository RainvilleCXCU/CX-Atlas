//import FAQ from "components/FAQs/faq";
import parse, { domToReact, attributesToProps } from "html-react-parser";
import Link from "next/link";

export default function parseHtml(html) {
    const internalLinkRegEx = /(cxcu|connexus|local)/gi;
    const domainRegEx = /(http)/gi;
    const options = {
        replace: ({ name, attribs, children }) => {
            const isInternalLink = (name == "a" && (internalLinkRegEx.test(attribs.href) || !domainRegEx.test(attribs.href)));
            const isFAQItem = attribs && attribs.class && attribs.class.includes("ewd-ufaq-faq-div");
            if (isInternalLink) {
                const href = attribs.href;
                delete attribs.href;
                return (
                    <Link href={href.replace(/^(?:\/\/|[^\/]+)*\//gi, '/')} {...attributesToProps(attribs)}>{domToReact(children, options)}</Link>
                );
            }

            /*if (isFAQItem) {
                return (
                    <FAQ id={attribs['data-post_id']} />
                )
            }*/
        },
    }
    return parse(html, options);
};
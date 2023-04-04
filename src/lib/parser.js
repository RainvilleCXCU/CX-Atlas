//import FAQ from "components/FAQs/faq";
import parse, { domToReact, attributesToProps } from "html-react-parser";
import Link from "next/link";

export default function parseHtml(html) {
    const options = {
        replace: ({ name, attribs, children }) => {
            const isInternalLink = name === "a";
            const isFAQItem = attribs && attribs.class && attribs.class.includes("ewd-ufaq-faq-div");

            if (isInternalLink) {
                return (
                    <Link href={attribs.href.replace(process.env.NEXT_PUBLIC_WORDPRESS_URL, '')} {...attributesToProps(attribs)}>{domToReact(children, options)}</Link>
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
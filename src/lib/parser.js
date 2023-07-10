//import FAQ from "components/FAQs/faq";
import parse, { domToReact, attributesToProps } from "html-react-parser";
import { client } from 'client';
import Link from "next/link";
import FAQ from "components/FAQs/faq";
import Datatrac from "components/Blocks/Datatrac";
import Chat from "components/Chat/cisco";
// import { ciscoBubbleChat } from "./cisco-chat";

export const parseHtml = (html) => {
    const domainRegEx = new RegExp(/(http)/, 'i');
    const internalLinkRegEx = new RegExp(/(cxcu|(www\.connexus)|local)/, 'i');
    //html = parseShortcode(html);
    const options = {
        trim: true,
        replace: ({ name, attribs, children }) => {
            const isInternalLink = (name === "a" && (internalLinkRegEx.test(attribs.href) || domainRegEx.test(attribs.href) === false ) && !attribs.onClick);
            const isFAQItem = attribs && attribs.class && attribs.class.includes("ewd-ufaq-faq-div");
            const isResponsiveTable = (name === 'table' && attribs && attribs.class && attribs.class.includes("tablepress-responsive"))
            const isDatatrac = attribs && attribs.class && attribs.class.includes("datatrac-wrapper");
            const isCiscoBubbleChat = name === 'a' && attribs && attribs.class?.includes('cx-icon__chat_bubble');
            

            
            if(isCiscoBubbleChat) {
                return <Chat className={attribs.class}>{domToReact(children, options)}</Chat>
            }
            

            else if (isInternalLink) {
                const href = attribs.href;
                delete attribs.href;
                return (
                    <Link href={href.replace(/^(?:\/\/|[^\/]+)*\//gi, '/')} {...attributesToProps(attribs)}>{domToReact(children, options)}</Link>
                );
            }

            else if(isFAQItem) {
                return (
                    <FAQ id={attribs['data-post_id']} />
                )
            }

            else if(isDatatrac) {
                return (
                    <Datatrac datatracID={attribs['data-datatrac-product']} productName={attribs['data-datatrac-productname']} compareType={attribs['data-datatrac-value']} />
                )
            }

            else if (isResponsiveTable) {
                return (
                    <div className="cx-table--responsive"><table {...attributesToProps(attribs)}>{domToReact(children, options)}</table></div>
                )
            }
            else {

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

export const parseShortcode = (html) => {
    const shortcodeRegEx = new RegExp(/\[(.*)\]/, 'ig');
    return html.replace(shortcodeRegEx, match => {
        client.useQuery().shortcode({
            shortcode: match.replace(']')
        })
    })
}
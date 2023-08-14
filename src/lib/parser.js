//import FAQ from "components/FAQs/faq";
import parse, { domToReact, attributesToProps } from "html-react-parser";
import { client } from 'client';
import Link from "next/link";
import FAQ from "components/FAQs/faq";
import Datatrac from "components/Blocks/Datatrac";
import Chat from "components/Chat/cisco";
import DatatracValue from "components/Datatrac/Value";
import DatatracFootnote from "components/Datatrac/Footnote";
import LinkLibraryCatLink from "components/LinkLibrary/NavItem";
import LinkLibrary from "components/LinkLibrary/LinkLibrary";
import Form from "components/Forms/Form";
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
            const isDatatrac = attribs && attribs.class && attribs.class.includes("datatrac-wrapper") && !attribs.class.includes('datatrac-wrapper__disclosure');
            const isCiscoBubbleChat = name === 'a' && attribs && attribs.class?.includes('cx-icon__chat_bubble');
            // const isLinkLibraryCatLink = name === 'a' && attribs && attribs.class?.includes('cx-link-lib-cats__link');
            const isLinkLibrary = attribs && attribs['data-link-library-cats'];
            const isForm = attribs?.class?.includes('nf-form-cont');

            if(isCiscoBubbleChat) {
                return (
                    <Chat className={attribs.class}>{domToReact(children, options)}</Chat>
                )
            }

            else if(isForm) {
                return <Form id={parseInt(attribs?.id.split('-')[2])} />
            }

            else if(isLinkLibrary) {
                const cats = JSON.parse(attribs?.['data-link-library-cats']);
                return (
                    <LinkLibrary cat_ids={cats} {...attributesToProps(attribs)}>{domToReact(children, options)}</LinkLibrary>
                )
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

            else if(attribs && attribs.class?.includes('datatrac-wrapper__disclosure')) {
                return ( 
                    <DatatracFootnote productName={attribs['data-datatrac-product']} />
                ) 
            }        

            else if(attribs && attribs['data-datatrac-product'] && attribs['data-datatrac-value'] && !attribs.class?.includes('datatrac-wrapper')) {
                return ( 
                    <DatatracValue productName={attribs['data-datatrac-product']} value={attribs['data-datatrac-value']} />
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
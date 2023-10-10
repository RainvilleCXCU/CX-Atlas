//import FAQ from "components/FAQs/faq";
import parse, { domToReact, attributesToProps } from "html-react-parser";
import { client } from 'client';
import Link from "next/link";
import FAQ from "components/FAQs/faq";
import Chat from "components/Chat/cisco";
import LinkLibraryCatLink from "components/LinkLibrary/NavItem";
import LinkLibrary from "components/LinkLibrary/LinkLibrary";
import Form from "components/Forms/Form";
// import { ciscoBubbleChat } from "./cisco-chat";

const findChildren = (element, att, value) => {
    let children = [];
    const isChild = (child, att, value) => {
        if(child?.attribs?.[att]) {
            children.push(child);
        } else {
            child.children && child.children.forEach(el => {
                isChild(el, att, value);
            });
        }
    }
    isChild(element, att, value);
    return children;
}

export const parseHtml = (html) => {
    const domainRegEx = new RegExp(/(http)/, 'i');
    const internalLinkRegEx = new RegExp(/(cxcu|(www\.connexus)|local)/, 'i');
    //html = parseShortcode(html);
    const options = {
        trim: false,
        replace: (element) => {
            const { name, attribs, children } = element;
            const isInternalLink = (name === "a" && (internalLinkRegEx.test(attribs.href) || domainRegEx.test(attribs.href) === false ) && !attribs.onClick);
            const isFAQItem = attribs && attribs.class && attribs.class.includes("ewd-ufaq-faq-div");
            const isResponsiveTable = (name === 'table' && attribs && attribs.class && attribs.class.includes("tablepress-responsive"))
            const isDatatrac = attribs && attribs.class && attribs.class.includes("datatrac-wrapper") && !attribs.class.includes('datatrac-wrapper__disclosure');
            const isDatatracContainer = attribs && attribs.class && attribs.class.includes("gb-block-container") && findChildren(element, 'data-datatrac-perform', '').length > 0;
            const isCiscoBubbleChat = name === 'a' && attribs && attribs.class?.includes('chat_bubble');
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

            else if (isResponsiveTable) {
                return (
                    <div className="cx-table--responsive"><table {...attributesToProps(attribs)}>{domToReact(children, options)}</table></div>
                )
            }
            else if (isDatatracContainer) {
                const children = findChildren(element, 'data-datatrac-perform', '');
                let showContainer = true;
                children.forEach(el => {
                    if(el.attribs && el.attribs['data-datatrac-perform'] === 'false') {
                        showContainer = false;
                    }
                })
                return ( showContainer ? element : <></>);
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
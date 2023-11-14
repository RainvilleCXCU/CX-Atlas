//import FAQ from "components/FAQs/faq";
import dynamic from "next/dynamic";
import parse, { domToReact, attributesToProps } from "html-react-parser";
import { client } from 'client';
import Link from "next/link";
import FAQ from "components/FAQs/faq";
import Chat from "components/Chat/cisco";
import LinkLibraryCatLink from "components/LinkLibrary/NavItem";
import LinkLibrary from "components/LinkLibrary/LinkLibrary";
import Form from "components/Forms/Form";
// import Calculator from "components/Calculator/Calculator";
import EqualHeightContainer from "components/Blocks/EqualHeight";
import Container from "components/Blocks/Container";
const Calculator = dynamic(() => import("components/Calculator/Calculator"), {ssr: false});

// const EqualHeightContainer = dynamic(() => import("components/Blocks/EqualHeight"), {ssr: true});
// const Container = dynamic(() => import("components/Blocks/Container"), {ssr: true});
// const Sidekick = dynamic(() => import("components/Blocks/Sidekick"), {ssr: false});
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
    
    const options = {
        trim: false,
        replace: (element) => {
            const { name, attribs, children } = element;
            const isInternalLink = (name === "a" && (internalLinkRegEx.test(attribs.href) || domainRegEx.test(attribs.href) === false ) && !attribs.onClick);
            const isFAQItem = attribs && attribs.class && attribs.class.includes("ewd-ufaq-faq-div");
            const isCalculator = attribs && attribs['data-calculator-name'];
            const isResponsiveTable = (name === 'table' && attribs && attribs.class && attribs.class.includes("tablepress-responsive"))
            const isDatatrac = attribs && attribs.class && attribs.class.includes("datatrac-wrapper") && !attribs.class.includes('datatrac-wrapper__disclosure');
            const isDatatracContainer = attribs && attribs.class && attribs.class.includes("gb-block-container") && findChildren(element, 'data-datatrac-perform', '').length > 0;
            const isCiscoBubbleChat = name === 'a' && attribs && attribs.class?.includes('chat_bubble');
            // const isLinkLibraryCatLink = name === 'a' && attribs && attribs.class?.includes('cx-link-lib-cats__link');
            const isLinkLibrary = attribs && attribs['data-link-library-cats'];
            const isEqualHeight = attribs && attribs['data-equal-height'];
            const isForm = attribs?.class?.includes('nf-form-cont');
            const isSidekick = attribs?.class && attribs?.class == 'cx-sidekick';
            const isBlockContainer = attribs && attribs.class && attribs.class.includes("gb-block-container");
            // const equalHeight = attribs?.id;

            if(isCiscoBubbleChat) {
                return (
                    <Chat className={attribs.class}>{domToReact(children, options)}</Chat>
                )
            } 
            // else if (isSidekick) {
            //     return (
            //         <Sidekick className={attribs.class} {...attributesToProps(attribs)}>{domToReact(children, options)}</Sidekick>
            //     )
            // }
            else if (isBlockContainer) {
                return (
                    <Container classNames={attribs.class} {...attributesToProps(attribs)}>{domToReact(children, options)}</Container>
                )
            }
            else if (isEqualHeight) {
                return (
                    <EqualHeightContainer tagName={name} name={attribs['data-equal-height']} classNames={attribs.class} {...attributesToProps(attribs)}>{domToReact(children, options)}</EqualHeightContainer>
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

            else if (isCalculator) {
                return (
                    <Calculator calculatorName={attribs['data-calculator-name']}></Calculator>
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
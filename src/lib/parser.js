import dynamic from "next/dynamic";
import parse, { domToReact, attributesToProps } from "html-react-parser";
import Link from "next/link";
import FAQ from "components/FAQs/faq";
import Chat from "components/Chat/cisco";
import LinkLibraryCatLink from "components/LinkLibrary/NavItem";
import LinkLibrary from "components/LinkLibrary/LinkLibrary";
import Form from "components/Forms/Form";
// import Calculator from "components/Calculator/Calculator";
const Calculator = dynamic(() => import("components/Calculator/Calculator"), {ssr: false});
import EqualHeightContainer from "components/Blocks/EqualHeight";
import Container from "components/Blocks/Container";
import Disclosure from "components/Disclosure/Disclosure";
import CXCalc from "components/Calculator/CXCalculator";
import CXCalcResults from "components/Calculator/CXCalculatorResults";
import Scheduler from "components/Salesforce/scheduler";

// const EqualHeightContainer = dynamic(() => import("components/Blocks/EqualHeight"), {ssr: true});
// const Container = dynamic(() => import("components/Blocks/Container"), {ssr: true});
// const Sidekick = dynamic(() => import("components/Blocks/Sidekick"), {ssr: false});
// import { ciscoBubbleChat } from "./cisco-chat";

const findChildren = (element, att, value) => {
    let children = [];
    const isChild = (child, att, value) => {
        if(child?.attribs?.[att] !== undefined) {
            children.push(child);
        } 
        child.children && child.children.forEach(el => {
            isChild(el, att, value);
        });
    }
    isChild(element, att, value);
    return children;
}

export const parseHtml = (html) => {
    const domainRegEx = new RegExp(/(http)/, 'i');
    const internalLinkRegEx = new RegExp(/(cxcu|(www\.connexus)|local|wpengine)/, 'i');
    
    const options = {
        trim: false,
        htmlparser2: {
            lowerCaseTags: false
        },
        replace: (element) => {
            const { name, attribs, children } = element;
            
            const isDatatracContainer = attribs && attribs.class && attribs.class.includes("gb-block-container") && /(data-datatrac-perform)/gi.test(html);

            const isInternalLink = (name === "a" && (internalLinkRegEx.test(attribs.href) || domainRegEx.test(attribs.href) === false ) && !/(mailto:|tel:)/.test(attribs.href) && !attribs.onClick && !attribs.onclick);
            const isFAQItem = attribs && attribs.class && attribs.class.includes("ewd-ufaq-faq-div");
            const isCalculator = attribs && attribs['data-calculator-name'];
            const isResponsiveTable = (name === 'table' && attribs && attribs.class && attribs.class.includes("tablepress-responsive"))
            const isCiscoBubbleChat = name === 'a' && attribs && attribs.class?.includes('chat_bubble');
            const isLinkLibrary = attribs && attribs['data-link-library-cats'];
            const isEqualHeight = attribs && attribs['data-equal-height'];
            const isForm = attribs?.class?.includes('nf-form-cont');
            const isBlockContainer = attribs && attribs.class && attribs.class.includes("gb-block-container");
            const isDisclosure = attribs?.id?.includes('disclosures');
            const isCXCalc = attribs?.class?.includes('cx-calculator');
            const isCXCalcResults = attribs?.class?.includes('cx-calculator-results');
            const isScheduler = attribs?.class?.includes('cx-scheduler');

            // if(attribs?.onclick) {
            //     attribs.onClick = attribs?.onclick;
            //     delete attribs.onclick;

            //     console.log(attribs)
            // }

            // const isSidekick = attribs?.class && attribs?.class == 'cx-sidekick';
            // const equalHeight = attribs?.id;

            
            // else if (isSidekick) {
            //     return (
            //         <Sidekick className={attribs.class} {...attributesToProps(attribs)}>{domToReact(children, options)}</Sidekick>
            //     )
            // }


            if (isInternalLink && !isCiscoBubbleChat) {
                const href = attribs.href;
                delete attribs.href;
                return (
                    <Link href={href.replace(/^(?:\/\/|[^\/]+)*\//gi, '/')} {...attributesToProps(attribs)}>{domToReact(children, options)}</Link>
                );
            }

            else if (isBlockContainer) {
                return (
                    <Container classNames={attribs.class} {...attributesToProps(attribs)}>{domToReact(children, options)}</Container>
                )
            }

            else if(isCXCalcResults) {
                return (
                    <div {...attributesToProps(attribs)}><CXCalcResults>{children}</CXCalcResults></div>
                )
            } 

            else if(isCXCalc) {
                return (
                    <div {...attributesToProps(attribs)}><CXCalc>{children}</CXCalc></div>
                )
            } 

            else if (isResponsiveTable) {
                return (
                    <div className="cx-table--responsive"><table {...attributesToProps(attribs)}>{domToReact(children, options)}</table></div>
                )
            }

            else if (isEqualHeight) {
                return (
                    <EqualHeightContainer tagName={name} name={attribs['data-equal-height']} classNames={attribs.class} {...attributesToProps(attribs)}>{domToReact(children, options)}</EqualHeightContainer>
                )
            }

            else if(isFAQItem) {
                const title  = domToReact(findChildren(element, 'data-faq-title', '')[0].children, options); 
                const content = domToReact(findChildren(element, 'data-faq-content', '')[0].children, options);
                return (
                    <FAQ id={attribs['data-post_id']} title={title} content={content} />
                )
            }

            else if(isCiscoBubbleChat) {
                return (
                    <Chat className={attribs.class}>{domToReact(children, options)}</Chat>
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

            else if(isLinkLibrary) {
                const cats = JSON.parse(attribs?.['data-link-library-cats']);
                return (
                    <LinkLibrary cat_ids={cats} {...attributesToProps(attribs)}>{domToReact(children, options)}</LinkLibrary>
                )
            }

            else if(isForm) {
                return <Form id={parseInt(attribs?.id.split('-')[2])} />
            }

            else if(isDisclosure) {
                return <Disclosure {...attributesToProps(attribs)}>{domToReact(children, options)}</Disclosure>
            }

            else if(isScheduler) {
                return (
                    <span {...attributesToProps(attribs)}>
                    <Scheduler
                        postSlug = {attribs['data-postslug']}
                        flowId = {attribs['data-flowid']}
                        appUrl = {attribs['data-appurl']}
                        viewMoreButton = {attribs['data-viewmorebutton']}
                        selectSubjectText = {attribs['data-selectsubjecttext']}
                        selectResourceText = {attribs['data-selectresourcetext']}
                        anyResourceText = {attribs['data-anyresourcetext']}
                        reviewHeading = {attribs['data-reviewheading']}
                        resourceHeading = {attribs['data-resourceheading']}
                        resourcePageHeading = {attribs['data-resourcepageheading']}
                        scheduledTimeHeading = {attribs['data-scheduledtimeheading']}
                        finishText = {attribs['data-finishtext']}
                        finishImage = {attribs['data-finishimage']}
                        profileImage = {attribs['data-profileimage']}
                    >{children}</Scheduler></span>
                )
            } 

            else {
            }
        },
    }
    return parse(html, options);
};

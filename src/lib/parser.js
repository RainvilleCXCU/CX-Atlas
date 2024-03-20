import dynamic from "next/dynamic";
import parse, { domToReact, attributesToProps } from "html-react-parser";
import Link from "next/link";
import FAQ from "components/FAQs/faq";
import Chat from "components/Chat/cisco";
import LinkLibrary from "components/LinkLibrary/LinkLibrary";
import Form from "components/Forms/Form";
const Calculator = dynamic(() => import("components/Calculator/Calculator"), {ssr: false});
import EqualHeightContainer from "components/Blocks/EqualHeight";
import Container from "components/Blocks/Container";
import Disclosure from "components/Disclosure/Disclosure";
import CXCalc from "components/Calculator/CXCalculator";
import CXCalcResults from "components/Calculator/CXCalculatorResults";
import Scheduler from "components/Salesforce/scheduler";

const internalLinkRegEx = new RegExp(/(cxcu|(www\.connexus)|local|wpengine)/, 'i');

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
    const options = {
        trim: false,
        htmlparser2: {
            lowerCaseTags: false,
        },
        replace: (element) => {
            const { name, attribs, children } = element;
            // Skip none block elements
            if(name !== 'a' && name !== 'div' && name !== 'span' && name !== 'button') {
                return;
            }

            // Cisco Chat Button
            else if(name === 'a' && attribs && attribs.class?.includes('chat_bubble')) {
                return (
                    <Chat className={attribs.class}>{domToReact(children, options)}</Chat>
                )
            } 
            // Internal Link
            else if (name === "a" && (internalLinkRegEx.test(attribs.href) || attribs.href.includes('http') === false ) && !attribs.onClick && !attribs.onclick) {                
                return (
                    <Link {...attributesToProps(attribs)}>{domToReact(children, options)}</Link>
                );
            }

            // CX Calculator Results
            else if(attribs?.class?.includes('cx-calculator-results')) {
                return (
                    <div {...attributesToProps(attribs)}><CXCalcResults>{children}</CXCalcResults></div>
                )
            } 

            // CX Calculator
            else if(attribs?.class?.includes('cx-calculator')) {
                return (
                    <div {...attributesToProps(attribs)}><CXCalc>{children}</CXCalc></div>
                )
            } 

            // Responsive Table
            else if (name === 'table' && attribs && attribs.class && attribs.class.includes("tablepress-responsive")) {
                return (
                    <div className="cx-table--responsive"><table {...attributesToProps(attribs)}>{domToReact(children, options)}</table></div>
                )
            }

            // Block Container 
            else if (attribs && attribs.class && attribs.class.includes("gb-block-container")) {
                return (
                    <Container classNames={attribs.class} {...attributesToProps(attribs)}>{domToReact(children, options)}</Container>
                )
            }

            // Equal Height
            else if (attribs && attribs['data-equal-height']) {
                return (
                    <EqualHeightContainer tagName={name} name={attribs['data-equal-height']} classNames={attribs.class} {...attributesToProps(attribs)}>{domToReact(children, options)}</EqualHeightContainer>
                )
            }

            // FAQ 
            else if(attribs && attribs.class && attribs.class.includes("ewd-ufaq-faq-div")) {
                const title  = domToReact(findChildren(element, 'data-faq-title', '')[0].children, options); 
                const content = domToReact(findChildren(element, 'data-faq-content', '')[0].children, options);
                return (
                    <FAQ id={attribs['data-post_id']} title={title} content={content} />
                )
            }
            // DinkyTown Calc
            else if (attribs && attribs['data-calculator-name']) {
                return (
                    <Calculator calculatorName={attribs['data-calculator-name']}></Calculator>
                )
            }

            // Datatrac
            else if (attribs && attribs.class && attribs.class.includes("gb-block-container") && /(data-datatrac-perform)/gi.test(html)) {
                const children = findChildren(element, 'data-datatrac-perform', '');
                let showContainer = true;
                children.forEach(el => {
                    if(el.attribs && el.attribs['data-datatrac-perform'] === 'false') {
                        showContainer = false;
                    }
                })
                return ( showContainer ? element : <></>);
            }

            // Link Library
            else if(attribs && attribs['data-link-library-cats']) {
                const cats = JSON.parse(attribs?.['data-link-library-cats']);
                return (
                    <LinkLibrary cat_ids={cats} {...attributesToProps(attribs)}>{domToReact(children, options)}</LinkLibrary>
                )
            }

            // Form
            else if(attribs?.class?.includes('nf-form-cont')) {
                return <Form id={parseInt(attribs?.id.split('-')[2])} />
            }

            // Disclosures
            else if(attribs?.id?.includes('disclosures')) {
                return <Disclosure {...attributesToProps(attribs)}>{domToReact(children, options)}</Disclosure>
            }

            // Salesforce Scheduler
            else if(attribs?.class?.includes('cx-scheduler')) {
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
                return;
            }
        },
    }
    return parse(html, options);
};

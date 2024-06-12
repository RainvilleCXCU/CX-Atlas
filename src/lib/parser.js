import dynamic from "next/dynamic";
import parse, { domToReact, attributesToProps } from "html-react-parser";
import Link from "next/link";
import { css } from '@emotion/css';
import Image from 'next/image';

import EqualHeightContainer  from "components/Blocks/EqualHeight";
import Container from "components/Blocks/Container";
import Vimeo from "components/Video/vimeo";
import Step from "components/Steps/Step";

const ExternalLink = dynamic(() => import("components/ExternalLinks/links"));
const ToggleContent = dynamic(() => import("components/ContentToggle/Content"), {ssr: false});
const ToggleContentLink = dynamic(() => import("components/ContentToggle/ContentToggleLink"), {ssr: false});
const ToggleContentSelect = dynamic(() => import("components/ContentToggle/ContentToggleSelect"), {ssr: false});
const FAQ = dynamic(() => import("components/FAQs/faq"));
const Form = dynamic(() => import("components/Forms/Form"));
const DataTracComparison = dynamic(() => import("components/Datatrac/Comparison"));
const Disclosure = dynamic(() => import("components/Disclosure/Disclosure"), {ssr: false});
const LinkLibrary = dynamic(() => import ("components/LinkLibrary/LinkLibrary"), {ssr: false});
const Chat = dynamic(() => import ("components/Chat/cisco"), {ssr: false});
const Calculator = dynamic(() => import("components/Calculator/Calculator"), {ssr: false});
const CXCalc = dynamic(() => import("components/Calculator/CXCalculator"), {ssr: false});
const CXCalcResults = dynamic(() => import("components/Calculator/CXCalculatorResults"), {ssr: false});
const Scheduler = dynamic(() => import("components/Salesforce/scheduler"), {ssr: false});
const Tooltip = dynamic(() => import("components/Tooltip/Tooltip"), {ssr: false});

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
const whitelistRegex = new RegExp(`(.local)|(wpenginepowered.)|(wpengine.com)|(connexuscu.org)|(mortgagewebcenter)|(meridianlink)|(loanspq)|(myworkdayjobs)|(issuu)|(az1.qualtrics)|(docusign)|(billerpayments)|(#)|(tel:)|(mailto:)|(javascript:)`, "i");

export const parseHtml = (html) => {
        const options = {
        trim: false,
        htmlparser2: {
            lowerCaseTags: false,
        },
        // library: require('preact'),
        replace: (element) => {

            // return;
            let { name, attribs, children } = element;
            if(attribs?.style) {
                attribs = {
                    ...attribs,
                    css: css`${attribs.style}`
                }
            }
            // Skip none block elements
            if(name !== 'a' && name !== 'div' && name !== 'span' && name !== 'button' && name !== 'p' && name !== 'h3' && name !== 'table' && name !== 'img' && name !== 'select') {
                return;
            }

            // Cisco Chat Button
            else if(name === 'a' && attribs?.class?.includes('chat_bubble')) {
                return (
                    <Chat className={attribs.class}>{domToReact(children, options)}</Chat>
                )
            }
            else if(name === 'a' && whitelistRegex.test(attribs?.href) === false && attribs?.href[0] !== '/') {
                return (
                    <ExternalLink href={attribs?.href} classNames={attribs?.class}>{domToReact(children, options)}</ExternalLink>
                )
            }
            // Content Toggle Link
            else if(name === 'a' && attribs?.class?.includes('cx-toggle-content__toggler')) {
                return (
                    <ToggleContentLink attribs={attribs}>{domToReact(children, options)}</ToggleContentLink>
                )
            }
            // Internal Link
            else if (name === "a") {                
                return (
                    <Link {...attributesToProps(attribs)}>{domToReact(children, options)}</Link>
                );
            }
            else if (name === 'img') {
                <Image priority={true} {...attributesToProps(attribs)} />
            }

            // Responsive Table
            else if (name === 'table' && attribs?.class?.includes("tablepress-responsive")) {
                return (
                    <div className="cx-table--responsive"><table {...attributesToProps(attribs)}>{domToReact(children, options)}</table></div>
                )
            }

            // Block Container 
            else if (attribs?.class?.includes("gb-block-container")) {
                // console.log('Styles');
                // console.log(attribs)
                return (
                    <Container classNames={attribs.class} {...attributesToProps(attribs)}>{domToReact(children, options)}</Container>
                )
            }

            // Equal Height
            else if (attribs?.['data-equal-height']) {
                return (
                    <EqualHeightContainer tagName={name} name={attribs['data-equal-height']} classNames={attribs.class} {...attributesToProps(attribs)}>{domToReact(children, options)}</EqualHeightContainer>
                )
            }

            // FAQ 
            else if(attribs?.class?.includes("ewd-ufaq-faq-div")) {
                const title  = domToReact(findChildren(element, 'data-faq-title', '')[0].children, options); 
                const content = domToReact(findChildren(element, 'data-faq-content', '')[0].children, options);
                return (
                    <FAQ id={attribs['data-post_id']} title={title} content={content} />
                )
            }
            // Step
            else if (attribs?.['data-acf-block'] && attribs?.['data-acf-block'] === 'step') {
                return (
                    <Step step={attribs?.['data-step-number']} lastStep={attribs?.['data-last-step']} route={attribs?.['data-svg-route']}>{domToReact(children, options)}</Step>
                )
            }
            // DinkyTown Calc
            else if (attribs?.['data-calculator-name']) {
                return (
                    <Calculator calculatorName={attribs['data-calculator-name']}></Calculator>
                )
            }
            // Content Toggle Link
            else if(attribs?.class?.includes('cx-toggle-content__select')) {
                return (
                    <ToggleContentSelect attribs={attribs}>{domToReact(children, options)}</ToggleContentSelect>
                )
            }

            // Toggle Content
            else if (attribs?.['data-toggle-content']) {
                return (
                    <ToggleContent attribs={attribs}>{domToReact(children, options)}</ToggleContent>
                )
            }
            else if (attribs?.['data-vimeo-id']) {
                return (
                    <Vimeo id={attribs?.['data-vimeo-id']} />
                )
            }

            // Disclosures
            else if(attribs?.['data-name']?.includes('disclosures') || attribs?.class?.includes("disclosure_trigger")) {
                return (
                    <div {...attributesToProps(attribs)}><Disclosure>{domToReact(children, options)}</Disclosure></div>
                )
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

            // Datatrac
            else if (attribs?.['data-datatrac-perform']) {
                return ( 
                    <DataTracComparison performs={attribs?.['data-datatrac-perform']}>{domToReact(children, options)}</DataTracComparison>
                );
            }

            // Link Library
            else if(attribs?.['data-link-library-cats']) {
                return (
                    <LinkLibrary cat_ids={JSON.parse(attribs?.['data-link-library-cats'])} {...attributesToProps(attribs)}>{domToReact(children, options)}</LinkLibrary>
                )
            }

            // Form
            else if(attribs?.class?.includes('nf-form-cont')) {
                return ( 
                    <Form id={attribs?.id.split('-')[2]} /> 
                );
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
                        salesforceDomain = {attribs['data-sf-domain']}
                    >{children}</Scheduler></span>
                )
            } 

            // Tooltip
            else if(attribs?.class?.includes('tooltip')) {
                return (
                    <Tooltip attribs={attributesToProps(attribs)}>{domToReact(children, options)}</Tooltip>
                )
            } 

            else {
                return;
            }
        },
    }
    return parse(html, options);
};

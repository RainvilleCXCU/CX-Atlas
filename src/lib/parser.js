import dynamic from "next/dynamic";
import parse, { domToReact, attributesToProps } from "html-react-parser";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { css } from '@emotion/css';
import Image from 'next/image';
import { useCookies } from "react-cookie";

import EqualHeightContainer  from "components/Blocks/EqualHeight";
import Container from "components/Blocks/Container";
import { getQueryVariable } from "./routing";
import Conditional from "components/Blocks/Conditional";
import BusinessDetails from "components/Business/BusinessDetails";
import Accordion from "components/Accordion/Accordion";
import { trackMember } from "utils/tracking";

const Vimeo = dynamic(() => import("components/Video/vimeo"));
const Step = dynamic(() => import("components/Steps/Step"));
// const ExternalLink = dynamic(() => import("components/ExternalLinks/links"));
import ExternalLink from "components/ExternalLinks/links";
import MarketingCloudForm from "components/Salesforce/cloudpage";
import SwiperContainer from "components/Blocks/MobileScroll";
import ProductFinder from "components/ProductFinder/finder";
import AppLinks from "components/Device/AppLinks";
import Address from "components/Map/address";
// import ToggleContent from "components/ContentToggle/Content";
// import ToggleContentLink from "components/ContentToggle/ContentToggleLink";
// import ToggleContentSelect from "components/ContentToggle/ContentToggleSelect";
const ToggleContent = dynamic(() => import("components/ContentToggle/Content"), {ssr: true});
const ToggleContentLink = dynamic(() => import("components/ContentToggle/ContentToggleLink"), {ssr: true});
const ToggleContentSelect = dynamic(() => import("components/ContentToggle/ContentToggleSelect"), {ssr: true});
const FAQ = dynamic(() => import("components/FAQs/faq"));
const Form = dynamic(() => import("components/Forms/Form"));
const DataTracComparison = dynamic(() => import("components/Datatrac/Comparison"));
const Disclosure = dynamic(() => import("components/Disclosure/Disclosure"), {ssr: false});
const LinkLibrary = dynamic(() => import ("components/LinkLibrary/LinkLibrary"), {ssr: false});
const Chat = dynamic(() => import ("components/Chat/cisco"), {ssr: false});
const Calculator = dynamic(() => import("components/Calculator/Calculator"), {ssr: false});
const CXCalc = dynamic(() => import("components/Calculator/CXCalculator"), {ssr: false});
const CXCalcResults = dynamic(() => import("components/Calculator/CXCalculatorResults"), {ssr: false});
const DynamicRateTableInput = dynamic(() => import("components/Calculator/DynamicRateTableInput"), {ssr: false});
const DynamicRateTable = dynamic(() => import("components/Calculator/DynamicRateTable"), {ssr: false});
const Scheduler = dynamic(() => import("components/Salesforce/scheduler"), {ssr: false});
const Tooltip = dynamic(() => import("components/Tooltip/Tooltip"), {ssr: false});

const findChildren = (element, att, value) => {
    let children = [];
    const isChild = (child, att, value) => {
        if(child?.attribs?.[att] !== undefined && value === '' || child?.attribs?.[att] !== undefined && child?.attribs?.[att].includes(value)) {
            children.push(child);
        } 
        child.children && child.children.forEach(el => {
            isChild(el, att, value);
        });
    }
    isChild(element, att, value);
    return children;
}
const whitelistRegex = new RegExp(`(.local)|(wpenginepowered.)|(wpengine.com)|(connexuscu.org)|(mortgagewebcenter)|(meridianlink)|(loanspq)|(myworkdayjobs)|(issuu)|(az1.qualtrics)|(docusign)|(billerpayments)|(tel:)|(mailto:)|(javascript:)`, "i");

export const parseHtml = (html) => {
        const options = {
        trim: false,
        htmlparser2: {
            lowerCaseTags: false,
        },
        // library: require('preact'),
        replace: (element) => {
            const [cookies, setCookie ] = useCookies(['referralsource']);
            
            
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
            // ML Referral Source
            else if(name === 'a' && cookies?.referralsource && cookies?.referralsource !== '' && (attribs?.href?.includes('loanspq') || attribs?.href?.includes('meridianlink'))) {
                const currDestReferral = getQueryVariable('referralsource', attribs?.href);
                let href = attribs.href;
                if (currDestReferral) {
                    href = attribs?.href.replace(currDestReferral, cookies?.referralsource);
                }
                return (
                    <a href={href} className={attribs?.class} target={attribs?.targets}>{domToReact(children, options)}</a>
                )
            }
            // Cisco Chat Button
            else if(name === 'a' && attribs?.class?.includes('chat_bubble')) {
                return (
                    <Chat className={attribs.class}>{domToReact(children, options)}</Chat>
                )
            }
            else if(name === 'a' && whitelistRegex.test(attribs?.href) === false && attribs?.href[0] !== '/' && attribs?.href[0] !== '#') {
                return (
                    <ExternalLink ariaLabel={attribs?.['aria-label']} href={attribs?.href} classNames={attribs?.class}>{domToReact(children, options)}</ExternalLink>
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
                const pathname = usePathname();
                if((attribs?.href.includes('#') && attribs?.href.split('#')[0] == pathname) || attribs?.href.startsWith('#')) {
                    let href = `#${attribs?.href.split('#')[1]}`;
                    delete attribs?.href;
                    return (
                        <a href={href} {...attribs} onClick={ attribs?.class?.includes('track-member') && trackMember}>{domToReact(children, options)}</a>
                    );
                }  
                return (
                    <Link {...attributesToProps(attribs)} onClick={ attribs?.class?.includes('track-member') && trackMember} scroll={false}>{domToReact(children, options)}</Link>
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
                    <Container classNames={attribs.class} {...attributesToProps(attribs)}>
                        {domToReact(children, options)}
                    </Container>
                )
            }

            // Block Container 
            else if (attribs?.["data-acf-block"] && attribs?.["data-acf-block"] === 'cx-mobile-swiper') {
                // console.log('Styles');
                // console.log(attribs)
                return (
                    <SwiperContainer classNames={attribs.class} columns={findChildren(element, 'class', 'wp-block-column ').length} {...attributesToProps(attribs)}>
                        {domToReact(children, options)}
                    </SwiperContainer>
                )
            }

            // Equal Height
            else if (attribs?.['data-equal-height']) {
                return (
                    <EqualHeightContainer tagName={name} name={attribs['data-equal-height']} classNames={attribs.class} {...attributesToProps(attribs)}>{domToReact(children, options)}</EqualHeightContainer>
                )
            }
            else if (attribs?.class?.includes("cx-equal-height__")) {
                const classes = attribs?.class.split(' ');
                const heightClass = classes.filter(el => el.includes("cx-equal-height__"))[0];
                const equalName = heightClass.replace("cx-equal-height__", "");
                console.log(`Equal Height: ${equalName}`);
                return (
                    <EqualHeightContainer tagName={name} name={equalName} classNames={attribs.class} {...attributesToProps(attribs)}>{domToReact(children, options)}</EqualHeightContainer>
                )
            }

            // FAQ 
            else if(attribs?.class?.includes("ewd-ufaq-faq-div")) {
                const title  = domToReact(findChildren(element, 'data-faq-title', '')[0].children, options); 
                const content = domToReact(findChildren(element, 'data-faq-content', '')[0].children, options);
                return (
                    <FAQ id={`FAQ-${attribs?.['data-post_id']}`} title={title} content={content} />
                )
            }
            // Step
            else if (attribs?.['data-acf-block'] && attribs?.['data-acf-block'] === 'step') {
                return (
                    <Step step={attribs?.['data-step-number']} lastStep={attribs?.['data-last-step']} route={attribs?.['data-svg-route']} heading={attribs?.['data-heading']} encodedContent={attribs?.['data-encoded-copy']}></Step>
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
            // Product Finder
            else if(attribs?.['data-acf-block'] && attribs?.['data-acf-block'] === 'product-finder') {
                return (
                    <ProductFinder productData={attribs?.['data-product-data']} submitText={attribs?.['data-submit-text']} selectText={attribs?.['data-select-text']} attribs={attribs}>{domToReact(children, options)}</ProductFinder>
                )
            }
            // Content Toggle Link
            else if(attribs?.['data-genesis-block']) {
                if(attribs?.['data-genesis-block'] == 'accordion') {
                    return (
                        <Accordion
                            stayOpen={attribs?.['data-stay-open']}
                            startOpen={attribs?.['data-start-open']}
                            title={attribs?.['data-encodedheading'] ? parseHtml(Buffer.from(attribs?.['data-encodedheading'], 'base64').toString()): ''}
                            classNames={attribs?.class}
                            content={attribs?.['data-encodedcontent'] ? parseHtml(Buffer.from(attribs?.['data-encodedcontent'], 'base64').toString()): ''}
                        />
                    )
                }
            }

            else if(attribs?.['data-acf-block']) {
                if(attribs?.['data-acf-block'] == 'conditional') {
                    return (
                        <Conditional
                            condition={attribs?.['data-condition']}
                            comparison={attribs?.['data-comparison']}
                            comparisonKey={attribs?.['data-comparison-key']}
                            comparisonValue={attribs?.['data-comparison-value']}
                            isDefault={attribs?.['data-is-default']}
                        >{domToReact(children, options)}</Conditional>
                    )
                }
                if(attribs?.['data-acf-block'] == 'business-details') {
                    return (
                        <BusinessDetails
                            name={attribs?.['data-business-name']}
                        />
                    )
                }
                if(attribs?.['data-acf-block'] == 'app-links') {
                    const props = {
                        ...(attribs?.['data-apps-opening-text'] !== '' && {appOpeningText: attribs?.['data-apps-opening-text']}),
                    }
                    return (
                        <AppLinks {...props} />
                    )
                }
                if(attribs?.['data-acf-block'] == 'map') {
                    return (
                        <Address locationData={attribs?.['data-location-data']} getDirectionsText={attribs?.['data-directions-button-text']} showDirectionsButton={JSON.parse(attribs?.['data-show-button'])} />
                    )
                }
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
            
            // Dynamic Rate table calculator input
            else if(attribs?.class?.includes('dynamic-rate-table-input')) {
                return (
                    <div {...attributesToProps(attribs)}><DynamicRateTableInput>{children}</DynamicRateTableInput></div>
                )
            } 

            // Dynamic Rate table calculator table
            else if(attribs?.class?.includes('dynamic-rate-table-output')) {
                return (
                    <div {...attributesToProps(attribs)}><DynamicRateTable>{children}</DynamicRateTable></div>
                )
            } 

            // Datatrac
            else if (attribs?.['datatrac-wrapper']) {
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
            else if(attribs?.class?.includes('cx-saleforce-cp')) {
                return (
                    <MarketingCloudForm formUrl={attribs['data-page-url']} {...attributesToProps(attribs)} />
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

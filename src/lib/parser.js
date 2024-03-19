import dynamic from "next/dynamic";
import parse, { domToReact, attributesToProps } from "html-react-parser";
import Link from "next/link";
import FAQ from "components/FAQs/faq";
import Chat from "components/Chat/cisco";
// import LinkLibraryCatLink from "components/LinkLibrary/NavItem";
import LinkLibrary from "components/LinkLibrary/LinkLibrary";
import Form from "components/Forms/Form";
// import Calculator from "components/Calculator/Calculator";
const Calculator = dynamic(() => import("components/Calculator/Calculator"), {ssr: false});
// import EqualHeightContainer from "components/Blocks/EqualHeight";
// import Container from "components/Blocks/Container";
import Disclosure from "components/Disclosure/Disclosure";
import CXCalc from "components/Calculator/CXCalculator";
import CXCalcResults from "components/Calculator/CXCalculatorResults";
import Scheduler from "components/Salesforce/scheduler";

// const EqualHeightContainer = dynamic(() => import("components/Blocks/EqualHeight"), {ssr: true});
// const Container = dynamic(() => import("components/Blocks/Container"), {ssr: true});
// const Sidekick = dynamic(() => import("components/Blocks/Sidekick"), {ssr: false});
// import { ciscoBubbleChat } from "./cisco-chat";

const isBlock = ({checkName, element}) => {
    const { name, attribs, children } = element;
    const domainRegEx = new RegExp(/(http)/, 'i');
    const internalLinkRegEx = new RegExp(/(cxcu|(www\.connexus)|local|wpengine)/, 'i');
    switch(checkName) {
        case 'isInternalLink':
            return (name === "a" && (internalLinkRegEx.test(attribs.href) || domainRegEx.test(attribs.href) === false ) && !attribs.onClick && !attribs.onclick);
        case 'isDisclosure' : 
            return attribs?.id?.includes('disclosures');
        case 'isFAQItem' : 
			return attribs && attribs.class && attribs.class.includes("ewd-ufaq-faq-div");
        case 'isDatatracContainer': 
            return false;
            // return attribs && attribs.class && attribs.class.includes("gb-block-container") && /(data-datatrac-perform)/gi.test(html);
        case 'isResponsiveTable' : 
			return (name === 'table' && attribs && attribs.class && attribs.class.includes("tablepress-responsive"))
        case 'isEqualHeight' : 
            return attribs && attribs['data-equal-height'];
        case 'isCalculator' : 
            return attribs && attribs['data-calculator-name'];
        case 'isCiscoBubbleChat' : 
            return name === 'a' && attribs && attribs.class?.includes('chat_bubble');
        case 'isLinkLibrary' : 
            return attribs && attribs['data-link-library-cats'];
        case 'isBlockContainer' : 
			return attribs && attribs.class && attribs.class.includes("gb-block-container");
        case 'isCXCalc' : 
			return attribs?.class?.includes('cx-calculator');
        case 'isCXCalcResults' : 
			return attribs?.class?.includes('cx-calculator-results');
        case 'isScheduler' : 
			return attribs?.class?.includes('cx-scheduler');
        case 'isForm' : 
            return attribs?.class?.includes('nf-form-cont');
        default:
            return false;
    }
    // const isInternalLink = (name === "a" && (internalLinkRegEx.test(attribs.href) || domainRegEx.test(attribs.href) === false ) && !/(mailto:|tel:)/.test(attribs.href) && !attribs.onClick && !attribs.onclick);
    // const isFAQItem = attribs && attribs.class && attribs.class.includes("ewd-ufaq-faq-div");
    // const isCalculator = attribs && attribs['data-calculator-name'];
    // const isResponsiveTable = (name === 'table' && attribs && attribs.class && attribs.class.includes("tablepress-responsive"))
    // const isCiscoBubbleChat = name === 'a' && attribs && attribs.class?.includes('chat_bubble');
    // const isLinkLibrary = attribs && attribs['data-link-library-cats'];
    // const isEqualHeight = attribs && attribs['data-equal-height'];
    // const isForm = attribs?.class?.includes('nf-form-cont');
    // // const isBlockContainer = attribs && attribs.class && attribs.class.includes("gb-block-container");
    // const isDisclosure = attribs?.id?.includes('disclosures');
    // const isCXCalc = attribs?.class?.includes('cx-calculator');
    // const isCXCalcResults = attribs?.class?.includes('cx-calculator-results');
    // const isScheduler = attribs?.class?.includes('cx-scheduler');
}

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
            
           
        },
    }
    return parse(html, options);
};

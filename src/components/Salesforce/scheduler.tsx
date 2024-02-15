import { client } from "client";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

interface CXCalcProps {
    children?;
    postSlug?;
    flowId?;
    appUrl?;
    viewMoreButton?;
    selectSubjectText?;
    selectResourceText?;
    anyResourceText?;
    reviewHeading? : string;
    resourceHeading?;
    resourcePageHeading? : string;
    scheduledTimeHeading?;
    finishText?;
    finishImage?;
    profileImage?;
}

const Scheduler = ({ 
    children = <></>,
    postSlug = '',
    flowId = '',
    appUrl = '',
    viewMoreButton = '',
    selectSubjectText = '',
    selectResourceText = '',
    anyResourceText = '',
    reviewHeading = '',
    resourceHeading = '',
    resourcePageHeading = '',
    scheduledTimeHeading = '',
    finishText = '',
    finishImage = '',
    profileImage = '',
}: CXCalcProps): JSX.Element => {
    const {query} = useRouter();
    
    const initialized = useRef(false);
    const [flowLoaded, setFlowLoaded] = useState([]);
    let showAll = query.productType === undefined && query.productFilters === undefined;
    const viewAll = () => {
        const viewAllBtn = document.getElementById('show_more_types');
        for (const elem of document.querySelectorAll('.runtime_appointmentbookingFlowWorkType .slds-form-element__control .slds-m-top_small')) {
            elem.style.display = 'block';
        }
        if(viewAllBtn) {
            document.getElementById('show_more_types').style.display = 'none';
        }
        const state = { page_id: 1, user_id: 5 };
        const url = `/${postSlug}/`+window.location.search;

        history.pushState(state, "", url);
        showAll = true;
    }
    useEffect(() => {
        let firstCall = query.productType !== undefined || query.productFilters !== undefined;
        console.log('firstCall');
        console.log(firstCall);
        const lightningNode = document.getElementById('lightningLocator');
        const config = { attributes: false, childList: true, subtree: true };
        let locationName;
        let reviewChanged = false;

        let productFilters = query.productFilters ? query.productFilters.toString().split(',') : null;

        console.log('Filters');
        console.log(productFilters)
        const updateReviewPage = () => {
            const reviewPage = lightningNode.querySelector('.runtime_appointmentbookingFlowReview');
            const subject = reviewPage.querySelector('[name="subject" i]');
            if (subject) {
                subject.closest('.slds-col').style.display = 'none';
            }
            for (const elem of lightningNode.querySelectorAll('.runtime_appointmentbookingFlowReview .slds-form .slds-col')) {
                let hide = false;
                const label = elem.querySelector('.slds-form-element__label');
                if (label) {
                    const labelHtml = label.innerHTML.toLowerCase();
                    if (labelHtml.includes('address')
                        || labelHtml.includes('description')
                        || labelHtml.includes('comment')
                        || labelHtml.includes('category')
                        || labelHtml.includes('company')) {
                        elem.style.display = 'none';
                    }

                    if (labelHtml.includes('required service resource')) {
                        label.innerHTML = 'Staff member';
                    }
                    if (label.innerHTML.includes('Scheduled Start')) {
                        label.innerHTML = label.innerHTML.replace('Start', 'start');
                    }
                    if (label.innerHTML.includes('Scheduled End')) {
                        label.innerHTML = label.innerHTML.replace('End', 'end');
                    }
                    if (labelHtml.includes('work type')) {
                        label.innerHTML = 'Appointment subject';
                    }
                    if (label.innerHTML.includes('Appointment Type')) {
                        label.innerHTML = label.innerHTML.replace(/Type/, 'type');
                    }
                    if (label.innerHTML.includes('Additional Information')) {
                        label.innerHTML = label.innerHTML.replace(/Information/, 'information');
                    }
                    if (label.innerHTML.includes('First Name')) {
                        label.innerHTML = label.innerHTML.replace(/First Name/, 'First name');
                    }
                    if (label.innerHTML.includes('Last Name')) {
                        label.innerHTML = label.innerHTML.replace(/Last Name/, 'Last name');
                    }
                    if (label.innerHTML.includes('Home Phone')) {
                        label.innerHTML = label.innerHTML.replace(/Home Phone/, 'Phone number');
                    }
                    if (label.innerHTML.includes('Scheduled Start')) {
                        label.innerHTML = 'Scheduled start';
                    }
                    if (label.innerHTML.includes('Scheduled Start')) {
                        label.innerHTML = 'Scheduled start';
                    }
                }
            }
            for (const elem of lightningNode.querySelectorAll('.runtime_appointmentbookingFlowReview h3 .section-header-title')) {
                if (elem.innerHTML.toLowerCase().includes('service resource') || elem.innerHTML.toLowerCase().includes('scheduled times')) {
                    elem.innerHTML = elem.innerHTML.replace(/service resource/gi, resourceHeading);
                    elem.innerHTML = elem.innerHTML.replace(/scheduled times/gi, scheduledTimeHeading);
                }
            }
            if (reviewPage.querySelector('h2').innerHTML != reviewHeading) {
                reviewPage.querySelector('h2').innerHTML = reviewHeading;
            }
        }

        const updateResourcePage = () => {
            const resourcePageHeadingHTML = lightningNode.querySelector('h2');
            if (resourcePageHeading !== '' && resourcePageHeadingHTML.innerHTML !== resourcePageHeading) {
                resourcePageHeadingHTML.innerHTML = resourcePageHeading;
            }

            const resourceTimeSlotHeading = lightningNode.querySelector('.runtime_appointmentbookingFlowTimeslot h2');
            if (resourceTimeSlotHeading && !resourceTimeSlotHeading.innerHTML.includes('day and time') && !resourceTimeSlotHeading.innerHTML.includes('Select Service Appointment Time')) {
                resourceTimeSlotHeading.childNodes[0].textContent = 'Select day and time with';
            } else if (resourceTimeSlotHeading && resourceTimeSlotHeading.innerHTML.includes('Select Service Appointment Time')) {
                resourceTimeSlotHeading.childNodes[0].textContent = 'Select day and time';
            }

            const resourceSlotWelcome = lightningNode.querySelector('.runtime_appointmentbookingResourceSlot .slds-welcome-mat__info-content .slds-text-heading--small');
            if (resourceSlotWelcome && resourceSlotWelcome.innerHTML.includes('service resource')) {
                resourceSlotWelcome.innerHTML = resourceSlotWelcome.innerHTML.replace(/service resource/gi, 'staff member');
            }
        }
        const callback = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    const groupHeading = lightningNode.querySelector('.runtime_appointmentbookingFlowWorkType h2');
                    const typePage = lightningNode.querySelector('.runtime_appointmentbookingFlowWorkType .slds-form-element__control');
                    const node = query.productType ? lightningNode.querySelector(`[title="${query.productType.toString().replaceAll('-', ' ')}" i]`) : null;
                    const autoResource = lightningNode.querySelector('h2[title*="automatically assign" i]');
                    const finishTextHTML = lightningNode.querySelector('.runtime_appointmentbookingFlowConfirm h2');
                    const reviewPageForm = lightningNode.querySelector('.runtime_appointmentbookingFlowReview .slds-form');
                    const resourcePage = lightningNode.querySelector('.runtime_appointmentbookingResourceList');

                    if (!showAll) {
                        for (const elem of document.querySelectorAll('.runtime_appointmentbookingFlowWorkType .slds-form-element__control .slds-m-top_small')) {
                            const productName = elem.querySelector(`label span[title]`).innerHTML.toLowerCase().replaceAll(' ', '-',);
                            if(!productFilters || !productFilters.includes(productName)) {
                                elem.style.display = 'none';
                            }
                        }
                        if (locationName === 'TopicScreen' && document.getElementById('show_more_types')) {
                            document.getElementById('show_more_types').style.display = 'block';
                        }
                    }
                    if (groupHeading && groupHeading.innerHTML != selectSubjectText) {
                        groupHeading.innerHTML = selectSubjectText;
                    }

                    if (resourcePage) {
                        updateResourcePage();
                    }
                    if (reviewPageForm) {
                        updateReviewPage();
                    }
                    if (finishTextHTML && finishTextHTML.innerHTML != finishText) {
                        finishTextHTML.innerHTML = finishText;

                        let finishImg = document.createElement('img');
                        finishImg.setAttribute('class', 'slds-p-top_large slds-illustration__svg');
                        finishImg.setAttribute('src', finishImage);

                        let finishImgSpan = document.createElement('span');
                        finishImgSpan.setAttribute('class', 'uiImage');

                        let finishImgDiv = document.createElement('div');
                        finishImgDiv.setAttribute('class', 'slds-illustration slds-illustration_small');

                        finishImgSpan.appendChild(finishImg);
                        finishImgDiv.appendChild(finishImgSpan);

                        finishText.insertAdjacentElement('afterend', finishImgDiv);
                    }
                    if (autoResource && autoResource.innerHTML != anyResourceText) {
                        autoResource.innerHTML = anyResourceText;
                        autoResource.setAttribute('title', anyResourceText)
                        let listTitle = document.createElement('h2');
                        listTitle.setAttribute('id', 'Resource_Heading');
                        listTitle.setAttribute('class', 'slds-text-heading_medium slds-text-align_center slds-p-vertical_medium slds-text-color_default')
                        listTitle.innerHTML = selectResourceText;
                        const list = document.querySelector(".runtime_appointmentbookingResourceList .slds-form-element__control");
                        list.insertBefore(listTitle, list.children[0]);
                    }
                    if (node) {
                        if (node.closest('.slds-m-top_small')) {
                            node.closest('.slds-m-top_small').style.display = 'block';
                        }
                        if (firstCall) {
                            node.closest('label').click();
                            // setTimeout(() => {node.closest('label').scrollIntoView({ behavior: "smooth"});}, 500);
                            firstCall = false;
                        }
                    }
                    if (!node && typePage && !productFilters) {
                        viewAll();
                    }
                }
                break;
            }
        }
        const loadScript = ({ id, src, onload = null }) => {
            const externalScript = document.createElement("script");
            // externalScript.onerror = loadError;
            externalScript.id = id;
            externalScript.async = false;
            externalScript.type = "text/javascript";
            externalScript.onload = onload;
            // externalScript.setAttribute("crossorigin", "anonymous");
            document.body.appendChild(externalScript);
            console.log(`Load Script: ${src}`);
            setFlowLoaded([...flowLoaded, id]);
            console.log(flowLoaded);
            externalScript.src = src;
        }
        console.log('SALESFORCE');
        console.log(flowId);
        console.log(appUrl);
        let SalesforceFile = [{
            id: 'lightningLocatorScript',
            src: `https://connexusexperience--stage.sandbox.my.site.com/lightning/lightning.out.js`,
            strategy: 'afterInteractive',
            onload: () => {
                window.$Lightning.use("runtime_appointmentbooking:lightningOutGuest",
                    function () {                  // Callback once framework and app load
                        window.$Lightning.createComponent(
                            "lightning:flow",    // top-level component of your app
                            {
                                onstatuschange: function (event) {
                                    // console.log(event.getParam('currentStage').name);
                                    // console.log(event.getParam('activeStages'))
                                    const finishLink = document.referrer ? document.referrer : '/'
                                    const currentStageNum = event.getParam('activeStages').findIndex(s => s.name === event.getParam('currentStage').name);
                                    // console.log('Status Change')
                                    // console.log(`Current Stage: ${currentStageNum}`)
                                    // console.log(event);
                                    const showButton = document.getElementById('show_more_types');
                                    locationName = event.getParam('locationName');
                                    if (currentStageNum != 0 && showButton) {
                                        showButton.style.display = 'none';
                                    }
                                    if (event.getParam("status") === "FINISHED") {
                                        // console.log('FINISHED');
                                        const finalScreen = document.getElementById('Final-Screen');
                                        lightningNode.style.display = 'none';
                                        document.location.href = finishLink;
                                    }
                                }
                            },    // attributes to set on the component when created
                            "lightningLocator",    // the DOM location to insert the component
                            function (component) {            // API name of the Flow
                                component.startFlow(flowId);
                            }
                        );
                    }, appUrl  // Site endpoint
                );
            }
        }];
        

        if (!initialized.current) {
            initialized.current = true;
            SalesforceFile.map(file => {
                loadScript(file);
            })
            SalesforceFile = [];
        }


        const observer = new MutationObserver(callback);
        observer.observe(lightningNode, config);
    }, []);

    return (
        <>
            <div id="lightningLocator"></div>
            {
                query.productType &&
                <div id="show_more_types">
                    <a onClick={viewAll} className="cx-button cx-button--outlined">
                    { viewMoreButton !== '' ? viewMoreButton : 'View More Subjects'}
                    </a>
                </div>
            }
        </>
    );

};

export default Scheduler;

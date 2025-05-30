// To detect if the chat is being launched on mobile device
import { isMobile } from 'mobile-device-detect';

export const ciscoBubbleChat = () => {
    var smHost = 'cu-socialminer.connexuscu.org';
    var widgetId = '5';
    // Modify this flag to false, To disable the chat download transcript option
    var enableTranscriptDownload = true;
    
    //Please change below accesibility messages for your language if reqiured.
    var accesibilityMessageForCloseButton = 'close';
    var accesibilityMessageForMinimizeButton = 'minimize';
    var accesibilityMessageForRestoreButton = 'restore';
    var accesibilityMessageToIndicateAgentTyping = 'Agent is typing';
    var accesibilityMessageToIndicateMessageFromAgent = 'message from';
    var accesibilityMessageToIndicateCustomerSentMessage = 'Sent message from';
    var accesibilityMessageToSelectRating = 'Please press 1 to 5 key with 1 being lowest and 5 being highest';
    
    var msgWaitingForSecureConnectivity = 'Waiting for secure connectivity...';
    var msgCloseButtonLabel = 'Close';

    var appId = 'cisco_bubble_chat';
    var appClass = isMobile ? 'mobile_bubble_chat' : 'desktop_bubble_chat';
    var appMargin = 15;
    var scheme = 'https://';
    var appUrl = scheme + smHost + '/ccp/ui/BubbleChat.html?host=' + smHost + '&wid=' + widgetId;
    var connectivityCheckUrlSecure = scheme + smHost + '/ccp/ui/ConnectivityCheck.html';
    var secureConnectivityCheckTimeout = 2000;
    var logPrefix = 'CISCO_BUBBLE_CHAT: ';
    var addNoCacheQueryParam;

    var injectedAccessibilityConfigMessages = {
        'minimizeButtonText': accesibilityMessageForMinimizeButton,
        'closeButtonText': accesibilityMessageForCloseButton,
        'restoreButtonText': accesibilityMessageForRestoreButton,
        'agentTypingText': accesibilityMessageToIndicateAgentTyping,
        'agentSentMessageText': accesibilityMessageToIndicateMessageFromAgent,
        'customerSentMessageText': accesibilityMessageToIndicateCustomerSentMessage,
        'feedbackRatingIndicationText': accesibilityMessageToSelectRating
    };

    document.addEventListener("DOMContentLoaded", function () {
        ciscoBubbleChat.checkChatInProgress();
    });
    return {
        checkChatInProgress: function () {
            if (typeof (Storage) !== 'undefined') {
                if (sessionStorage.chatInProgress && JSON.parse(sessionStorage.chatInProgress)) {
                    console.log(logPrefix + 'Chat conversation in progress detected. Trying to resume.');
                    ciscoBubbleChat.showChatWindow();
                } else {
                    console.log(logPrefix + 'There is no chat conversation in progress currently');
                }
            }
        },
        showChatWindow: function (injectedData) {
            var messageEventListener;
            if (document.getElementById(appId)) {
                console.log(logPrefix + 'Not loading BubbleChat as it is already loaded');
                return;
            }

            var validateInjectedData = function(data,dataLength) {
                // browser compatible way to check whether it is an object with 10 fields and all the values are strings
                var result = true;
                if (data && typeof data === 'object' && data.constructor === Object){
                    var counter = 0;
                    for (var key in data) {
                        if (!(typeof data[key] === 'string' || data[key] instanceof String)) {
                            result = false;
                            break;
                        }
                        counter++;
                        if (counter > dataLength) {
                            result = false;
                            break;
                        }
                    }
                } else {
                    result = false;
                }
                return result;
            };
            
            if (injectedData) {
                if (validateInjectedData(injectedData.formData,10)) {
                    appUrl += '&injectedFormData=' + encodeURIComponent(JSON.stringify(injectedData.formData));
                } else {
                    if (typeof injectedData.validationErrorCallback === 'function') {
                        injectedData.validationErrorCallback();
                    } else {
                        console.log(logPrefix + 'Could not invoke validationErrorCallback as it is not a function');
                    }
                }
                if (injectedData.authorFieldName) {
                    appUrl += '&authorFieldName=' + encodeURIComponent(injectedData.authorFieldName);
                    console.log(logPrefix + 'Form field overriden for author inference = ' + injectedData.authorFieldName);
                }
            }
            appUrl += '&enableTranscriptDownload=' + enableTranscriptDownload;

            var iframe = document.createElement('iframe');
            iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups');
            iframe.setAttribute('id', appId);
            iframe.setAttribute('class', appClass);
            document.body.appendChild(iframe);
            var frameWindow = iframe.contentWindow ? iframe.contentWindow : iframe;
            var frameDoc = frameWindow.document;

            // Trigger a page load for iframe inline content loading to work in Firefox
            frameDoc.open();
            frameDoc.close();
            
            if(isMobile) {
                frameDoc.body.style = 'margin:0;padding:0;';
            } else {
                frameDoc.body.style = 'margin:0;padding:4;box-sizing:border-box;';
            }
            
            frameDoc.body.innerHTML = '<div id="secure_connectivity_check_container" style="width: 100%; height: 100%;' +
                    'font-family: Helvetica; font-size: 14px; color: #4F5051;text-align:center;' +
                    'box-shadow: 0 0 3px #000; background: #fff; display: flex; flex-direction: column;justify-content:space-around;">' +
                    '<div style="height:100%;display:flex;flex-direction:column">' +
                        '<div style="height:50%;display:flex;align-items:center;">' +
                            '<div style="width:100%;text-align:center;">' + msgWaitingForSecureConnectivity + '</div>' +
                        '</div>' +
                    '<div style="height:50%;display:flex;align-items:center;">' +
                        '<a href="#" onClick="window.parent.postMessage({messageType: \'unmount\'}, \'*\'); return void(0);" style="width:100%;text-align:center;">' +
                            msgCloseButtonLabel +
                        '</a>' +
                    '</div>' +
                '</div>';
            '</div>';

            if (!addNoCacheQueryParam) {
                addNoCacheQueryParam = function (url) {
                    return url + (url.indexOf("?") === -1 ? '?' : '&') + 'nocache=' + new Date().getTime();
                }
            }

            if (!messageEventListener) {
                messageEventListener = function (event) {
                    console.log(logPrefix + 'Received event from origin: ' + event.origin);
                    console.log(logPrefix + 'Received event data: ' + JSON.stringify(event.data));
                    switch (event.data.messageType) {
                        case 'resize':
                            var styleData = event.data.styles;
                            if(typeof styleData === 'object' && Object.keys(styleData).length > 0) {
                                var widgetStyles = '';
                                for(var style in styleData) {
                                    widgetStyles = widgetStyles + style + ':' + styleData[style] + ';';
                                }
                                document.getElementById(appId).style = widgetStyles;
                            }
                            break;
                        case 'unmount':
                            document.body.removeChild(document.getElementById(appId));
                            window.removeEventListener('message', messageEventListener);
                            console.log(logPrefix + 'Successfully unmounted BubbleChat and removed event listener for message');
                            break;
                        case 'bubblechat-cert-accepted':
                            iframe.contentWindow.location.replace(addNoCacheQueryParam(appUrl));
                            console.log(logPrefix + 'Successfully validated certificate acceptance and loaded BubbleChat');
                            break;
                        case 'set-chat-in-progress':
                            if (typeof (Storage) !== 'undefined') {
                                sessionStorage.chatInProgress = JSON.stringify(true);
                                console.log(logPrefix + 'chatInProgress flag set in parent window');
                            }
                            break;
                        case 'clear-chat-in-progress':
                            if (typeof (Storage) !== 'undefined') {
                                sessionStorage.removeItem("chatInProgress");
                                console.log(logPrefix + 'chatInProgress flag cleared in parent window');
                            }
                            break;
                        case 'minimize':
                            document.getElementById(appId).classList.add('minimized_chat');
                            break;
                        case 'download-transcript' : 
                            const blob = new Blob([event.data.data], {type: 'text/html'});
                            const fileName = constructTranscriptFileName(event.data.customerName);
                            const blobUrl = window.URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = blobUrl;
                            link.download = fileName;
                            // This prevents downloading --- document.body.appendChild(link);
                            link.click();
                            // For Firefox it is necessary to delay revoking the ObjectURL
                            setTimeout(function () {
                                // document.body.removeChild(link);
                                window.URL.revokeObjectURL(blobUrl);
                            }, 100);
                            break;
                        case 'restore':
                            document.getElementById(appId).classList.remove('minimized_chat');
                            break;
                        case 'requestToSendAccessibilityMessage':
                            if(injectedAccessibilityConfigMessages && validateInjectedData(injectedAccessibilityConfigMessages,7)) {
                                frameWindow.postMessage({ messageType: 'accessibilityMessages', injectedAccessibilityConfigMessages: injectedAccessibilityConfigMessages }, '*');
                                console.log(logPrefix + 'Successfully sent accessibility config messages to BubbleChat');
                            } else {
                                console.log(logPrefix + 'Error in validating accessibility config messages, will not be passed to BubbleChat');
                            }
                            break;
                        default:
                            console.log(logPrefix + 'Unknown message type');
                    }
                };
            }

            window.addEventListener('message', messageEventListener);
            console.log(logPrefix + 'Event listener for message added');

            function constructTranscriptFileName (customerName) {
                const dateTime = new Date().toLocaleString();
                const dtTransformed = dateTime.replace(/ +/g, '').replace(/\W+/g, '_').replace(/^_/g, '');
                const userName = customerName.replace(/ +/g, '_');
                const fileName = 'ChatTranscript_' + userName + '-' + dtTransformed + '.html';
                return fileName;
            }
            
            var obtainSecureConnectivity = function () {
                window.open(addNoCacheQueryParam(connectivityCheckUrlSecure), 'SM_CERT_PAGE');
            };
            
            var xhrSecureConnectivityCheck = new XMLHttpRequest();
            xhrSecureConnectivityCheck.onreadystatechange = function () {
                if (this.readyState === 4) {
                    console.log(logPrefix + 'Secure connectivity check status: ' + this.status);
                    switch (this.status) {
                        case 200:
                            iframe.contentWindow.location.replace(addNoCacheQueryParam(appUrl));
                            break;
                        default:
                            obtainSecureConnectivity();
                    }
                }
            }
            console.log(logPrefix + 'Checking secure connectivity to: ' + connectivityCheckUrlSecure);
            xhrSecureConnectivityCheck.open('HEAD', addNoCacheQueryParam(connectivityCheckUrlSecure), true);
            xhrSecureConnectivityCheck.timeout = secureConnectivityCheckTimeout;
            xhrSecureConnectivityCheck.ontimeout = function () { console.log(logPrefix + 'Secure Connectivity check timed out'); }
            xhrSecureConnectivityCheck.send();
        }
    };
};

export const niceChat = () => {
    return {
        initChat: function () {
            cxone('init', process.env.NEXT_PUBLIC_NICE_BRAND_ID);
            cxone('guide','init');
            // cxone('chat', 'setCustomCss', '[data-selector="GUIDE_CHANNEL_BUTTON"] {display: none;}');
        }
    }
}
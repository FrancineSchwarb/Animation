import { dom }                                    from "../../../kolibri/util/dom.js";
import { URI_HASH_ANIMATION }                     from "../../../customize/uriHashes.js";
import { Page }                                   from "../../../kolibri/navigation/page/page.js";

export { AnimationPage }

const PAGE_CLASS     = URI_HASH_ANIMATION.substring(1); // share between page, content, and style
const ACTIVATION_MS  = 1000;
const PASSIVATION_MS = 1000;
const TITLE          = "Animation";


/** TODO: What does this page do?
 * @return { PageType }
 * @constructor
 */

const AnimationPage = () => Page({
    titleText:         TITLE,
    activationMs:      ACTIVATION_MS,
    passivationMs:     PASSIVATION_MS,
    pageClass:         PAGE_CLASS,
    styleElement  :    /** @type { HTMLStyleElement } */ styleElement,
    contentElement:    /** @type { HTMLElement }      */ contentElement,
});


/** TODO: Write content */
const [contentElement] = dom(`
    <div class="${PAGE_CLASS} prosa">
        <h1>Animation</h1>
        <p>Hello test</p>
    </div>
`);

/** TODO: style this page */
const [styleElement] = dom(`
    <style data-style-id="${PAGE_CLASS}">
        @layer pageLayer {      
            .${PAGE_CLASS} {        
                                     
                 &.activate {
                     --activation-ms:    ${ACTIVATION_MS};
                     animation:          ${PAGE_CLASS}_activation calc(var(--activation-ms) * 1ms) ease-out forwards;
                 }         
                 &.passivate {
                     --passivation-ms:   ${PASSIVATION_MS};
                     animation:          ${PAGE_CLASS}_passivation calc(var(--passivation-ms) * 1ms) ease-in forwards;
                 }                       
             }       
             /* cannot be nested and must be uniquely named */
             @keyframes ${PAGE_CLASS}_activation {
                 0% {
                     opacity:        0.5;
                     transform:      translateX(100cqw);
                 }
                 100% {
                     opacity:        1;
                     transform:      translateX(0);
                 }
             }  
             @keyframes ${PAGE_CLASS}_passivation {
                 0% {
                     opacity:        1;
                     transform:      translateX(0);
                 }
                 100% {
                     opacity:        0.5;
                     transform:      translateX(-100cqw);
                 }
             }              
        }
    </style>
`);
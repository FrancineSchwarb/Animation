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
        <p>bla 1</p>
        <p>bla 2</p>
        <p>bla 3</p>
        <p>bla 4</p>
    </div>
`);

/** TODO: style this page */
const [styleElement] = dom(`
    <style data-style-id="${PAGE_CLASS}">
        @layer pageLayer {
            .${PAGE_CLASS} {
                animation: ${PAGE_CLASS}_container 1s ease-out forwards;

                &.activate {
                    animation: ${PAGE_CLASS}_container-in calc(var(--activation-ms) * 1ms) ease-out forwards;
                }

                &.passivate {
                    animation: ${PAGE_CLASS}_container-out calc(var(--passivation-ms) * 1ms) ease-in forwards;
                }

                h1 {
                    animation: ${PAGE_CLASS}_title calc(var(--activation-ms) * 1ms) cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
                }


                p {
                                        opacity: 0;

                    transform: translateY(20px);
                    animation: ${PAGE_CLASS}_paragraph 0.5s ease-out forwards;
                }

                p:nth-child(2) {
                    animation-delay: 1s;
                }

                p:nth-child(3) {
                    animation-delay: 1.5s;
                }

                p:nth-child(4) {
                    animation-delay: 2s;
                }

                p:nth-child(5) {
                    animation-delay: 2.5s;
                }

                p:nth-child(6) {
                    animation-delay: 3s;
                }
              
            }

                     
                                      
             }    
             
                         @keyframes ${PAGE_CLASS}_container-in {
                 0% {
                     opacity:        0.5;
                     transform:      translateX(100cqw) scale(0.8) rotate(10deg);
                     color: rgba(255, 200, 0, 0.5);
                 }
                 50% {
                     opacity:        0.8;
                     transform:      translateX(20cqw) scale(1.1) rotate(-5deg);
                     color: rgba(255, 100, 200, 0.8);
                 }
                 100% {
                     opacity:        1;
                     transform:      translateX(0) scale(1) rotate(0deg);
                     color: initial;
                 }
            }

            @keyframes ${PAGE_CLASS}_container-out {
               0% {
                     opacity:        1;
                     transform:      translateX(0) scale(1) rotate(0deg);
                     color: initial;
                 }
                 50% {
                     opacity:        0.8;
                     transform:      translateX(-20cqw) scale(0.9) rotate(5deg);
                     color: rgba(100, 200, 255, 0.8);
                 }
                 100% {
                     opacity:        0.5;
                     transform:      translateX(-100cqw) scale(0.7) rotate(-10deg);
                     color: rgba(255, 200, 0, 0.5);
                 }
            }
            
            @keyframes ${PAGE_CLASS}_paragraph {
                0% {
                    opacity: 0;
                    transform: translateY(20px);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
                    
        }
    </style>
`);

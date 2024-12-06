import { dom } from "../../../kolibri/util/dom.js";
import { URI_HASH_ANIMATION } from "../../../customize/uriHashes.js";
import { Page } from "../../../kolibri/navigation/page/page.js";

export { AnimationPage }

const PAGE_CLASS = URI_HASH_ANIMATION.substring(1); // share between page, content, and style
const ACTIVATION_MS = 1000;
const PASSIVATION_MS = 1000;
const TITLE = "Animation";

/** The animation page comes with a slide-in / slide-out animation and color changes
 * The paragraphs appear one after the other
 * @return { PageType }
 * @constructor
 */
const AnimationPage = () => Page({
    titleText: TITLE,
    activationMs: ACTIVATION_MS,
    passivationMs: PASSIVATION_MS,
    pageClass: PAGE_CLASS,
    styleElement: /** @type { HTMLStyleElement } */ styleElement,
    contentElement: /** @type { HTMLElement } */ contentElement,
});

const [contentElement] = dom(`
    <div class="${PAGE_CLASS} prosa">
        <h1>Animation</h1>
        <p>The overall page uses container animations to create smooth transitions when the page is activated or deactivated. The page slides in from the right during activation, scaling slightly and rotating to add depth. It fades in by increasing opacity, while its color transitions enhance the effect.</p>
        <p>The title animation is distinct and visually striking. The title begins off-screen on the left, slightly rotated, and slides into its position while straightening up. It fades in simultaneously, ensuring a polished and attention-grabbing reveal.</p>
        <p>Each paragraph element is animated sequentially to provide a cascading effect. Paragraphs start slightly below their final position, fully transparent, and slide upward while fading in. This creates a smooth and natural progression as the content appears.</p>
        <p>The staggered timing for paragraphs is achieved using <code>nth-child</code> selectors. Each paragraph has a unique delay, allowing them to appear one after the other. This timing adds a sense of rhythm and engagement for the user.</p>
        <p>The animations are customizable using variables for duration and easing functions. For example, the container and title use <code>cubic-bezier</code> easing for a bounce effect, while paragraphs use <code>ease-out</code> for a smoother transition.</p>
        <p>Overall, the combination of container, title, and paragraph animations ensures the page is interactive and visually appealing, with seamless entry and exit transitions.</p>
    </div>
`);

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
                    animation: ${PAGE_CLASS}_paragraph 3s ease-out forwards;
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

                p:nth-child(7) {
                    animation-delay: 3.5s;
                }
            }

        }

        @keyframes ${PAGE_CLASS}_container-in {
            0% {
                opacity: 0.5;
                transform: translateX(100cqw) scale(0.8) rotate(10deg);
                color: var(--kb-color-rgb-lavender-700);
            }
            50% {
                opacity: 0.8;
                transform: translateX(20cqw) scale(1.1) rotate(-5deg);
                color: var(--kb-color-rgb-purple-700);
            }
            100% {
                opacity: 1;
                transform: translateX(0) scale(1) rotate(0deg);
                color: initial;
            }
        }

        @keyframes ${PAGE_CLASS}_container-out {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1) rotate(0deg);
                color: initial;
            }
            50% {
                opacity: 0.8;
                transform: translateY(20cqh) scale(0.9) rotate(10deg);
                color: var(--kb-color-rgb-green-500);
            }
            100% {
                opacity: 0.5;
                transform: translateY(50cqh) scale(0.7) rotate(25deg);
                color: var(--kb-color-rgb-yellow-500);
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
        
        
    </style>
`);

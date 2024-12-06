import { SiteController }                   from "../../../kolibri/navigation/siteController.js";
import { defaultConsoleLogging }            from "../../../kolibri/logger/loggingSupport.js"; // allow console manipulation
import { SimpleNavigationProjector }        from "../../../kolibri/navigation/projector/simple/simpleNavigationProjector.js";
import { SiteProjector }                    from "../../../kolibri/navigation/projector/siteProjector.js";
import { HomePage  }                        from "./home.js";
import { UnstyledPage }                     from "./unstyled.js";
import { MasterDetailPage }                 from "./masterDetailPage.js";
import { AnimationPage }                    from "./raphiFranc.js";

import {
        URI_HASH_HOME,
        URI_HASH_MASTER_DETAIL,
        URI_HASH_UNSTYLED,
        URI_HASH_ANIMATION
}                                           from "../../../customize/uriHashes.js";


defaultConsoleLogging("ch.fhnw.kolibri", LOG_INFO);

const siteController = SiteController();
const siteProjector  = SiteProjector(siteController);

siteController.registerPage(URI_HASH_HOME,          HomePage());
siteController.registerPage(URI_HASH_UNSTYLED,      UnstyledPage());
siteController.registerPage(URI_HASH_MASTER_DETAIL, MasterDetailPage());
siteController.registerPage(URI_HASH_ANIMATION,     AnimationPage());

SimpleNavigationProjector(siteController, siteProjector.sideNavigationElement);
SimpleNavigationProjector(siteController, siteProjector.topNavigationElement);

siteController.gotoUriHash(window.location.hash);


import { SiteController }                   from './siteController.js';
import { TestSuite }                        from "../util/test.js";
import { URI_HASH_EMPTY, URI_HASH_HOME } from "../../customize/uriHashes.js";
import {Page}                            from "./page/page.js";

const siteControllerSuite = TestSuite('siteController');

siteControllerSuite.add('typical sequence', assert => {

    const siteController = SiteController();
    assert.is(Object.entries(siteController.getAllPages()).length, 0);

    const uriHash     = [];
    const activePage  = [];
    const passivePage = [];
    siteController.onUriHashChanged(it => uriHash.push(it));
    siteController.onPageActivated ( it => activePage .push(it.titleText));
    siteController.onPagePassivated( it => passivePage.push(it.titleText));
    assert.iterableEq(uriHash,     ["#empty"]);
    assert.iterableEq(activePage , ["Empty"] );
    assert.iterableEq(passivePage, ["Empty"] );

    const samplePage = Page({
      titleText:      "Sample",
      pageClass:      "sample",
      styleElement:   undefined,
      contentElement: undefined
    });

    siteController.registerPage(URI_HASH_HOME, samplePage);

    assert.is(Object.entries(siteController.getAllPages()).length, 1);

    siteController.gotoUriHash(URI_HASH_HOME);
    assert.iterableEq(uriHash,     ["#empty", "#home"]);
    assert.iterableEq(activePage , ["Empty",  "Sample"] ); // activation is immediate
    assert.iterableEq(passivePage, ["Empty"] );            // nothing to passivate, yet

    siteController.registerPage(URI_HASH_EMPTY, samplePage); // register same under another hash

    siteController.gotoUriHash(URI_HASH_EMPTY);
    // now the old active page gets passivated.
    assert.iterableEq(passivePage, ["Empty", "Sample"] );
});

siteControllerSuite.add('unknown uriHash', assert => {

    const siteController = SiteController();
    assert.is(Object.entries(siteController.getAllPages()).length, 0);

    const uriHash     = [];
    const activePage  = [];
    const passivePage = [];
    const unsupportedHashes = [];
    siteController.onUriHashChanged (it => uriHash.push(it));
    siteController.onPageActivated  ( it => activePage .push(it.titleText));
    siteController.onPagePassivated ( it => passivePage.push(it.titleText));
    siteController.onUnsupportedUriHash( it => unsupportedHashes.push(it));
    assert.iterableEq(uriHash,     ["#empty"]);
    assert.iterableEq(activePage , ["Empty"] );
    assert.iterableEq(passivePage, ["Empty"] );
    assert.iterableEq(unsupportedHashes, [] );

    const noSuchUriHash = /** @type { UriHashType } */" #no-such-uri-hash"; // cheating the type system :-(
    siteController.gotoUriHash(noSuchUriHash);

    // no uriHash change, activation, or passivation - only the callback is used

    assert.iterableEq(uriHash,     ["#empty"]);
    assert.iterableEq(activePage , ["Empty"] );
    assert.iterableEq(passivePage, ["Empty"] );
    assert.iterableEq(unsupportedHashes, [noSuchUriHash] );

});

siteControllerSuite.run();

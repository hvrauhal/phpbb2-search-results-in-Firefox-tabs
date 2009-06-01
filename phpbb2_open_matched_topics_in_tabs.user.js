// ==UserScript==
// @name phpBB2 Open all matched topics in tabs
// @namespace http://www.laskikymppi.com/
// @description Inserts an Open all topics in tabs link to phpBB2 search pages.
// @include */search.php?*
// ==/UserScript==
//
// 21-01-2009 hvrauhal 
// 19-08-2008 v1.2.0 fheub http://userscripts.org/scripts/show/4681
// 21-03-2006 Copyright (c) 2006, JAPIO http://userscripts.org/scripts/show/3609
//
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// Inserts an "Open all topics in tabs" link to phpBB2 search
// pages. Clicking the link opens all topics listed on the page in new tabs, at their last post.
//
// INSTALLATION
// First install Greasemonkey from https://addons.mozilla.org/en-US/firefox/addon/748
// Then install this script by revisiting this page

insertActionToPage(collectAllTopicAnchors());
GM_log("Added open all topics in tabs to page.");

function collectAllTopicAnchors() {
    return evaluateXPath("//a[contains(@href, 'viewtopic.php?p=')]");
}

function insertActionToPage(anchors) {
    var linkCell = createNewTableCell();
    linkCell.appendChild(createLinkAnchor(anchors));
    insertAfter(linkCell, lookupForumIndexCell());
}

function createNewTableCell() {
    var td = document.createElement('td');
    td.className = "gensmall";
    td.align = "right";
    td.valign = "bottom";
    return td;
}

function createLinkAnchor(anchors) {
    var anchor = document.createElement('a');
    anchor.href = "#";
    anchor.className= "gensmall";
    anchor.innerHTML = 'Open all topics in tabs';
    anchor.addEventListener('click', function() { openInTabs(anchors) }, true);
    return anchor;
}

function insertAfter(newElement, original) {
    original.parentNode.insertBefore(newElement, original.nextSibling);
}

function lookupForumIndexCell() {
    return evaluateXPath("//td/span/a[contains(@href, 'index.php')]/parent::*/parent::*").snapshotItem(0);
}

function openInTabs(anchors) {
    for (var i = 0; i < anchors.snapshotLength; i++) {
	GM_openInTab(anchors.snapshotItem(i).href);
    }
}

function evaluateXPath(query) {
    return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

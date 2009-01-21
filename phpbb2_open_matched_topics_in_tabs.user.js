// ==UserScript==
// @name phpBB2 Open all matched topics in tabs
// @namespace http://www.laskikymppi.com/
// @description Inserts an Open all topics in tabs link to phpBB2 search pages.
// @include */search.php?*
// ==/UserScript==
//
// 21-01-2009 hvrauhal 
// 19-08-2008 v1.2.0 fheub http://userscripts.org/scripts/show/4681
// 21-03-2006 Copyright (c) 2006, JAPIO http://userscripts.org/scripts/review/3609
//
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// Inserts an "Open all topics in tabs" link to phpBB2 search
// pages. Clicking the link opens all topics listed on the page in new tabs, at their last post.
//
// INSTALLATION
// First install Greasemonkey from http://greasemonkey.mozdev.org/
// Then install this script by revisiting this page

insertActionToPage(collectAllLinks());
GM_log("Added open all topics in tabs to page.");

function collectAllLinks() {
    return xpath("//a[contains(@href, 'viewtopic.php?p=')]");
}

function insertActionToPage(allLinks) {
    var newTableCell;
    newTableCell = createNewTableCell();
    newTableCell.appendChild(createLinkAnchor(allLinks));
    insertElementAfter(lookupForumIndexCell(), newTableCell);
}

function createNewTableCell() {
    var newTableCell;
    newTableCell = document.createElement('td');
    newTableCell.class = "gensmall";
    newTableCell.align = "right";
    newTableCell.valign = "bottom";
    return newTableCell;
}

function createLinkAnchor(allLinks) {
    var linkAnchor;
    linkAnchor = document.createElement('a');
    linkAnchor.href = "#";
    linkAnchor.innerHTML = 'Open all topics in tabs';
    linkAnchor.addEventListener('click', function() {openRecentPosts(allLinks)}, true);
    return linkAnchor;
}

function insertElementAfter(original, newElement) {
    original.parentNode.insertBefore(newElement, original.nextSibling);
}

function lookupForumIndexCell() {
    return xpath("//td/span/a[contains(@href, 'index.php')]/parent::*/parent::*").snapshotItem(0);
}

function openRecentPosts(allLinks) {
    for (var i = 0; i < allLinks.snapshotLength; i++) {
	GM_openInTab(allLinks.snapshotItem(i).href);
    }
}
function xpath(query) {
    return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
};
    
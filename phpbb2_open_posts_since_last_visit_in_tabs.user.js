// ==UserScript==
// @name           phpBB2 Open all matched topics in tabs
// @namespace      http://www.laskikymppi.com/
// @description    Inserts an "Open all topics in tabs" link to phpBB2 search pages.
// @include        */search.php?*
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

function openRecentPosts(allLinks) {
    for (var i = 0; i < allLinks.snapshotLength; i++) {
	GM_openInTab(allLinks.snapshotItem(i).href);
    }
}
    
function xpath(query) {
    return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
    allLinks = xpath("//a[contains(@href, 'viewtopic.php?p=')]");
    
    forumIndexLinkCell = xpath("//td/span/a[contains(@href, 'index.php')]/parent::*/parent::*").snapshotItem(0);
    
    newTableCell = document.createElement('td');
    newTableCell.class = "gensmall";
    newTableCell.align = "right";
    newTableCell.valign = "bottom";
    linkAnchor = document.createElement('a');
    linkAnchor.innerHTML = '<a href="#" class="gensmall">Open all topics in tabs</a>';
    linkAnchor.addEventListener('click', function() {openRecentPosts(allLinks)}, true);
    newTableCell.appendChild(linkAnchor);

    forumIndexLinkCell.parentNode.insertBefore(newTableCell, forumIndexLinkCell.nextSibling);

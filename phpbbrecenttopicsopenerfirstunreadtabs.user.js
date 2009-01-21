// ==UserScript==
// @name           phpBB Recent Topics opener (first unread tabs)
// @namespace      http://fheub.at.tf/
// @description    phpBB Recent Topics opener (first unread tabs)
// @include        */search.php?*search_id=newposts*
// @include        */viewforum.php?f=*
// ==/UserScript==
//
//
// 19-08-2008v1.2.0 fheub
// 21-03-2006 Copyright (c) 2006, JAPIO
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "phpBB Recent Topics opener", and click Uninstall.
//
//


var LabelAll = "Open all in new tabs";

function openRecentPosts(maxLinks, allLinks) {
    for (var i = 0; i < allLinks.snapshotLength && i < maxLinks; i++) {
	GM_openInTab(allLinks.snapshotItem(i).href);
    }
}
    
    latestReplyImages = document.evaluate("//img[contains(@src, 'images/icon_latest_reply.gif')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    linkImage = latestReplyImages.snapshotItem(0).src;
    
    insertlocation = document.evaluate(
	"//th[contains(@class, 'thCornerR')]",
	document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
    );
    
    allLinks = document.evaluate(
	"//a[contains(@href, 'viewtopic.php?p=')]",
	document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
    );
    
    newLink = insertlocation.snapshotItem(0);
    newLink.innerHTML = newLink.innerHTML + '&nbsp;<a href="#" title="' + LabelAll + '">Open all in tabs <img src="' + linkImage + '" alt="' + LabelAll + '" title="' + LabelAll + '" border="0" /></a>';
    newLink.addEventListener('click', function() {openRecentPosts(100, allLinks)}, true);
    
    
    
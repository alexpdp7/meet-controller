var meetTabId = null;

function tabUpdateListener(tabId, changeInfo, tab) {
    if(changeInfo.status == "complete") {
        meetTabId = tabId;
        browser.browserAction.setBadgeText({text: "AV"});
        browser.browserAction.enable();
    }
}

function tabRemoveListener(tabId, removeInfo) {
    if(tabId == meetTabId) {
        browser.browserAction.setBadgeText({text: ""});
        browser.browserAction.disable();
    }
}

browser.tabs.onUpdated.addListener(tabUpdateListener, {urls: ["*://meet.google.com/*-*-*"]});
browser.tabs.onRemoved.addListener(tabRemoveListener);
browser.browserAction.disable();

var client = new Paho.Client("localhost", 9001, "clientId");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});

// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("World");
  var message = new Paho.Message("Hello");
  message.destinationName = "World";
  client.send(message);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
}

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

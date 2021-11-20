const toggle_audio = "window.document.dispatchEvent(new KeyboardEvent('keydown',{'key':'d', 'ctrlKey': true}));"
const toggle_video = "window.document.dispatchEvent(new KeyboardEvent('keydown',{'key':'e', 'ctrlKey': true}));"

var audio = true;
var video = true;

document.querySelectorAll("button").forEach(e => e.onclick = function(e) {
    var script = e.target.id === "video" ? toggle_video : toggle_audio;

    if(e.target.id == "audio") {
        audio = !audio;
        document.querySelector("#audio").innerHTML = audio ? "Mute audio" : "Unmute audio";
    }

    if(e.target.id == "video") {
        video = !video;
        document.querySelector("#video").innerHTML = video ? "Mute video" : "Unmute video";
    }

    var badge = "";
    badge += audio ? "A" : "a";
    badge += video ? "V" : "v";

    browser.browserAction.setBadgeText({text: badge});

    browser.tabs.query({url: "*://meet.google.com/*-*-*"}).then(tabs => {
        for(var tab of tabs) {
            browser.tabs.executeScript(tab.id, {code: script}).then();
        }
    }, console.log);
});

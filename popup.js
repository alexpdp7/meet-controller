const toggle_audio = "window.document.dispatchEvent(new KeyboardEvent('keydown',{'key':'d', 'ctrlKey': true}));"
const toggle_video = "window.document.dispatchEvent(new KeyboardEvent('keydown',{'key':'e', 'ctrlKey': true}));"

document.querySelectorAll("button").forEach(e => e.onclick = function(e) {
    var script = e.target.id === "video" ? toggle_video : toggle_audio;
    browser.tabs.query({url: "*://meet.google.com/*-*-*"}).then(tabs => {
        for(var tab of tabs) {
            browser.tabs.executeScript(tab.id, {code: script}).then();
        }
    }, console.log);
});

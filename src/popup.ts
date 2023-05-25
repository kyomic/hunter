console.log('popup is run....')
import Application from "./app/Application";
try {
  chrome.browserAction.onClicked.addListener(() => {
    console.log('content to be loaded')
    chrome.tabs.executeScript({
      file: 'content.js',
    });
  });
} catch (err) { }


const launchApplication = () => {
  const app = new Application('#root')
}
document.addEventListener("DOMContentLoaded", launchApplication)
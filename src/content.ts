// 监听插件图标点击事件
chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.executeScript({
    file: 'content.js',
  });
});

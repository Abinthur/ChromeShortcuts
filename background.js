chrome.runtime.onInstalled.addListener(() => {
  console.log("插件已安装");
});

// 监听点击插件图标的事件
chrome.action.onClicked.addListener((tab) => {
  // 复制当前网页的 URL
  const currentUrl = tab.url;
  
  // 将 URL 复制到剪贴板
  navigator.clipboard.writeText(currentUrl).then(() => {
    console.log('URL 已复制到剪贴板');
    
    // 在这里执行调用 macOS 快捷指令的操作
    runMacShortcut(currentUrl);
  });
});

// 执行 macOS 快捷指令
function runMacShortcut(url) {
  // 使用 AppleScript 调用快捷指令
  const applescript = `
    tell application "Shortcuts Events"
      run shortcut "Your Shortcut Name" with input "${url}"
    end tell
  `;

  chrome.runtime.sendMessage({ action: 'runAppleScript', script: applescript });
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.message === "open-shortcuts") {
    chrome.tabs.create({
      url: "chrome://extensions/shortcuts",
    });
  }
});
chrome.commands.onCommand.addListener((command) => {
  if (command === "clear-tab") {
    clearTab();
  }
});

async function clearTab() {
  const [currentTab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  const numTabs = (await chrome.tabs.query({})).length;
  const index = currentTab.index;

  if (numTabs == 1) {
    //to not close the window
    await chrome.tabs.create({ index });
    await chrome.tabs.remove(currentTab.id);
  } else {
    //Good for '3 tabs only' extension
    //if was create->remove, then 3 tabs would be 4 before deletion
    await chrome.tabs.remove(currentTab.id);
    await chrome.tabs.create({ index });
  }
}

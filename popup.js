
const homeDiv = document.querySelector(".home");
const slidesDiv = document.querySelector(".slides");
const slides = document.querySelectorAll(".slide");

let index = -1;

const shortcuts = [...document.querySelectorAll(".shortcut")];
const nexts = [...document.querySelectorAll(".next")];
const previouses = [...document.querySelectorAll(".previous")];

show(index);
setShortcuts();
document.querySelector(".introduce").onclick = () => {
  homeDiv.classList.add("hidden");
  slidesDiv.classList.remove("hidden");
  index = 0;
  show(index);
  console.log("into slides");
};


document.querySelector(".change").onclick = () => {
  chrome.runtime.sendMessage({ message: "open-shortcuts" });
};

function show(index) {
  console.log(index);
  for (const slide of slides) {
    slide.classList.add("hidden");
  }
  slides[index]?.classList.remove("hidden");

  if (index == -1 || index == slides.length) {
    slidesDiv.classList.add("hidden");
    homeDiv.classList.remove("hidden");
    index = -1;
  }
}

nexts.forEach((next) => {
  next.onclick = () => {
    index += 1;
    show(index);
  };
});
previouses.forEach((previous) => {
  previous.onclick = () => {
    index -= 1;
    show(index);
  };
});

async function setShortcuts() {
  const extensionShortcuts = await chrome.commands.getAll();
  const clearTabShortcut = extensionShortcuts[extensionShortcuts.length - 1];
  shortcuts.forEach(
    (shortcut) => (shortcut.textContent = clearTabShortcut.shortcut)
  );
}

const { app, BrowserWindow } = require("electron");
const path = require("path");

function createStickerWindow(image, x, y, width = 200, height = 200) {
  const win = new BrowserWindow({
    width,
    height,
    x,
    y,
    frame: false,
    titleBarStyle: 'hidden',
    title: '',
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    hasShadow: false,
    skipTaskbar: true,
    focusable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Load the same HTML file but pass the image name as a query parameter
  win.loadFile(path.join(__dirname, "index.html"), {
    query: { image },
  });

  return win;
}

app.whenReady().then(() => {
  const startX = 50;   // distance from left edge
  const startY = 50;   // distance from top edge
  const spacing = 170; // distance between stickers
  const stickerSize = 150;

  const stickers = [
    "cute.png",
    "angry.png",
    "cloud.png",
    "love.png",
    "octopus.png",
    "proud.png",
    "cute2.png"
  ];

  let index = 0;
  for (let row = 0; row < 3; row++) {  // 3 rows max
    for (let col = 0; col < 3; col++) { // 3 columns
      if (index >= stickers.length) break; // stop if out of stickers
      createStickerWindow(
        stickers[index],
        startX + col * spacing,
        startY + row * spacing,
        stickerSize,
        stickerSize
      );
      index++;
    }
  }
});


app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

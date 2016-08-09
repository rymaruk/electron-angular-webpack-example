///<reference path="../typings/index.d.ts"/>

import { app, BrowserWindow, Menu, crashReporter, shell } from "electron";

let mainWindow = null;

app.on("window-all-closed", function () {
  app.quit();
});

app.on("ready", function () {

  mainWindow = new BrowserWindow({ width: 600, height: 500});

  mainWindow.loadURL("file://" + __dirname + "/index.html");

  mainWindow.on("closed", function () {
    mainWindow = null;
  });

});
const { Notification, contextBridge, ipcRenderer } = require("electron");
const electron = require("electron")
const { io } = require("socket.io-client");

/**
 * @type {import("socket.io-client").Socket | undefined}
 */
let socket;

contextBridge.exposeInMainWorld("electronAPI", {
  /**
   * OnApp Notification
   * @param {Electron.NotificationConstructorOptions | undefined} options Options
   */
  notify: (options) => ipcRenderer.send("notify", options),
  testnotify: () => {
    ipcRenderer.send("notify", { body: "test works" })
  },
  connect: (userId) => {
    if (!socket) {
      socket = io("http://localhost:3001", {
        query: { id: userId },
        transports: ["websocket", "polling"],
      });
    }

    return true;
  },
  /**
   * 
   * @param {string} event event
   * @param {(...args: any[]) => void} callback callback
   */
  on: (event, callback) => socket?.on(event, callback),
  /**
   * 
   * @param {string} event event
   * @param {(...args: any[]) => void | undefined} callback Callback
   */
  off: (event, callback) => {
    if (!socket) {
      console.warn("Tried to remove listener before connect:", event);
      return;
    }

    if (callback) {
      socket.off(event, callback); // remove specific listener
    } else {
      socket.removeAllListeners(event); // remove all listeners for event
    }
  },

  /**
   * 
   * @param {string} event event
   * @param  {...any} args args
   */
  emit: (event, ...args) => socket?.emit(event, ...args),
  disconnect: () => {
    socket?.disconnect();
    socket = undefined;
  }
});
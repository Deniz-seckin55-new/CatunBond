const { Notification } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    /**
     * OnApp Notification
     * @param {Electron.NotificationConstructorOptions | undefined} options Options
     */
  notify: (options) => new Notification(options).show(),
});
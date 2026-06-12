import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { Api, IPC_CHANNELS } from '@shared/ipc'

// Custom APIs for renderer
const api: Api = {
  accounts: {
    getAll: (user_id) =>
      ipcRenderer.invoke(IPC_CHANNELS.ACCOUNTS_GET_ALL, user_id),
    getById: (data) =>
      ipcRenderer.invoke(IPC_CHANNELS.ACCOUNTS_GET_BY_ID, data),
    create: (data) =>
      ipcRenderer.invoke(IPC_CHANNELS.ACCOUNTS_CREATE, data),
    update: (data) =>
      ipcRenderer.invoke(IPC_CHANNELS.ACCOUNTS_UPDATE, data),
    delete: (data) =>
      ipcRenderer.invoke(IPC_CHANNELS.ACCOUNTS_DELETE, data),
    bulkDelete: (data) =>
      ipcRenderer.invoke(IPC_CHANNELS.ACCOUNTS_BULK_DELETE, data),
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

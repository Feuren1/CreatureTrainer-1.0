import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// Custom APIs for renderer (if you add more later)
const api = {};

// Define your custom window resize API
const customElectronAPI = {
  onWindowResize: (callback: (size: { width: number; height: number }) => void) => {
    ipcRenderer.on('window-resized', (event, size) => {
      console.log(`Preload: Received resize ${size.width}x${size.height}`);
      callback(size);
    });
  },
};

// Combine toolkit's electronAPI with your custom API
const combinedAPI = {
  ...electronAPI,       // Spread toolkit's API (e.g., ping if enabled)
  ...customElectronAPI, // Add your onWindowResize
};

// Expose the combined API to the renderer
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', combinedAPI);
    contextBridge.exposeInMainWorld('api', api); // Keep for future use
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = combinedAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
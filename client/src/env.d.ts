/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Type definition for Facebook Pixel
declare module 'react-facebook-pixel' {
  export interface InitOptions {
    autoConfig?: boolean;
    debug?: boolean;
    version?: string;
  }

  export interface Options {
    eventID?: string;
    currency?: string;
    value?: number;
    [key: string]: any;
  }

  const ReactPixel: {
    init: (pixelId: string, advancedMatching?: object, options?: InitOptions) => void;
    pageView: () => void;
    track: (event: string, data?: Options) => void;
    trackCustom: (event: string, data?: Options) => void;
    trackSingle: (pixelId: string, event: string, data?: Options) => void;
    trackSingleCustom: (pixelId: string, event: string, data?: Options) => void;
  };
  
  export default ReactPixel;
}

// Type definition for Google Analytics
declare interface Window {
  dataLayer: any[];
  gtag: (...args: any[]) => void;
}
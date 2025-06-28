// Import the functions you need from the SDKs you need
import { getAnalytics, logEvent } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCLM1viDYhFnDReGZjdGl-IX3dXEHKWvbg',
  authDomain: 'markdowntolinkedin.firebaseapp.com',
  projectId: 'markdowntolinkedin',
  storageBucket: 'markdowntolinkedin.firebasestorage.app',
  messagingSenderId: '99766459548',
  appId: '1:99766459548:web:0bd2a142ce2e357d4fe159',
  measurementId: 'G-N1EPFJ6M0S',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics and get a reference to the service
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Analytics event functions
export const logCopyToClipboard = (success) => {
  if (analytics) {
    logEvent(analytics, 'copy_to_clipboard', {
      success: success,
      timestamp: new Date().toISOString(),
    });
  }
};

export const logDownloadText = () => {
  if (analytics) {
    logEvent(analytics, 'download_text', {
      timestamp: new Date().toISOString(),
    });
  }
};

export const logEmailToSelf = () => {
  if (analytics) {
    logEvent(analytics, 'email_to_self', {
      timestamp: new Date().toISOString(),
    });
  }
};

export const logGuideOpened = (tab) => {
  if (analytics) {
    logEvent(analytics, 'guide_opened', {
      tab: tab,
      timestamp: new Date().toISOString(),
    });
  }
};

export const logFileDropped = () => {
  if (analytics) {
    logEvent(analytics, 'file_dropped', {
      timestamp: new Date().toISOString(),
    });
  }
};

export const logShareClicked = (platform) => {
  if (analytics) {
    logEvent(analytics, 'share', {
      method: platform,
      content_type: 'tool',
      timestamp: new Date().toISOString(),
    });
  }
};

export const logPageView = () => {
  if (analytics) {
    logEvent(analytics, 'page_view', {
      page_title: 'LinkedIn Markdown Formatter',
      page_location: window.location.href,
      timestamp: new Date().toISOString(),
    });
  }
};

export default app;

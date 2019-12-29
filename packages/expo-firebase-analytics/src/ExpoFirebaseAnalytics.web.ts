// import * as firebase from "firebase/app";
// // side-effect
// import "firebase/analytics";

function getFirebaseModule() {
  try {
    return require('firebase/app');
  } catch ({ message }) {
    throw new Error('Firebase JS SDK is not installed: ' + message);
  }
}
function getAnalyticsModule() {
  try {
    const firebase = getFirebaseModule();
    require('firebase/analytics');
    return firebase.analytics();
  } catch ({ message }) {
    throw new Error('Firebase JS Analytics SDK is not available: ' + message);
  }
}

export default {
  get name(): string {
    return 'ExpoFirebaseAnalytics';
  },
  async initializeAppDangerously(config: { [key: string]: any }): Promise<void> {
    getFirebaseModule().initializeApp(config);
  },
  async deleteApp(config: { [key: string]: any }): Promise<void> {
    getFirebaseModule().deleteApp(config);
  },
  /**
   * https://firebase.google.com/docs/reference/js/firebase.analytics.Analytics#log-event
   */
  async logEvent(name: string, properties?: { [key: string]: any }): Promise<void> {
    getAnalyticsModule().logEvent(name, properties);
  },
  /**
   * https://firebase.google.com/docs/reference/js/firebase.analytics.Analytics#set-analytics-collection-enabled
   */
  async setAnalyticsCollectionEnabled(isEnabled: boolean): Promise<void> {
    getAnalyticsModule().setAnalyticsCollectionEnabled(isEnabled);
  },
  /**
   * https://firebase.google.com/docs/reference/js/firebase.analytics.Analytics#set-current-screen
   */
  async setCurrentScreen(screenName: string, screenClassOverride?: string): Promise<void> {
    getAnalyticsModule().setCurrentScreen(screenName, screenClassOverride);
  },
  /**
   * https://firebase.google.com/docs/reference/js/firebase.analytics.Analytics#set-user-id
   */
  async setUserId(userId: string): Promise<void> {
    getAnalyticsModule().setUserId(userId);
  },
  async setUserProperty(name: string, value?: { [key: string]: any }): Promise<void> {
    getAnalyticsModule().setUserProperties({ [name]: value });
  },
  /**
   * https://firebase.google.com/docs/reference/js/firebase.analytics.Analytics#set-user-properties
   */
  async setUserProperties(properties: { [key: string]: any }): Promise<void> {
    getAnalyticsModule().setUserProperties(properties);
  },
};

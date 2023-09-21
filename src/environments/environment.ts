// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// import { config } from "config";

import { config } from "src/config";

export const environment = {
  production: false,
  url: config.url,
  firebase : {
    apiKey: "AIzaSyAFE3O-zK4rc4qK0-08JB1jQgXN2_UDhHg",
    authDomain: "fir-angular-ee5d0.firebaseapp.com",
    projectId: "fir-angular-ee5d0",
    storageBucket: "fir-angular-ee5d0.appspot.com",
    messagingSenderId: "471199414100",
    appId: "1:471199414100:web:91284ff6cbef21795bbac1"
  },
  client_Id: "191586116226-c887see1958vvusb8q4nqqqtrdtv559o.apps.googleusercontent.com",
  tClient_Id: "LXlIUXZra282VS1uSnFpbDlMQ246MTpjaQ"

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

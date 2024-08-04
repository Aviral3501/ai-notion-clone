import {
    initializeApp,
    getApps,
    App,
    getApp,
    cert,
} from "firebase-admin/app";

import { getFirestore } from "firebase-admin/firestore";

// get the service key - firebase
const serviceKey = require("@/service_key.json");

let app:App;

if(getApps().length===0){
    app = initializeApp({
        credential:cert(serviceKey),
    });
}else{
    app = getApp();
}

// adminDB
const adminDb = getFirestore(app);

export {app as adminApp , adminDb}
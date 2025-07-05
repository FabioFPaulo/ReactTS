// Import the functions you need from the SDKs you need
import firebaseConfig from "@/firebaseConfig.json";
import {
    initializeApp,
    type FirebaseApp,
    type FirebaseOptions,
} from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

export default class Firebase {
    private app: FirebaseApp;
    public fireStore: Firestore;
    public auth: Auth;

    constructor(options: FirebaseOptions) {
        this.app = initializeApp(options);
        this.fireStore = getFirestore(this.app);
        this.auth = getAuth(this.app);
    }

    static instance = new Firebase(firebaseConfig);
}

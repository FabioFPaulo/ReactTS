import Firebase from "@/firebase";
import MyUserProfile from "@/repositories/UserRepository/models/MyUserProfile";
import {
    createUserWithEmailAndPassword,
    sendEmailVerification as fSendEmailVerification,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    type CompleteFn,
    type ErrorFn,
    type NextOrObserver,
    type Unsubscribe,
    type User,
} from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

class FirebaseUserRepository {
    private auth = Firebase.instance.auth;
    private userCollection = collection(
        Firebase.instance.fireStore,
        "users"
    ).withConverter({
        toFirestore(model: MyUserProfile) {
            return model.toFirestore();
        },
        fromFirestore: MyUserProfile.fromoFirestore,
    });

    login(email: string, password: string) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    register(email: string, password: string) {
        return createUserWithEmailAndPassword(this.auth, email, password);
    }

    logout() {
        return this.auth.signOut();
    }

    async getProfile(userId: string) {
        const ref = doc(this.userCollection, userId);

        const document = (await getDoc(ref)).data() ?? null;
        return document;
    }

    onAuthChanged(
        nextOrObserver: NextOrObserver<User>,
        error?: ErrorFn,
        completed?: CompleteFn
    ): Unsubscribe {
        return onAuthStateChanged(this.auth, nextOrObserver, error, completed);
    }

    async sendEmailVerification() {
        const user = this.auth.currentUser;

        if (user) {
            await fSendEmailVerification(user, {
                url: "http://localhost:5173",
            });
            return;
        }

        throw "User doesn't exists";
    }

    async reloadUser() {
        const user = this.auth.currentUser;
        if (user) {
            await user.reload();
            return user.emailVerified;
        }
        throw "User not found";
    }

    async updateProfile(profile: MyUserProfile) {
        const docRef = doc(this.userCollection, profile.id);
        await setDoc(docRef, profile);
    }

    get user() {
        return this.auth.currentUser;
    }
}

export default FirebaseUserRepository;

import Firebase from "@/firebase";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    type CompleteFn,
    type ErrorFn,
    type NextOrObserver,
    type Unsubscribe,
    type User,
} from "firebase/auth";

class FirebaseUserRepository {
    private auth = Firebase.instance.auth;

    login(email: string, password: string) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    logout() {
        return this.auth.signOut;
    }

    onAuthChanged(
        nextOrObserver: NextOrObserver<User>,
        error?: ErrorFn,
        completed?: CompleteFn
    ): Unsubscribe {
        return onAuthStateChanged(this.auth, nextOrObserver, error, completed);
    }
}

export default FirebaseUserRepository;

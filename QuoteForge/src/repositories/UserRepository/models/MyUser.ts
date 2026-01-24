import type { UserCredential } from "firebase/auth";

class MyUser {
    public id: string;
    public email: string;
    public emailVerified: boolean;

    constructor(id: string, email: string, emailVerified: boolean) {
        this.id = id;
        this.email = email;
        this.emailVerified = emailVerified;
    }

    static fromCredential(credential: UserCredential["user"]) {
        return new MyUser(
            credential.uid,
            credential.email!,
            credential.emailVerified
        );
    }
}

export default MyUser;

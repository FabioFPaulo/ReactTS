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

class MyUserProfile {
    public firstName: string;
    public lastName: string;
    public phone: string;
    public birthday: string;

    constructor(
        firstName: string,
        lastName: string,
        phone: string,
        birthday: string
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.birthday = birthday;
    }
}

export default MyUser;

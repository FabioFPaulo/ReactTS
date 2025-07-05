import type {
    QueryDocumentSnapshot,
    SnapshotOptions,
} from "firebase/firestore";

class MyUserProfile {
    public id: string;
    public firstName: string;
    public lastName: string;
    public phone: string;
    public birthday: Date;
    public phoneIso: string;

    constructor(
        id: string,
        firstName: string,
        lastName: string,
        phone: string,
        birthday: Date,
        phoneIso: string
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.birthday = birthday;
        this.phoneIso = phoneIso;
    }

    toFirestore() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            phone: this.phone,
            phoneIso: this.phoneIso,
            birthday: this.birthday,
        };
    }

    static fromoFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ) {
        const data = snapshot.data(options);

        return new MyUserProfile(
            snapshot.id,
            data["firstName"],
            data["lastName"],
            data["phone"],
            data["birthday"],
            data["phoneIso"]
        );
    }
}

export default MyUserProfile;

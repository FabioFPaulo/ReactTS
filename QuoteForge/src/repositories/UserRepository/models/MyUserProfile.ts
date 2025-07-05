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

    constructor(
        id: string,
        firstName: string,
        lastName: string,
        phone: string,
        birthday: Date
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.birthday = birthday;
    }

    toFirestore() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            phone: this.phone,
            birthday: this.birthday,
        };
    }

    static empty = (id: string) =>
        new MyUserProfile(id, "", "", "", new Date());

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
            data["birthday"]
        );
    }
}

export default MyUserProfile;

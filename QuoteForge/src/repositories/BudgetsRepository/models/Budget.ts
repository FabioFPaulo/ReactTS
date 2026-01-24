import type {
    QueryDocumentSnapshot,
    SnapshotOptions,
} from "firebase/firestore";

class Budget {
    public id: string;
    public name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

    toFirestore() {
        return {
            name: this.name,
        };
    }

    static empty = new Budget("", "");

    static fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ) {
        const data = snapshot.data(options);

        return new Budget(snapshot.id, data["name"]);
    }
}

export default Budget;

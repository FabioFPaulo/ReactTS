import {
    type QueryDocumentSnapshot,
    type SnapshotOptions,
} from "firebase/firestore";

class Project {
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

    static empty = new Project("", "");

    static fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ) {
        const data = snapshot.data(options);

        return new Project(snapshot.id, data["name"]);
    }
}

export default Project;

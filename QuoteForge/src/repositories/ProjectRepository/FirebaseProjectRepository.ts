import Firebase from "@/firebase";
import Project from "@/repositories/ProjectRepository/models/Project";
import {
    addDoc,
    collection,
    CollectionReference,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    setDoc,
} from "firebase/firestore";

class FirebaseProjectRepository {
    private projectCollection: CollectionReference<
        Project,
        {
            name: string;
        }
    >;

    constructor(userId: string) {
        this.projectCollection = collection(
            Firebase.instance.fireStore,
            "users/" + userId + "/projects"
        ).withConverter({
            toFirestore(model: Project) {
                return model.toFirestore();
            },
            fromFirestore: Project.fromFirestore,
        });
    }

    async getAll() {
        const response = await getDocs(this.projectCollection);
        const projects = response.docs.map((e) => e.data());
        return projects;
    }

    async add(data: Project) {
        await addDoc(this.projectCollection, data);
    }

    async update(data: Project) {
        const docRef = doc(this.projectCollection, data.id);
        await setDoc(docRef, data);
    }

    async remove(id: string) {
        const docRef = doc(this.projectCollection, id);
        await deleteDoc(docRef);
    }

    async get(id: string) {
        const docRef = doc(this.projectCollection, id);
        const project = (await getDoc(docRef)).data();

        if (project) {
            return project;
        }

        throw Error("Project not found");
    }
}

export default FirebaseProjectRepository;

import Firebase from "@/firebase";
import Budget from "@/repositories/BudgetsRepository/models/Budget";
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

class FirebaseBudgetRepository {
    private budgetCollection: CollectionReference<Budget>;

    constructor(userId: string, projectId: string) {
        this.budgetCollection = collection(
            Firebase.instance.fireStore,
            `users/${userId}/projects/${projectId}/budgets`
        ).withConverter({
            toFirestore(model: Budget) {
                return model.toFirestore();
            },
            fromFirestore: Budget.fromFirestore,
        });
    }

    async getAll() {
        const response = await getDocs(this.budgetCollection);
        const budgets = response.docs.map((e) => e.data());
        return budgets;
    }

    async add(data: Budget) {
        await addDoc(this.budgetCollection, data);
    }

    async update(data: Budget) {
        const docRef = doc(this.budgetCollection, data.id);
        await setDoc(docRef, data);
    }

    async remove(id: string) {
        const docRef = doc(this.budgetCollection, id);
        await deleteDoc(docRef);
    }

    async get(id: string) {
        const docRef = doc(this.budgetCollection, id);
        const budget = (await getDoc(docRef)).data();

        if (budget) {
            return budget;
        }

        throw Error("Budget not found");
    }
}

export default FirebaseBudgetRepository;

import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

const config = {
    apiKey: process.env.REACT_APP_FIRE_API_KEY,
    authDomain: process.env.REACT_APP_FIRE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIRE_DB_URL,
    projectId: process.env.REACT_APP_FIRE_PRJ_ID,
    storageBucket: "",
    messagingSenderId: process.env.REACT_APP_FIRE_MSG_SENDER_ID
};

class Firebase {
    private auth;
    private db;
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.firestore();
        this.auth.setPersistence(app.auth.Auth.Persistence.SESSION);
        console.log(this.auth);
        
    }

    login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    logout() {
        console.log("logging out . . .");
        return this.auth.signOut();
    }

    async register(name, email, password) {
        await this.auth.createUserWithEmailAndPassword(email, password);
        return this.auth.currentUser.updateProfile({
            displayName: name
        });
    }

    updateHighestScore(doc, highestScore, highestScorer) {
        return this.db
            .collection("games")
            .doc(doc)
            .update({ highestScore, highestScorer });
    }

    isInitialized() {
        return new Promise<boolean>(resolve => {
            this.auth.onAuthStateChanged(resolve);
        });
    }

    getCurrentUsername() {
        console.log(this.auth.currentUser);
        return this.auth.currentUser && this.auth.currentUser.displayName;
    }

    // async getCurrentUserQuote() {
    // 	const quote = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get()
    // 	return quote.get('quote')
    // }
    getOneById(collection: string, _id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db
                .collection(collection)
                .doc(_id)
                .get()
                .then(snapshot => {
                    resolve(snapshot);
                });
        });
    }
    subscribeTo(collection: string, callback: Function) {
        this.db.collection(collection).onSnapshot(function(querySnapshot) {
            const newArr: any = [];
            querySnapshot.forEach(function(doc) {
                const item = doc.data();
                item._id = doc.id;
                newArr.push(item);
            });
            callback(newArr);
        });
    }
    async getAll(collection: string) {
        return await this.db.collection(collection).get();
    }
}

export default new Firebase();

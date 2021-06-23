import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN + '.firebaseapp.com',
    projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET + '.appspot.com',
    messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore()
const profileCollection = db.collection('profile')
const productCollection = db.collection('addproduct')

export const getUserProducts = async (document) => {
    const products = await productCollection.get(document)
    return products.data()
}

export const createProfile = profile => {
    return profileCollection.add(profile)
}

export const createProduct = product => {
    return profileCollection.doc("0FKptr4acbO1raAH0cFb").collection('created_products').add(product)
}

export const currentUser = () => {
    return firebase.auth().currentUser;
}

export const login = (email, password) => {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
}
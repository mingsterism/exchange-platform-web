import firebase from 'firebase'
import {ref, onUnmounted} from 'vue'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCC7Yie3RZhusyEDS1U4Erp_pD3JTFBU1g",
    authDomain: "exchange-platform-92854.firebaseapp.com",
    projectId: "exchange-platform-92854",
    storageBucket: "exchange-platform-92854.appspot.com",
    messagingSenderId: "32159966574",
    appId: "1:32159966574:web:c85a16e2071999b7f00d7f",
    measurementId: "G-8LCWP241BR"
})

const db = firebaseApp.firestore()
const productCollection = db.collection('product')

export const createProduct = product => {
    return productCollection.add(product)
}

export const getProduct = async id => {
    const product = await productCollection.doc(id).get()
    return product.exists ? product.data() : null
}

export const updateProduct = async id => {
    productCollection.doc(id).update()
}

export const deleteProduct = async id => {
    productCollection.doc(id).delete()
}

export const useLoadProducts = () => {
    const products = ref([])
    const close = productCollection.onSnapshot(snapshot => {
        products.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc,data() }))
    })
    onUnmounted(close)
    return products
}

// import firebaseConfig from '/@/main.js'
require('dotenv').config()
const firebase = require('firebase')

const firebaseConfig = ({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
})

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore()
const profileCollection = db.collection('profile')
const productCollection = db.collection('addproduct')

const getUserProducts = async (document) => {
    const products = await productCollection.get(document)
    return products.data()
}

const createProfile = profile => {
    return profileCollection.add(profile)
}

const createProduct = product => {
    return profileCollection.doc("0FKptr4acbO1raAH0cFb").collection('created_products').add(product)
}

module.exports = {
    createProduct, createProfile, getUserProducts
}

const main = async () => {
    const productCreated = await createProduct({ name: "test Prodcut" })
    console.log("ADDING")
    console.log(productCreated.id)
    // const products = await getUserProducts("")
    // console.log(products)

}

main()

// export const getProduct = async id => {
//     const product = await productCollection.doc(id).get()
//     return product.exists ? product.data() : null
// }

// export const updateProduct = async id => {
//     productCollection.doc(id).update()
// }

// export const deleteProduct = async id => {
//     productCollection.doc(id).delete()
// }

// export const useLoadProducts = () => {
//     const products = ref([])
//     const close = productCollection.onSnapshot(snapshot => {
//         products.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc,data() }))
//     })
//     onUnmounted(close)
//     return products
// }

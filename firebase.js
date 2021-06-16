import firebaseConfig from '/@/main.js'
import {ref, onUnmounted} from 'vue'

const db = firebaseConfig.firestore()
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

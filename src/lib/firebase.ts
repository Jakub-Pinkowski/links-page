import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyARSNjueh5l-a9W0of42utMvYwcFzaelWc',
    authDomain: 'links-page-41b65.firebaseapp.com',
    projectId: 'links-page-41b65',
    storageBucket: 'links-page-41b65.appspot.com',
    messagingSenderId: '582135528803',
    appId: '1:582135528803:web:e6084f764c4fe676426756',
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore()
export const auth = getAuth()
export const storage = getStorage()

import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDocs, onSnapshot, collection } from 'firebase/firestore'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    getAuth,
    onAuthStateChanged,
    type User,
} from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { writable, type Readable, derived } from 'svelte/store'

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

/**
 * @returns a store with the current firebase user
 */
function userStore() {
    let unsubscribe: () => void

    if (!auth || !globalThis.window) {
        console.warn('Auth is not initialized or not in browser')
        const { subscribe } = writable<User | null>(null)
        return {
            subscribe,
        }
    }

    const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
        unsubscribe = onAuthStateChanged(auth, (user) => {
            set(user)
        })

        return () => unsubscribe()
    })

    return {
        subscribe,
    }
}

export const user = userStore()

/**
 * @param  {string} path document path or reference
 * @returns a store with realtime updates on document data
 */
export function docStore<T>(path: string) {
    let unsubscribe: () => void

    const docRef = doc(db, path)

    const { subscribe } = writable<T | null>(null, (set) => {
        unsubscribe = onSnapshot(docRef, (snapshot) => {
            set((snapshot.data() as T) ?? null)
        })

        return () => unsubscribe()
    })

    return {
        subscribe,
        ref: docRef,
        id: docRef.id,
    }
}

// Sign in with Google
export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    const credential = await signInWithPopup(auth, provider)

    const idToken = await credential.user.getIdToken()

    const res = await fetch('/api/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
    })
}

// Sign out
export async function signOutSSR() {
    const res = await fetch('/api/signin', { method: 'DELETE' })
    await signOut(auth)
}

// Register with email and password
export async function registerWithEmail(email: string, password: string) {
    const credential = await createUserWithEmailAndPassword(auth, email, password)

    const idToken = await credential.user.getIdToken()

    const res = await fetch('/api/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
    })
}

// Sign in with email and password
export async function signInWithEmail(email: string, password: string) {
    const credential = await signInWithEmailAndPassword(auth, email, password)

    const idToken = await credential.user.getIdToken()

    const res = await fetch('/api/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
    })
}

// Get all users from firestore
export async function getUsers() {
    const usersCollection = collection(db, 'users')
    const snapshot = await getDocs(usersCollection)
    return snapshot.docs.map((doc) => doc.data())
}

interface UserData {
    username: string
    bio: string
    photoURL: string
    links: any[]
    published: boolean
}

export const userData: Readable<UserData | null> = derived(user, ($user, set) => {
    if ($user) {
        return docStore<UserData>(`users/${$user.uid}`).subscribe(set)
    } else {
        set(null)
    }
})

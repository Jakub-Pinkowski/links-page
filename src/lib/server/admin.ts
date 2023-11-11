import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { FB_CLIENT_EMAIL, FB_PRIVATE_KEY, FB_PROJECT_ID } from '$env/static/private'
import pkg from 'firebase-admin'

try {
    pkg.initializeApp({
        credential: pkg.credential.cert({
            projectId: FB_PROJECT_ID,
            privateKey: FB_PRIVATE_KEY,
            clientEmail: FB_CLIENT_EMAIL,
        }),
    })
} catch (error: any) {
    if (!/already exists/u.test(error.message)) {
        console.error('Firebase admin initialization error', error.stack)
    }
}

export const adminDB = getFirestore()
export const adminAuth = getAuth()

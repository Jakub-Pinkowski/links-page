import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { FB_CLIENT_EMAIL, FB_PRIVATE_KEY, FB_PROJECT_ID } from '$env/static/private'
import pkg from 'firebase-admin'

// Normalize the private key to handle newline characters
const normalizedPrivateKey = FB_PRIVATE_KEY.replace(/\\n/g, '\n')

try {
    pkg.initializeApp({
        credential: pkg.credential.cert({
            projectId: FB_PROJECT_ID,
            privateKey: normalizedPrivateKey,
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

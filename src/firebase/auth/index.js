import { getAuth } from "firebase-admin/auth"

export function createFirebaseToken(uid) {
    return getAuth().createCustomToken(uid)
}

export function verifyToken(idToken) {
    return getAuth().verifyIdToken(idToken)
}
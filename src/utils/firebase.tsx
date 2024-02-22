import { initializeApp } from 'firebase/app'
import {
  signInWithRedirect,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  getAuth,
  User,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
} from 'firebase/firestore'
import { FirebaseError } from 'firebase/app'
import { collectionObject } from './types'

const firebaseConfig = {
  apiKey: 'AIzaSyDhJdziC30lVjUTFWWCJJA39UQsg9ci6a4',
  authDomain: 'buymybooks-42497.firebaseapp.com',
  projectId: 'buymybooks-42497',
  storageBucket: 'buymybooks-42497.appspot.com',
  messagingSenderId: '542330931946',
  appId: '1:542330931946:web:06cdfa79d74294fa8ce593',
}

// Initialize Firebase
export const firebaseapp = initializeApp(firebaseConfig)
export const auth = getAuth()

// define google auth provider. signInWithRedirect is being used here for google
const provider = new GoogleAuthProvider()
// asks for selecting one of the available google accounts.
provider.setCustomParameters({
  prompt: 'select_account',
})
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)

// createUserWithEmailAndPassword takes email and password. It returns user object among other things. error occurs if same email is used with other provider (need to investigate this.)
export const signUpWithEmailPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return
  try {
    return await createUserWithEmailAndPassword(auth, email, password)
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      return { status: 401, message: error.code }
    }
  }
}

// signInWithEmailAndPassword takes email and password. It does not return user object.
// Hence custom messages are being returned.
export const loginWithEmailPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return
  try {
    await signInWithEmailAndPassword(auth, email, password)
    return { status: 200, message: 'login successful' }
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      return { status: 401, message: error.code }
    }
  }
}

// update users collection of Firestore database with the user credentials and name
export const db = getFirestore()

export const userDocUpdtFunc = async (userAuth: User | null, name = {}) => {
  if (userAuth) {
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userDoc = await getDoc(userDocRef)
    if (!userDoc.exists()) {
      const { displayName, email } = userAuth
      const createdAt = new Date()
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...name,
      })
    }
  }
}

export const addCollectionToFireStore = async (
  collectionKey: string,
  objectsToAdd: collectionObject[]
) => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)
  objectsToAdd.forEach((object: collectionObject) => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
  })
  await batch.commit()
  console.log('batch update completed')
}

export const getDocumentItems = async (
  collectionName: string,
  documentName: string
) => {
  const docRef = doc(db, collectionName, documentName)
  const booksDoc = await getDoc(docRef)

  if (booksDoc.exists()) {
    return { status: 201, items: booksDoc.data().items }
  } else {
    return { status: 404, items: [] }
  }
}

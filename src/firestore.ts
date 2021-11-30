import * as admin from "firebase-admin";

admin.initializeApp();
export const firestore = admin.firestore();

export const classesCollection = admin.firestore().collection("classes");
export const bookingsCollection = admin.firestore().collection("bookings");
export const messagesCollection = admin.firestore().collection("messages");
export const usersCollection = admin.firestore().collection("users");

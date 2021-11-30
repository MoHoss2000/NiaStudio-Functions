import * as functions from "firebase-functions";
// import * as express from "express";
import { firestore, classesCollection, usersCollection } from "./firestore";

//Firestore
import "./firestore";

// const app = express();

// const deleteGameInvites = async (gameID: string) => {
//   // const gameInvites = await invitesCollection.where("game.id", "==", gameID).get();

//   // const batch = firestore.batch();

//   // gameInvites.forEach((doc) => {
//   //   batch.delete(doc.ref);
//   // });

//   // await batch.commit();
// };

const updateInstructorClasses = async (userID: string) => {
  const classes =  await classesCollection.where('instructor.uid', '==', userID).get()
  const batch = firestore.batch();

  const newUserDoc = (await usersCollection.doc(userID).get()).data();

  classes.forEach((doc) => {
    batch.update(doc.ref, {'instructor': newUserDoc})
  });

  await batch.commit();
}

const onUserUpdate = functions.firestore.document("users/{userID}").onUpdate(async (snapshot, context) => {
  var userID = context.params.userID;

  const userType = await snapshot.before.get('userType');
  functions.logger.log(`USER CHANGED ${userID}`);

  if(userType == "UserType.INSTRUCTOR"){
    await updateInstructorClasses(userID);
  }

});


//The express app for handling routes
// const api = functions.https.onRequest(app);

export {  onUserUpdate, updateInstructorClasses};

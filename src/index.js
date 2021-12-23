// we copy all this code from our project we create on firebase
import { initializeApp } from "firebase/app";
// firestore imports
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  updateDoc,
} from "firebase/firestore";
// authentication imports
import {
  getAuth,
  createUserWithEmailAndPassword, // for sign up new user
  signOut, // logout the user
  signInWithEmailAndPassword, // login/sign in existing user
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfsB1iA2eDkF5f4FevJ5_9ky7brHen0Rs",
  authDomain: "learning-firebase-9-d9b7d.firebaseapp.com",
  projectId: "learning-firebase-9-d9b7d",
  storageBucket: "learning-firebase-9-d9b7d.appspot.com",
  messagingSenderId: "584247149017",
  appId: "1:584247149017:web:710d75117dc8e8eb1c19c8",
};
// Initialize Firebase app
initializeApp(firebaseConfig);
// initialize services
// --------- this is for our data base
const db = getFirestore();
// --------- this is for authentication
const auth = getAuth();

// collection refrence
const collRef = collection(db, "Students");

// --------------------**************** get collection data *************-------------

// we use getDocs function which return a promise and it wait for a page refresh then update a snapshot

//getDocs(collRef)
//  .then((snapshot) => {
// console.log(snapshot.docs);
/*
  snapshot.docs.forEach((doc) => {
    console.log(doc.id, doc.data());
  });
  */
//---------------- OR if we want this response in an array

//    let std = [];
//    snapshot.docs.forEach((doc) => {
//      std.push({ id: doc.id, ...doc.data() }); // ... use for accessing all the properties
//    });
//    console.log(std);
//  })
//  .catch((err) => {
//    console.log(err.message);
//  });

// --------------------**************** add document *************-------------
// we use addDoc function which return a promise
// ````````````` add document on clicking add button```````
const addDocumentForm = document.querySelector(".add");
addDocumentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addDoc(collRef, {
    name: addDocumentForm.name.value,
    location: addDocumentForm.location.value,
    age: Number(addDocumentForm.age.value),
  }).then(() => {
    addDocumentForm.reset();
    console.log("Document added successfully !");
  });
});
// --------------------**************** delete document *************-------------
// we use deleteDoc and doc function
// doc(db,collection Name,id Of document) in this function we gave a refrence of a document which we want to delete from our db
// ````````````` delete document on clicking delete button```````
const deleteDocumentForm = document.querySelector(".delete");
deleteDocumentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const docRef = doc(db, "Students", deleteDocumentForm.docId.value);
  deleteDoc(docRef).then(() => {
    deleteDocumentForm.reset();
    console.log("Document deleted Successfully !");
  });
});
// --------------------**************** update document *************-------------
// we use updateDoc and doc function
// doc(db,collection Name,id Of document) in this function we gave a refrence of a document which we want to update in your db
// ````````````` update document on clicking update button```````
const updateDocumentForm = document.querySelector(".update");
updateDocumentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const updateDocRef = doc(db, "Students", updateDocumentForm.docId.value);
  updateDoc(updateDocRef, {
    age: 15,
  }).then(() => {
    updateDocumentForm.reset();
    console.log("Document updated Successfully !");
  });
});

// ----******************* get real time collection data***********--------------
// we use onSnapshot function to get collection data in real time..... basically every time it create a new snapshot in firebase and send it to our console in real time if we add or delete any document
/*
onSnapshot(collRef, (snapshot) => {
  let stdData = [];
  snapshot.docs.forEach((doc) => {
    stdData.push({ id: doc.id, ...doc.data() });
  });
  console.log(stdData);
});
*/
// --------***************** use of query in fetching collection data ************--------------
// we import two functions query() and where(). syntax is:- query(collection refrence , where("key","relational operator", "value"))
/*
const q = query(collRef, where("age", "==", 28));
onSnapshot(q, (snapshot) => {
  let condArray = [];
  snapshot.docs.forEach((doc) => {
    condArray.push({ id: doc.id, ...doc.data() });
  });
  console.log(condArray);
});
*/
// **********------------- sort data ascending or descending w.r.t any key value via orderBy() function----**************
const q = query(collRef, where("age", "==", 28), orderBy("name", "desc"));
onSnapshot(q, (snapshot) => {
  let condArray = [];
  snapshot.docs.forEach((doc) => {
    condArray.push({ id: doc.id, ...doc.data() });
  });
  console.log(condArray);
});

// -----------------******* Firebase Authentication *************--------------
// sign up new user(its means after signing up you considered logeed in )
// already signed up user cant sign up again , now he will go for login
const signUpForm = document.querySelector(".signUp");
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const signupEmail = signUpForm.email.value;
  const signupPassword = signUpForm.password.value; // here password should be atlesst 6 digits otherwise by default firebase through an error
  createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
    .then((cred) => {
      signUpForm.reset();
      console.log("User created:- ", cred.user);
    })
    .catch((err) => {
      console.log(err.message);
    });
});
//  logout user
const loggedOutBtn = document.querySelector(".btn");
loggedOutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("User is logged out");
    })
    .catch((err) => {
      console.log(err.message);
    });
});
// login the existing user after sign up
const loginForm = document.querySelector(".login");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const loginEmail = loginForm.email.value;
  const loginPassword = loginForm.password.value;
  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then((cred) => {
      loginForm.reset();
      console.log("The user is signed in", cred.user);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

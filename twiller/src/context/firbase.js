
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8VDqZ7wrlMmVM31HSNlxHigHn56myZ-4",
  authDomain: "twitter-6be12.firebaseapp.com",
  projectId: "twitter-6be12",
  storageBucket: "twitter-6be12.firebasestorage.app",
  messagingSenderId: "313323023496",
  appId: "1:313323023496:web:4e662f9163771e9304033d",
  measurementId: "G-9P0RQG3P8Q"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export default app
// const analytics = getAnalytics(app);

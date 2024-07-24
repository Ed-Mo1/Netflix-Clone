import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/cordova";

const firebaseConfig = {
  apiKey: "AIzaSyChzYppJYKyj_Cr6UDBzIt_WFMNL3iiEIg",
  authDomain: "netflix-clone-e255c.firebaseapp.com",
  projectId: "netflix-clone-e255c",
  storageBucket: "netflix-clone-e255c.appspot.com",
  messagingSenderId: "457231734454",
  appId: "1:457231734454:web:932743c016d2463601f817",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };

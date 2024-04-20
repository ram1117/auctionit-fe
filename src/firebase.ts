'use client'

import { initializeApp } from 'firebase/app'

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyAuSHX2HGtiAeKNW54lJBjMXf4R2YHnur0',
  authDomain: 'auctionit-19fc4.firebaseapp.com',
  projectId: 'auctionit-19fc4',
  storageBucket: 'auctionit-19fc4.appspot.com',
  messagingSenderId: '220656588174',
  appId: '1:220656588174:web:dbddf04b0e49024abc00df',
  measurementId: 'G-XWMMH6X1CG',
}

const firebaseApp = initializeApp(FIREBASE_CONFIG)
export default firebaseApp

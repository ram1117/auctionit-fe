importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js')

const firebaseConfig = {
  apiKey: 'AIzaSyAuSHX2HGtiAeKNW54lJBjMXf4R2YHnur0',
  authDomain: 'auctionit-19fc4.firebaseapp.com',
  projectId: 'auctionit-19fc4',
  storageBucket: 'auctionit-19fc4.appspot.com',
  messagingSenderId: '220656588174',
  appId: '1:220656588174:web:dbddf04b0e49024abc00df',
}

firebase.initializeApp(firebaseConfig)
let messaging
try {
  messaging = firebase.messaging.isSupported() ? firebase.messaging() : null
} catch (err) {
  console.error('Failed to initialize Firebase Messaging', err)
}

if (messaging) {
  try {
    messaging.onBackgroundMessage(messaging, (payload) => {
      console.log(payload)
      const notificationTitle = payload.notification.title
      const notificationOptions = {
        body: payload.notification.body,
        // tag: notificationTitle,
        // icon: payload.notification?.image || data.image,
        // data: {
        //   url: payload?.data?.openUrl,
        // },
      }

      return self.registration.showNotification(
        notificationTitle,
        notificationOptions
      )
    })
  } catch (err) {
    console.log(err)
  }
}

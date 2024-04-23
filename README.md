# AuctionIt

## Description

**AuctionIt** is a NextJS14 auction/bidding web application. Users can check for live auction items and place bids. Admin users can perform CRUD operations on items and auctions. Application uses WebSocketIO to display top bid for each auction real time. The users will be able to receive push notifications when they follow an auction with Firebase FCM. Images are uploaded to Supabase image bucket and image link is sent to back-end and saved.

Tech stack - Typescript, TailwindCSS

### Live Demo

[Live Demo on Vercel](https://auctionit-fe.vercel.app/)

## Getting Started

### Dependencies

- Need NPM to install the packages needed for the project
- Need Git and Github account to setup and contribute to the project

### Installing

- Clone the repo in your local machine.

  ```
  https://github.com/ram1117/auctionit-fe.git
  ```

- Run the following command to install the project dependencies using npm
  ```
  cd auctionit-fe
  ```
  ```
  npm install
  ```

### Environment Variables

Create a `.env.local` file at the root of the project and add the following environment variables

```
EXT_PUBLIC_API_BASE_URL="< YOUR BACKEND_SERVER_URL>"
NEXT_PUBLIC_SOCKET_URL="< YOUR BACKEND_SOCKET_URL>"

VAPID_KEY="< YOUR FIREBASE_VAPID_KEY>"

NEXT_PUBLIC_FIREBASE_API_KEY="< YOUR FIREBASE_API_KEY>"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="< YOUR FIREBASE_AUTH_DOMAIN>"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="< YOUR FIREBASE_PROJECT_ID>"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="< YOUR FIREBASE_STORAGE_BUCKET>"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="< YOUR FIREBASE_SENDER_ID>"
NEXT_PUBLIC_FIREBASE_APP_ID="< YOUR FIREBASE_APP_ID>"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="< YOUR <FIREBASE_MEASUREMENT_ID>"

SUPABASE_STORAGE_URL="< YOUR SUPABASE_STORAGE_URL>"
SUPABASE_SERVICE_KEY="< YOUR SUPABASE_SERVICE_KEY>"
```

### Executing program

- Run the following command to start the NextJS Dev server

  ```
  npm run dev
  ```

## Help

Please raise a Github issue for errors or bugs.

```
https://github.com/ram1117/auctionit-fe/issues
```

## Authors

### Ram Kumar Karuppusamy

[@ram1117](https://github.com/ram1117) <br />
[ram kumar karuppusamy](https://www.linkedin.com/in/ram-kumar-karuppusamy/)

## Version History

- 0.1
  - Initial Release

## License

This project is [MIT](./LICENSE) licensed. See the LICENSE.md file for details

## Acknowledgments

N/A

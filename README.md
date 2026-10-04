# alanChat

alanChat is a real-time chat application built with Next.js and Firebase. Users sign in with Google, join a shared chatroom, and send messages that are persisted in Firestore and updated live for all connected clients.

## Features

- Google sign-in with Firebase Authentication
- Real-time messaging powered by Firestore listeners
- Simple chat UI built with Next.js and React
- Message metadata including user name, avatar, and timestamp
- Responsive client-side app experience

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Firebase Authentication
- Firestore
- Tailwind CSS

## Project Structure

```text
alanChat/
├── README.md
└── alan-chat/
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    │   ├── ChatMessage.tsx
    │   ├── Chatroom.tsx
    │   ├── SignIn.tsx
    │   └── SignOut.tsx
    ├── lib/
    │   └── firebase.ts
    ├── .env.local
    ├── package.json
    └── tsconfig.json
```

## Prerequisites

Before you run the app, make sure you have:

- Node.js 18 or later
- npm
- A Firebase project with Authentication and Firestore enabled

## Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Google sign-in under Authentication > Sign-in method
3. Create a Firestore database
4. Add a web app to your Firebase project
5. Copy your Firebase configuration values

Create a `.env.local` file inside the `alan-chat` directory with the following variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Installation

From the `alan-chat` directory, install dependencies:

```bash
npm install
```

## Running the App

Start the development server:

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

## Production Build

```bash
npm run build
npm run start
```

## Notes

- Messages are written to the Firestore collection named `messages`.
- The app uses the Firestore `createdAt` field to order messages chronologically.
- If your Firebase rules are locked down, make sure they allow authenticated users to read and write chat messages.

## License

This project is for educational/demo purposes and is not currently configured with a formal license.


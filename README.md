# Firebase Competence Night

## [Demo](https://fir-competence-night.web.app/)

## Steps

###  Create and configure the project on the Firebase website

### Add firebase project details to 'src/configs/firebase.js'
```
const config = {
  apiKey: 'XXXXXXXXXXXXXX',
  authDomain: 'XXXXXXXXXXXXXX.firebaseapp.com',
  databaseURL: 'XXXXXXXXXXXXXX.firebaseio.com',
  projectId: 'XXXXXXXXXXXXXX',
  storageBucket: 'gs://XXXXXXXXXXXXXX.appspot.com/'
};
```

### [Install firebase-cli](https://firebase.google.com/docs/cli)

### Bootstrap the app

 `yarn`

### Configure Firebase in your editor

`
firebase login
`

`
firebase init
`

### Run the app

 `yarn start`

### Complete the FIXME comments in the code

### Deploy to Firebase

`yarn build`

`firebase deploy`

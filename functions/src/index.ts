import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';
import * as firebaseHelper from 'firebase-functions-helper';
import * as express from 'express';
import * as bodyParser from "body-parser";

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

const app = express();
const main = express();

const usersCollection = 'users';

main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

// webApi is your functions name, and you will pass main as 
// a parameter
export const webApi = functions.https.onRequest(main);

// Add new user
app.post('/users/:userId', (req, res) => {
    firebaseHelper.firestore
        .createDocumentWithID(db, usersCollection, req.params.userId, req.body);
    res.send('Create a new user');
})

// Update new user
app.patch('/users/:userId', (req, res) => {
    firebaseHelper.firestore
        .updateDocument(db, usersCollection, req.params.userId, req.body);
    res.send('Update a new user');
})

// View a user
app.get('/users/:userId', (req, res) => {
    firebaseHelper.firestore
        .getDocument(db, usersCollection, req.params.userId)
        .then(doc => res.status(200).send(doc));
})

// View all users
app.get('/users', (req, res) => {
    firebaseHelper.firestore
        .backup(db, usersCollection)
        .then(data => res.status(200).send(data))
})

// Delete a user 
app.delete('/users/:userId', (req, res) => {
    firebaseHelper.firestore
        .deleteDocument(db, usersCollection, req.params.userId);
    res.send('Document deleted');
})
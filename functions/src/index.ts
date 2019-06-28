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
const patientCollection = 'patient';
const profesionalCollection = 'profesional';
const organizationCollection = 'organization';


main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

// webApi is your functions name, and you will pass main as 
// a parameter
export const webApi = functions.https.onRequest(main);

// API USERS

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

// API PATIENTS

// Add new patient
app.post('/patient/:patientId', (req, res) => {
    firebaseHelper.firestore
        .createDocumentWithID(db, patientCollection, req.params.patientId, req.body);
    res.send('1');
})

app.post('/patient_history/:patientId', (req, res) => {
    firebaseHelper.firestore
        .addSubCollection(db, req.params.patientId, req.body, patientCollection, 'historial');
    res.send('1');
})


//addSubCollection(db: any, key: string, subData: Object, collectionName: string, subCollection: string)

// View a patient
app.get('/patient/:patientId', (req, res) => {
    firebaseHelper.firestore
        .getDocument(db, patientCollection, req.params.patientId)
        .then(doc => res.status(200).send(doc));
})

// View all patient
app.get('/patient', (req, res) => {
    firebaseHelper.firestore
        .backup(db, patientCollection)
        .then(data => res.status(200).send(data))
})

// View all patient
app.get('/patient_history', (req, res) => {
    firebaseHelper.firestore
        .backup(db, patientCollection, 'historial')
        .then(data => res.status(200).send(data))
})

// View all patient
app.get('/patient_range_of_motion', (req, res) => {
    firebaseHelper.firestore
        .backup(db, patientCollection, 'range_of_motion')
        .then(data => res.status(200).send(data))
})

// API PROFESIONAL

// Add new profesional
app.post('/profesional/:profesionalId', (req, res) => {
    firebaseHelper.firestore
        .createDocumentWithID(db, profesionalCollection, req.params.profesionalId, req.body);
    res.send('1');
})

// View a profesional
app.get('/profesional/:profesionalId', (req, res) => {
    firebaseHelper.firestore
        .getDocument(db, profesionalCollection, req.params.profesionalId)
        .then(doc => res.status(200).send(doc));
})

// View all profesional
app.get('/profesional', (req, res) => {
    firebaseHelper.firestore
        .backup(db, profesionalCollection)
        .then(data => res.status(200).send(data))
})

// API ORGANIZATION

// Add new organization
app.post('/organization/:organizationId', (req, res) => {
    firebaseHelper.firestore
        .createDocumentWithID(db, organizationCollection, req.params.organizationId, req.body);
    res.send('1');
})

// View a organization
app.get('/organization/:organizationId', (req, res) => {
    firebaseHelper.firestore
        .getDocument(db, organizationCollection, req.params.organizationId)
        .then(doc => res.status(200).send(doc));
})

// View all organization
app.get('/organization', (req, res) => {
    firebaseHelper.firestore
        .backup(db, organizationCollection)
        .then(data => res.status(200).send(data))
})
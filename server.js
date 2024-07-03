'use strict';
const express     = require('express');
const bodyParser  = require('body-parser');
const bcrypt      = require('bcrypt');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
const app         = express();
fccTesting(app);
const saltRounds = 12;
const myPlaintextPassword = 'sUperpassw0rd!';
const someOtherPlaintextPassword = 'pass123';

//START_ASYNC -do not remove notes, place code between correct pair of notes.
bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
    if (err) {
        console.error("Error hashing password:", err);
    } else {
        console.log("Async Hashed Password:", hash);
        // Normally you would save `hash` to your database here
        bcrypt.compare(myPlaintextPassword, hash, (err, res) => {
            if (err) {
                console.error("Error comparing passwords:", err);
            } else {
                console.log("Async Compare Result:", res); // Should print true
            }
        });
    }
});
//END_ASYNC

//START_SYNC
const hashSync = bcrypt.hashSync(myPlaintextPassword, saltRounds);
console.log("Sync Hashed Password:", hashSync);

const resultSync = bcrypt.compareSync(myPlaintextPassword, hashSync);
console.log("Sync Compare Result:", resultSync); // Should print true

const resultOtherSync = bcrypt.compareSync(someOtherPlaintextPassword, hashSync);
console.log("Sync Compare Result (Different Password):", resultOtherSync); // Should print false
//END_SYNC

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening on port:", PORT)
});

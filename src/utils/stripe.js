import * as express from 'express'
import * as stripe from 'stripe'
import * as bodyParser from 'body-parser'

stripe(import.meta.env.VITE_APP_SPRITE_SECRET_KEY)


const app = express();

app.post('/webhook', express.json({type: 'application/json'}), (req, res) => {
    const payload = req.body;

    console.log("Got payload: " + payload)

    res.status(200);
})

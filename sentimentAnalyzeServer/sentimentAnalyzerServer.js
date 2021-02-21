const express = require('express');
const app = new express();

const dotenv = require('dotenv');
dotenv.config();

const getNLUInstance = () => {
    const apiKey = process.env.API_KEY;
    const apiUrl = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2020-08-01',
    authenticator: new IamAuthenticator({
        apikey: apiKey,
    }),
    serviceUrl: apiUrl,
    });

    return naturalLanguageUnderstanding;
};

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

const understandLanguage = (analyzeParams, res) => {
    const nluInstance = getNLUInstance();
    nluInstance.analyze(analyzeParams)
    .then(analysisResults => {
        console.log(JSON.stringify(analysisResults, null, 2));
        res.send(analysisResults);
    })
    .catch(err => {
        console.log('error:', err);
        res.status(404).send(err);
    });
}

app.get("/url/emotion", (req,res) => {
    const url = req.query.url;
    const analyzeParams = {
        'url': url,
        'features': {
            'emotion': {
                'document': true
            }
        }
    };
    understandLanguage(analyzeParams, res);
});

app.get("/url/sentiment", (req,res) => {
    const url = req.query.url;
    const analyzeParams = {
        'url': url,
        'features': {
            'sentiment': {
                'document': true
            }
        }
    };
    understandLanguage(analyzeParams, res);
});

app.get("/text/emotion", (req,res) => {
    const text = req.query.text;
    const analyzeParams = {
        'text': text,
        'features': {
            'emotion': {
                'document': true
            }
        }
    };
    understandLanguage(analyzeParams, res);
});

app.get("/text/sentiment", (req,res) => {
    const text = req.query.text;
    const analyzeParams = {
        'text': text,
        'features': {
            'sentiment': {
                'document': true
            }
        }
    };
    understandLanguage(analyzeParams, res);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
});


"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

function pickRandom(messages) {
  const temp = Math.floor(Math.random() * messages.length);
  return temp;
}

const rhymes = [
  {
      "text" : "twinkle twinkle little star",
      "oggUrl" : "https://firebasestorage.googleapis.com/v0/b/test-audio-b2355.appspot.com/o/twinkle.ogg?alt=media&amp;token=0b292126-b2b6-416f-8f17-f3f111af9fac",
  },
];

const numbers = [
  {
      "text" : "revese countdown",
      "oggUrl" : "https://firebasestorage.googleapis.com/v0/b/test-audio-b2355.appspot.com/o/302301554324840.ogg?alt=media&amp;token=b27592e5-029e-468b-b456-4cf836aabfde",
  },
];

restService.post("/test", function(req, res) {
  var speech =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.echoText
      ? req.body.queryResult.parameters.echoText
      : "Seems like some problem. Speak again.";
  return res.json({
    fulfillmentText: speech,
    fulfillmentMessages: [
      {
        text: {
          text: [speech]
        }
      }
    ],
    source: "test-assistant"
  });
});

restService.post("/audio", function(req, res) {
  var speech = "";
  var r = "0";
  switch (req.body.queryResult.parameters.AudioSample.toLowerCase()) {
    case "rhyme":
      r = pickRandom(rhymes);
      speech = `<speak><audio src="${rhymes[r].oggUrl}">${rhymes[r].text}</audio></speak>`;
      break;
    case "numbers":
      r = pickRandom(numbers);
      speech = `<speak><audio src="${numbers[r].oggUrl}">${numbers[r].text}</audio></speak>`;
      //speech =<speak><s><audio src="${msg.oggUrl}">did not get your audio file</audio></s>${msg.text}</speak>';
      break;
  }
  return res.json({
    fulfillmentText: speech,
    fulfillmentMessages: [
      {
        text: {
          text: [speech]
        }
      }
    ],
    source: "test-assistant"
  });
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});

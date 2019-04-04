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
  return messages[Math.floor(Math.random() * messages.length)];
}

const rhymes = {
  {
      text: "twinkle twinkle little star",
      speech:'<speak><audio  clipBegin="18s" clipEnd="133s" src="https://firebasestorage.googleapis.com/v0/b/test-audio-b2355.appspot.com/o/650371554320612.ogg?alt=media&amp;token=6a1153a6-e459-4c99-b1c2-d72bda3bfbc8">did not get your audio file</audio></speak>',
  },
};

const numbers = {
  {
      text: "reverse countdown",
      speech:'<speak><audio src="https://firebasestorage.googleapis.com/v0/b/test-audio-b2355.appspot.com/o/302301554324840.ogg?alt=media&amp;token=b27592e5-029e-468b-b456-4cf836aabfde">did not get your audio file</audio></speak>'
  },

};

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
  switch (req.body.queryResult.parameters.AudioSample.toLowerCase()) {
    case "rhyme":
    //const msg = pickRandom(rhymes);
      speech = rhymes.speech;
      break;
    case "numbers":
    //const msg = pickRandom(numbers);
      speech = numbers.speech;
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

'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = 'amzn1.ask.skill.ad90035b-17a5-4ccc-b3d7-fd571c6a6676'; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'Liquid Studio';

/**
 * Array containing ET facts.
 */
var FACTS = [
    "The first Liquid Studio was opened in Redwood, United States.",
    "Liquid Studio in the Netherlands is located in Utrecht.",
    "Liquid Studio is the best group in Accenture to do cool stuffs.",
    "Liquid Studio cooperates closely together with the Emerging Technology group within Accenture."
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random ET fact from the ET facts list
        var factIndex = Math.floor(Math.random() * FACTS.length);
        var randomFact = FACTS[factIndex];

        // Create speech output
        var speechOutput = "Here's your fact about Accenture's liquid studio: " + randomFact;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say tell me a fact about Liquid Studio, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};

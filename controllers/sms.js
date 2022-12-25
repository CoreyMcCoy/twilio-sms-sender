const twilio = require('twilio');
const { MessagingResponse } = require('twilio').twiml;
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = twilio(accountSid, authToken);

module.exports.sendSms = async (req, res) => {
    const { phone, text } = req.body;
    console.log(req.body);
    const numbers = phone.split(',');
    try {
        numbers.forEach(async (number) => {
            await client.messages
                .create({
                    to: number,
                    body: text,
                    messagingServiceSid: 'MG39f73e44b9d75e1090be627ca80b4a7b',
                })
                .then((message) => message.sid);
        });
    } catch (error) {
        console.log(error);
    }
    // Pass a text message to the page
    res.status(200).render('show', { text, phone });
};

module.exports.receiveSms = (req, res) => {
    const twiml = new MessagingResponse();

    twiml.message('The Robots are coming! Head for the hills!');

    res.type('text/xml').send(twiml.toString());
};

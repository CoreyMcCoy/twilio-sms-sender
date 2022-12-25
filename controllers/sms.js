const twilio = require('twilio');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
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
                    messagingServiceSid: 'process.env.MESSAGING_SERVICE_SID',
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

    const msg = twiml.message('Gee thanks!');

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
};

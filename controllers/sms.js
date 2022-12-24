const twilio = require('twilio');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = twilio(accountSid, authToken);
client.messaging.v1.services.create({ friendlyName: 'Digital Mavens Messaging Service' }).then((service) => console.log(service.sid));

module.exports.sendSms = async (req, res) => {
    const { phone, text } = req.body;
    const numbers = phone.split(',');
    try {
        numbers.forEach(async (number) => {
            await client.messages
                .create({
                    to: number,
                    body: text,
                    messagingServiceSid: 'MG1fe12a7e943d23674ebee5adc9937f29',
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
    // MG695614de6076c6cfcd0e8d6357d1734e
    const twiml = new MessagingResponse();

    // Add a text message.
    const msg = twiml.message('Gee thanks!');

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
};

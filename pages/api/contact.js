import nodemailer from 'nodemailer';
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const { name, email, message, phone } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
    });

    try {
        const emailRes = await transporter.sendMail({
            from: email,
            to: 'sajibhossain1185@gmail.com',
            subject: `Contact form submission from ${name}`,
            html: `<p>You have a new contact form submission</p><br>
      <p><strong>Name: </strong> ${name} </p><br>
      <p><strong>Phone: </strong> ${phone} </p><br>
      <p><strong>Message: </strong> ${message} </p><br>

      `,
        });

        console.log('Message Sent', emailRes.messageId);
    } catch (err) {
        console.log(err);
    }

    res.status(200).json(req.body);
};
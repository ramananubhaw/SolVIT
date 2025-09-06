const emailConfig = {
    service: "smtp.gmail.com",
    secure: false,
    port: 587,
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
};

export default emailConfig;
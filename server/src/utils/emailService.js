import nodemailer from "nodemailer";
import emailConfig from '../config/emailConfig.js';

// Create transporter using the existing email config
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
    }
});

export const sendResolutionEmail = async (userEmail, complaintDetails) => {
    try {
        // Verify transporter configuration
        await transporter.verify();
        
        const emailBody = `
        Dear Student,

        Your complaint has been resolved by the hostel administration.

        Complaint Details:
        Category: ${complaintDetails.category}
        Description: ${complaintDetails.complaint}
        Block: ${complaintDetails.block}
        Room: ${complaintDetails.room_no}
        
        If you have any further concerns, please feel free to register a new complaint.

        Best regards,
        SolVIT Team
        `;

        const mailOptions = {
            from: `"SolVIT Team" <${process.env.GMAIL_USERNAME}>`,
            to: userEmail,
            subject: 'Your Complaint Has Been Resolved - SolVIT',
            text: emailBody
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Resolution email sent:', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending resolution email:', error);
        throw error;
    }
};
// frontend/components/WhatsAppForm.tsx
'use client';
import { useState, FormEvent } from "react";
import { sendWhatsAppMessage } from "../utils/api";

const WhatsAppForm: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [status, setStatus] = useState<string>("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const result = await sendWhatsAppMessage(phoneNumber, message);
            setStatus(result.status === "Message scheduled successfully" ? "Message scheduled successfully!" : "Failed to send message");
        } catch (error) {
            setStatus("Failed to send message");
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Send WhatsApp Message</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="phone">Phone Number:</label>
                    <input
                        type="tel"
                        id="phone"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+1234567890"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter your message here"
                        required
                    />
                </div>
                <button type="submit">Send Message</button>
            </form>
            {status && <p>Status: {status}</p>}
        </div>
    );
};

export default WhatsAppForm;

export const sendWhatsAppMessage = async (phoneNumber: string, message: string) => {
    try {
        const response = await fetch("/api/sendWhatsapp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ phone_number: phoneNumber, message: message }), // Ensure keys match FastAPI's expected names
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("API Error:", errorData);
            throw new Error(errorData.detail || "Failed to schedule message");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return { status: "error", error: (error as Error).message };
    }
};

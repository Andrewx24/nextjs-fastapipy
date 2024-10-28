// app/page.tsx or pages/index.tsx

import WhatsAppForm from "@/components/WhatsAppForm";

const Home: React.FC = () => {
    return (
        <div>
            <h1>WhatsApp Message Scheduler</h1>
            <WhatsAppForm />
        </div>
    );
};

export default Home;

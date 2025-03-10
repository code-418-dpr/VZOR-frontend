import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function ContactForm() {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = () => {
        const mailtoLink = `mailto:support@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        window.open(mailtoLink, "_self"); // Используем window.open вместо location.href
    };

    return (
        <Card className="mx-4 sm:mx-20 md:mx-30 lg:mx-50 xl:mx-80 mt-10 md:mt-20 mb-15">
            <CardHeader>
                <CardTitle className="text-xl md:text-2xl text-center">Остались вопросы? Напишите нам!</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <Input
                    placeholder="Тема письма"
                    value={subject}
                    onChange={(e) => {
                        setSubject(e.target.value);
                    }}
                />
                <Textarea
                    className="w-full h-48 min-h-24 max-h-280"
                    placeholder="Содержимое письма"
                    rows={4}
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                />
                <Button onClick={handleSubmit} className="w-full">
                    Отправить
                </Button>
            </CardContent>
        </Card>
    );
}

export default ContactForm;

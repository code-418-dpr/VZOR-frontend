import { Send } from "lucide-react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import siteMetadata from "@/conf/site-metadata";

function ContactForm() {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = () => {
        const mailtoLink = `mailto:${siteMetadata.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        window.open(mailtoLink, "_self");
    };

    return (
        <Card className="mx-4 mt-5 mb-15 sm:mx-20 md:mx-30 md:mt-20 lg:mx-50 xl:mx-80">
            <CardHeader>
                <CardTitle className="text-center text-xl md:text-2xl">Остались вопросы? Напишите нам!</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-end gap-4">
                <Input
                    placeholder="Тема письма"
                    value={subject}
                    onChange={(e) => {
                        setSubject(e.target.value);
                    }}
                />
                <Textarea
                    className="h-48 max-h-280 min-h-24 w-full"
                    placeholder="Содержимое письма"
                    rows={4}
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                />
                <Button onClick={handleSubmit} className="w-min">
                    <Send />
                    Отправить
                </Button>
            </CardContent>
        </Card>
    );
}

export default ContactForm;

import { Send } from "lucide-react";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface InputProps {
    user: string;
}

export default function BanReportForm({ user }: InputProps) {
    const [message, setMessage] = useState("");

    return (
        <form className="grid items-start gap-4">
            <div className="grid gap-2">
                <Label className="my-3">Причина блокировки пользователя: {user}</Label>
                <Textarea
                    className="h-48 max-h-280 min-h-24 w-full"
                    placeholder="Причина блокировки"
                    rows={4}
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                />
            </div>
            <Button className="w-min">
                <Send />
                Отправить
            </Button>
        </form>
    );
}

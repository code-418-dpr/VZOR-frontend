"use client";

import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { z } from "zod";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the schema with date that can be undefined initially but required for submission
const formSchema = z.object({
    // Make date optional in the schema but add a refinement to require it for submission
    date: z
        .date()
        .optional()
        .refine((date) => date !== undefined, {
            message: "Пожалуйста, выберите дату",
        }),
    time: z.string().refine((time) => /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time), {
        message: "Время должно быть в формате Часы:Минуты (например, 13:35)",
    }),
});

// Define the form values type based on the Zod schema
type FormValues = z.infer<typeof formSchema>;
export default function DateTimeForm() {
    const today = new Date();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: undefined,
            time: "",
        },
    });

    function onSubmit(values: FormValues) {
        // Since we've refined the schema, we know date is defined at this point
        const date = values.date;
        console.log({ ...values, date });
        alert(`Selected Date: ${format(date, "PPP")}\nSelected Time: ${values.time}`);
    }

    return (
        <div className="max-w-md mx-auto p-3 space-y-2">
            <Form {...form}>
                <form
                    onSubmit={(e) => {
                        void form.handleSubmit(onSubmit)(e);
                    }}
                    className="space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => {
                            const hasSelectedDate = Boolean(field.value);
                            return (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Дата</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !hasSelectedDate && "text-muted-foreground",
                                                    )}
                                                >
                                                    {hasSelectedDate ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Выберите дату</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) => date > today}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />

                    <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Время</FormLabel>
                                <div className="relative">
                                    <FormControl>
                                        <Input
                                            placeholder="13:35"
                                            {...field}
                                            onChange={(e) => {
                                                // Auto-format as user types
                                                let value = e.target.value.replace(/[^0-9:]/g, "");

                                                // Handle automatic colon insertion
                                                if (
                                                    value.length === 2 &&
                                                    !value.includes(":") &&
                                                    !field.value.includes(":")
                                                ) {
                                                    value += ":";
                                                }

                                                // Limit to 5 characters (HH:MM)
                                                if (value.length <= 5) {
                                                    field.onChange(value);
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <Clock className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">
                        Готово
                    </Button>
                </form>
            </Form>
        </div>
    );
}

"use client";

import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { z } from "zod";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    date: z.date({
        required_error: "Please select a date.",
    }),
    time: z.string().refine((time) => /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time), {
        message: "Time must be in format HH:MM (e.g., 13:35)",
    }),
});

export default function DateTimeForm() {
    const today = new Date();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            time: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        alert(`Selected Date: ${format(values.date, "PPP")}\nSelected Time: ${values.time}`);
    }

    return (
        <div className="max-w-md mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">Date & Time Selection</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground",
                                                )}
                                            >
                                                {field.value ? format(field.value, "PPP") : <span>Select a date</span>}
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
                                <FormDescription>Select a date (cannot be in the future)</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Time</FormLabel>
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
                                <FormDescription>Enter time in 24-hour format (e.g., 13:35)</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
}

"use client";

import { CalendarIcon } from "lucide-react";

import * as React from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function DateRangePicker({
    id,
    className,
    value,
    onChange,
}: {
    id: string;
    className?: string;
    value: DateRange | undefined;
    onChange: (newRange: DateRange | undefined) => void;
}) {
    return (
        <div id={id} className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn("justify-start text-left font-normal", !value && "text-muted-foreground")}
                    >
                        <CalendarIcon />
                        {value?.from ? (
                            value.to ? (
                                <>
                                    {value.from.toLocaleDateString()} — {value.to.toLocaleDateString()}
                                </>
                            ) : (
                                value.from.toLocaleDateString()
                            )
                        ) : (
                            <span>Выберите период</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={value?.from}
                        selected={value}
                        onSelect={(newRange) => onChange?.(newRange)}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}

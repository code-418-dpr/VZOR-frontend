"use client";

import { useState } from "react";
import * as React from "react";
import { DateRange } from "react-day-picker";

import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";

export function SearchForm() {
    const router = useRouter();
    const pathname = usePathname();

    const [descriptionToSearch, setDescriptionToSearch] = useState("");
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

    const handleSearch = () => {
        const params = new URLSearchParams();

        if (descriptionToSearch) {
            params.set("description", descriptionToSearch);
        }

        if (dateRange?.from) {
            params.set("dateFrom", dateRange.from.toISOString());
        }
        if (dateRange?.to) {
            params.set("dateTo", dateRange.to.toISOString());
        }

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
            }}
            className="flex flex-row flex-wrap gap-6 px-0.5 py-2 select-none sm:flex-nowrap"
        >
            <Input
                id="description"
                placeholder="Описание"
                className="max-w-5xl"
                value={descriptionToSearch}
                onChange={(e) => {
                    setDescriptionToSearch(e.target.value);
                }}
            />

            <div className="flex flex-wrap items-center gap-2">
                <DateRangePicker
                    id="period"
                    value={dateRange}
                    onChange={(newRange) => {
                        setDateRange(newRange);
                    }}
                />
            </div>

            <Button variant="default" type="submit">
                Поиск
            </Button>
        </form>
    );
}

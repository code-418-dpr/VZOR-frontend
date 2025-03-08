"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { JSX, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function ObjectsCombobox({
    title,
    values,
    setValues,
    hideSearch,
    className,
}: {
    title: string;
    values: Map<string, boolean>;
    setValues: (values: Map<string, boolean>) => void;
    hideSearch?: boolean;
    className?: string;
}): JSX.Element {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const filteredItems = useMemo(() => {
        if (!search) {
            return Array.from(values.keys());
        }

        return Array.from(values.keys()).filter((key) => key.toLowerCase().includes(search.toLowerCase()));
    }, [values, search]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="flex gap-2 pr-2">
                    <span>{title}</span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={cn("w-full p-0", className)}>
                <Command shouldFilter={false}>
                    {!hideSearch && <CommandInput placeholder="Поиск..." value={search} onValueChange={setSearch} />}
                    <CommandList>
                        <CommandEmpty>Ничего не найдено.</CommandEmpty>
                        <CommandGroup>
                            {filteredItems.slice(0, 500).map((key) => (
                                <CommandItem
                                    key={key}
                                    value={key}
                                    onSelect={(currentValue) => {
                                        setValues(new Map(values).set(currentValue, !values.get(currentValue)));
                                    }}
                                    className="pr-4"
                                >
                                    <Check
                                        className={cn("mr-1 h-4 w-4", values.get(key) ? "opacity-100" : "opacity-0")}
                                    />
                                    {key}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

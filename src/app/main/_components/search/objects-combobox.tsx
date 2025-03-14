"use client";

import { Check, ChevronsUpDown, X } from "lucide-react";

import type React from "react";
import { type JSX, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

export function ObjectsCombobox({
    title,
    values,
    setValues,
    hideSearch,
    className,
    disabled,
}: {
    title: string;
    values: Map<string, boolean>;
    setValues: (values: Map<string, boolean>) => void;
    hideSearch?: boolean;
    className?: string;
    disabled?: boolean;
}): JSX.Element {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    // Extract selected items for display
    const selectedItems = useMemo(() => {
        return Array.from(values.entries())
            .filter(([key, isSelected]) => key !== "" && isSelected)
            .map(([key]) => key);
    }, [values]);

    // Handle removing an item
    const handleRemoveItem = (key: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const newValues = new Map(values);
        newValues.set(key, false);
        setValues(newValues);
    };

    const renderSelectedItems = () => {
        return selectedItems.map((key) => (
            <div
                key={key}
                className="bg-secondary text-secondary-foreground flex items-center gap-1 rounded-md px-1 py-0.5 text-xs"
            >
                <span>{key}</span>
                <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                        handleRemoveItem(key, e);
                    }}
                    className="focus:outline-none"
                >
                    <X className="hover:text-destructive h-3 w-3 cursor-pointer" />
                </span>
            </div>
        ));
    };

    const renderTriggerButton = () => (
        <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
                "flex h-auto min-h-10 flex-wrap justify-start gap-1 p-1",
                disabled && "pointer-events-none opacity-50",
            )}
        >
            <div className="mr-auto flex items-center gap-1">
                <span className="text-sm">{title}</span>
                <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </div>
            {renderSelectedItems()}
        </Button>
    );

    if (isDesktop) {
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>{renderTriggerButton()}</PopoverTrigger>
                <PopoverContent className={cn("w-full p-0", className)}>
                    <ObjectList values={values} setValues={setValues} hideSearch={hideSearch} />
                </PopoverContent>
            </Popover>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{renderTriggerButton()}</DrawerTrigger>
            <DrawerContent className={cn("w-full p-0", className)}>
                <ObjectList values={values} setValues={setValues} hideSearch={hideSearch} />
            </DrawerContent>
        </Drawer>
    );
}

function ObjectList({
    values,
    setValues,
    hideSearch,
}: {
    values: Map<string, boolean>;
    setValues: (values: Map<string, boolean>) => void;
    hideSearch?: boolean;
}) {
    const [search, setSearch] = useState("");

    const filteredItems = useMemo(() => {
        if (!search) {
            return Array.from(values.keys());
        }

        return Array.from(values.keys()).filter((key) => key.toLowerCase().includes(search.toLowerCase()));
    }, [values, search]);

    const handleSelect = (currentValue: string) => {
        // Create a completely new Map to ensure re-render
        const newValues = new Map(values);
        newValues.set(currentValue, !newValues.get(currentValue));
        setValues(newValues);
    };

    return (
        <Command shouldFilter={false}>
            {!hideSearch && <CommandInput placeholder="Поиск..." value={search} onValueChange={setSearch} />}
            <CommandList>
                <CommandEmpty>Ничего не найдено.</CommandEmpty>
                <CommandGroup>
                    {filteredItems.slice(0, 500).map((key) => (
                        <CommandItem key={key} value={key} onSelect={handleSelect} className="pr-4">
                            <Check className={cn("mr-1 h-4 w-4", values.get(key) ? "opacity-100" : "opacity-0")} />
                            {key}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    );
}

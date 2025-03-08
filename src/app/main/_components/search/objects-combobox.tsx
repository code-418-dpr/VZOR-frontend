"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/use-media-query";

interface Status {
    value: string;
    label: string;
}

const statuses: Status[] = [
    {
        value: "Дверь",
        label: "Дверь",
    },
    {
        value: "Человек",
        label: "Человек",
    },
    {
        value: "Стакан",
        label: "Стакан",
    },
    {
        value: "Окно",
        label: "Окно",
    },
    {
        value: "Стол",
        label: "Стол",
    },
];

export function ObjectsCombobox() {
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(null);

    if (isDesktop) {
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[150px] justify-start">
                        {selectedStatus ? <>{selectedStatus.label}</> : <>Выбрать объект</>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                    <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
                </PopoverContent>
            </Popover>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" className="w-[150px] justify-start">
                    {selectedStatus ? <>{selectedStatus.label}</> : <>Выбрать объект</>}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mt-4 border-t">
                    <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
                </div>
            </DrawerContent>
        </Drawer>
    );
}

function StatusList({
    setOpen,
    setSelectedStatus,
}: {
    setOpen: (open: boolean) => void;
    setSelectedStatus: (status: Status | null) => void;
}) {
    return (
        <Command>
            <CommandInput placeholder="Найти объект..." />
            <CommandList>
                <CommandEmpty>Объектов не найдено.</CommandEmpty>
                <CommandGroup>
                    {statuses.map((status) => (
                        <CommandItem
                            key={status.value}
                            value={status.value}
                            onSelect={(value) => {
                                setSelectedStatus(statuses.find((priority) => priority.value === value) ?? null);
                                setOpen(false);
                            }}
                        >
                            {status.label}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    );
}

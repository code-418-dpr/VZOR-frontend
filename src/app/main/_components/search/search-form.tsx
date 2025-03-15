"use client";

import { useEffect, useState } from "react";
import * as React from "react";

import { usePathname, useRouter } from "next/navigation";

import { ObjectsCombobox } from "@/app/main/_components/search/objects-combobox";
import { Checkbox } from "@/components/ui/checkbox";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { testObjects } from "../../_data/search/objects";

export function SearchForm() {
    const router = useRouter();
    const pathname = usePathname();

    const [noText, setNoText] = useState(false);
    const [noObjects, setNoObjects] = useState(false);
    const [objectsToSearch, setObjectsToSearch] = useState(
        new Map(testObjects.map((testObject) => [testObject.name, false])),
    );

    const [descriptionToSearch, setDescriptionToSearch] = useState("");
    const [textToSearch, setTextToSearch] = useState("");
    const [dateRange, setDateRange] = useState({ from: null, to: null });

    // Update search params whenever any field changes
    useEffect(() => {
        // Build search params
        const params = new URLSearchParams();

        if (descriptionToSearch) {
            params.set("description", descriptionToSearch);
        }

        if (!noObjects) {
            const selectedObjects = Array.from(objectsToSearch.entries())
                .filter(([_, selected]) => selected)
                .map(([name]) => name);

            if (selectedObjects.length > 0) {
                params.set("objects", selectedObjects.join(","));
            }
        } else {
            params.set("noObjects", "true");
        }

        if (!noText && textToSearch) {
            params.set("text", textToSearch);
        } else if (noText) {
            params.set("noText", "true");
        }

        // Navigate to the same page with search params
        // Use replaceState to avoid adding to browser history on every change
        router.replace(`${pathname}?${params.toString()}`);
    }, [descriptionToSearch, noObjects, objectsToSearch, noText, textToSearch, dateRange, router, pathname]);

    return (
        <form className="flex flex-col gap-6 px-0.5 py-2 select-none">
            <Input
                id="description"
                placeholder="Описание"
                value={descriptionToSearch}
                onChange={(e) => {
                    setDescriptionToSearch(e.target.value);
                }}
            />

            <div className="flex flex-wrap gap-2">
                <div>
                    <ObjectsCombobox
                        title="Объекты"
                        values={objectsToSearch}
                        setValues={setObjectsToSearch}
                        disabled={noObjects}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="no-objects"
                        checked={noObjects}
                        onCheckedChange={() => {
                            setNoObjects(!noObjects);
                        }}
                    />
                    <Label htmlFor="no-objects" className="font-normal">
                        Без объектов
                    </Label>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                <Input disabled={noText} id="painted-text" placeholder="Текст" />

                <div className="flex items-center gap-2">
                    <Checkbox
                        id="no-text"
                        checked={noText}
                        onCheckedChange={() => {
                            setNoText(!noText);
                        }}
                    />
                    <Label htmlFor="no-text" className="font-normal">
                        Без текста
                    </Label>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <Label htmlFor="period" className="font-normal">
                    Период:
                </Label>
                <DateRangePicker id="period" />
            </div>
        </form>
    );
}

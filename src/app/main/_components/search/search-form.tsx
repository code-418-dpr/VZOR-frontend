"use client";

import { useState } from "react";
import * as React from "react";

import DateTimeForm from "@/app/main/_components/search/date-time-form";
import { ObjectsCombobox } from "@/app/main/_components/search/objects-combobox";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { testObjects } from "../../_data/search/objects";

interface Props {
    className?: string;
}

export function SearchForm({ className }: Props) {
    const [noText, setNoText] = useState(false);
    const [noObjects, setNoObjects] = useState(false);
    const [objectsToSearch, setObjectsToSearch] = useState(
        new Map(testObjects.map((testObject) => [testObject.name, false])),
    );

    return (
        <form className={cn("flex flex-col gap-6", className)}>
            <Input id="description" placeholder="Описание" />

            <div className="flex gap-2 flex-wrap">
                <div className={noObjects ? "hidden" : ""}>
                    <ObjectsCombobox title="Объекты" values={objectsToSearch} setValues={setObjectsToSearch} />
                </div>

                <div className="flex items-center space-x-2">
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

            <div className="flex gap-2 flex-wrap">
                <Input disabled={noText} id="painted-text" placeholder="Текст" />

                <div className="flex items-center space-x-2">
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

            <DateTimeForm />
        </form>
    );
}

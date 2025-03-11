"use client";

import { useState } from "react";
import * as React from "react";

import { ObjectsCombobox } from "@/app/main/_components/search/objects-combobox";
import { Checkbox } from "@/components/ui/checkbox";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { testObjects } from "../../_data/search/objects";

export function SearchForm() {
    const [noText, setNoText] = useState(false);
    const [noObjects, setNoObjects] = useState(false);
    const [objectsToSearch, setObjectsToSearch] = useState(
        new Map(testObjects.map((testObject) => [testObject.name, false])),
    );

    return (
        <form className="flex flex-col gap-6 py-1">
            <Input id="description" placeholder="Описание" />

            <div className="flex flex-wrap gap-2">
                <div className={noObjects ? "hidden" : ""}>
                    <ObjectsCombobox title="Объекты" values={objectsToSearch} setValues={setObjectsToSearch} />
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

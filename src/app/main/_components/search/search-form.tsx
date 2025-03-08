"use client";

import { useState } from "react";
import * as React from "react";

import { ObjectsCombobox } from "@/app/main/_components/search/objects-combobox";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SearchForm() {
    const [objectFind, setObjectFind] = useState(false);
    const [textFind, setTextFind] = useState(false);

    return (
        <form>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="general-search">Общий поиск по изображениям</Label>
                    <Input id="general-search" placeholder="Текст" />
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="meta-object">Поиск по объектам на изображении</Label>
                    <div className={objectFind ? "hidden" : ""}>
                        <ObjectsCombobox />
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="is-object-find"
                        checked={objectFind}
                        onCheckedChange={() => {
                            setObjectFind(!objectFind);
                        }}
                    />
                    <label
                        htmlFor="is-object-find"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Объектов не найдено
                    </label>
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="meta-text">Поиск по тексту на изображении</Label>
                    <Input disabled={textFind} id="meta-text" placeholder="Текст" />
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="is-text-find"
                        checked={textFind}
                        onCheckedChange={() => {
                            setTextFind(!textFind);
                        }}
                    />
                    <label
                        htmlFor="is-text-find"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Текст не найден
                    </label>
                </div>
            </div>
        </form>
    );
}

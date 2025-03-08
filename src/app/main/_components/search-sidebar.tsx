import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SearchSidebar() {
    return (
        <Card className="mx-3">
            <CardHeader>
                <CardTitle>Поиск фото</CardTitle>
                <CardDescription>Поиск по фотографиям, которые ранее были обработаны</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="meta-text">Поиск по тексту на изображении</Label>
                            <Input id="meta-text" placeholder="Текст" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Поиск по объектам на изображении</Label>
                            <Input id="meta-object" placeholder="Объект" />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button>Поиск</Button>
            </CardFooter>
        </Card>
    );
}

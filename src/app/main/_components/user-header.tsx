"use client";

import { KeyRound, LogOut, User } from "lucide-react";

import * as React from "react";

import {
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setField: React.Dispatch<React.SetStateAction<string>>;
}

export default function UserHeader({ setOpen, setField }: Props) {
    return (
        <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
                <DropdownMenuLabel>Имя пользователя</DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={() => {
                        setOpen(true);
                        setField("Имя");
                    }}
                >
                    <User />
                    <span>Изменить имя</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => {
                        setOpen(true);
                        setField("Почта");
                    }}
                >
                    <KeyRound />
                    <span>Изменить пароль</span>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    <LogOut />
                    <span>Выход</span>
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    );
}

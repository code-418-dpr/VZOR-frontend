"use client";

import { LogOut, Mail, User } from "lucide-react";

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

export default function AdminHeader({ setOpen, setField }: Props) {
    return (
        <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
                <DropdownMenuLabel>Логин аккаунта</DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={() => {
                        setOpen(true);
                        setField("Логин");
                    }}
                >
                    <User />
                    <span>Изменить логин</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuLabel>Почта аккаунта</DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={() => {
                        setOpen(true);
                        setField("Почта");
                    }}
                >
                    <Mail />
                    <span>Изменить почту</span>
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

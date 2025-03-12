"use client";

import React from "react";

import AdminHeader from "@/app/admin/_components/header/admin-header";
import UsersTab from "@/app/admin/_components/users-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
    return (
        <main className="flex flex-col">
            <AdminHeader />
            <Tabs defaultValue="users" className="mx-5 mt-20">
                <TabsList className="w-full">
                    <TabsTrigger className="w-1/2 md:text-xl" value="statistic">
                        Статистика
                    </TabsTrigger>
                    <TabsTrigger className="w-1/2 md:text-xl" value="users">
                        Пользователи
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="statistic">Make changes to your account here.</TabsContent>
                <TabsContent value="users">
                    <UsersTab />
                </TabsContent>
            </Tabs>
        </main>
    );
}

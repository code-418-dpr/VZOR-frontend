"use client";

import React from "react";

import AdminHeader from "@/app/admin/_components/header/admin-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
    return (
        <main className="flex flex-col">
            <AdminHeader />
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="statistic">Статистика</TabsTrigger>
                    <TabsTrigger value="users">Пользователи</TabsTrigger>
                </TabsList>
                <TabsContent value="account">Make changes to your account here.</TabsContent>
                <TabsContent value="password">Change your password here.</TabsContent>
            </Tabs>
        </main>
    );
}

"use client";

import React from "react";

import StatisticTab from "@/app/admin/_components/statistic-tab";
import UsersTab from "@/app/admin/_components/users-tab";
import Header from "@/components/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
    return (
        <main className="flex flex-col">
            <Header role="admin" />
            <Tabs defaultValue="users" className="mx-5 mt-20 md:mx-50">
                <TabsList className="w-full">
                    <TabsTrigger className="w-1/2 md:text-xl" value="statistic">
                        Статистика
                    </TabsTrigger>
                    <TabsTrigger className="w-1/2 md:text-xl" value="users">
                        Пользователи
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="statistic">
                    <StatisticTab />
                </TabsContent>
                <TabsContent value="users">
                    <UsersTab />
                </TabsContent>
            </Tabs>
        </main>
    );
}

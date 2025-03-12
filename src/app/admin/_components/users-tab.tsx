import { Ban } from "lucide-react";

import { testUsers } from "@/app/admin/_data/users";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function UsersTab() {
    return (
        <Table>
            <TableCaption>Пользователи системы.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Логин</TableHead>
                    <TableHead>Почта</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {testUsers.map((user) => (
                    <TableRow key={user.username}>
                        <TableCell className="font-medium">{user.username}</TableCell>
                        <TableCell className="font-medium">{user.email}</TableCell>
                        <TableCell>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <Ban />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Заблокировать</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

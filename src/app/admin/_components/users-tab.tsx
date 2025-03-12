import BanDialogOrDrawer from "@/app/admin/_components/ban-dialog-or-drawer";
import { testUsers } from "@/app/admin/_data/users";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function UsersTab() {
    return (
        <Table className="mx-auto md:w-3/4">
            <TableCaption>Пользователи системы.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-4/10">Логин</TableHead>
                    <TableHead className="w-5/10">Почта</TableHead>
                    <TableHead className="w-1/10"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {testUsers.map((user) => (
                    <TableRow key={user.username}>
                        <TableCell className="font-medium">{user.username}</TableCell>
                        <TableCell className="font-medium">{user.email}</TableCell>
                        <TableCell>
                            <BanDialogOrDrawer user={user.username} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

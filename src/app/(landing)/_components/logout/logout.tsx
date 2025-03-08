import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export function LogoutButton() {
  const { logout } = useAuth();

  return (
    <Button 
        variant="destructive" 
        className="bg-destructive/90 hover:bg-destructive"
        onClick={() => {
            void logout();
        }}>
            Выйти
    </Button>
  );
}
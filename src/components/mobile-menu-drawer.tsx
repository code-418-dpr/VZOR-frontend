"use client"

import { useState } from "react"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"

interface MobileMenuDrawerProps {
    links: {
        label: string
        sectionId: string
    }[]
    onNavigate: (sectionId: string) => void
}

export default function MobileMenuDrawer({ links, onNavigate }: MobileMenuDrawerProps) {
    const [open, setOpen] = useState(false)

    const handleNavigation = (sectionId: string) => {
        onNavigate(sectionId)
        setOpen(false)
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Меню</span>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="p-4">
                <DrawerHeader>
                    <DrawerTitle className="text-center text-2xl">Меню</DrawerTitle>
                </DrawerHeader>
                <div className="flex flex-col gap-4 mt-4">
                    {links.map((link) => (
                        <Button
                            key={link.sectionId}
                            variant="ghost"
                            className="w-full justify-center py-6 text-lg"
                            onClick={() => { handleNavigation(link.sectionId); }}
                        >
                            {link.label}
                        </Button>
                    ))}
                </div>
            </DrawerContent>
        </Drawer>
    )
}


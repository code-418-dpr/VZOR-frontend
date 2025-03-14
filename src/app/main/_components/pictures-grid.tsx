import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Picture } from "@/types/picture";

import { PictureCard } from "./picture-card";

interface PicturesGridProps {
    pictures: Picture[];
    onPictureSelect: (picture: Picture) => void;
    picturesDate: string;
}

export function PicturesGrid({ pictures, onPictureSelect, picturesDate }: PicturesGridProps) {
    return (
        <div className="mt-4">
            <Accordion
                type="multiple"
                defaultValue={[picturesDate]}
                className="overflow-hidden rounded-xl bg-zinc-100 shadow-sm dark:bg-zinc-800/50"
            >
                <AccordionItem value={picturesDate} className="border-b-0">
                    <AccordionTrigger className="px-4 py-3 transition-colors hover:bg-zinc-200/50 hover:no-underline dark:hover:bg-zinc-700/50">
                        <p className="text-2xl font-bold">{picturesDate}</p>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pt-2 pb-5">
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {pictures.map((picture) => (
                                <PictureCard key={picture.id} picture={picture} onPictureSelect={onPictureSelect} />
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

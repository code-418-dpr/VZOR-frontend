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
        <Accordion type="multiple" defaultValue={[picturesDate]} className="mt-8">
            <AccordionItem value={picturesDate}>
                <AccordionTrigger className="hover:no-underline">
                    <p className="text-2xl font-bold md:text-3xl">{picturesDate}</p>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {pictures.map((picture) => (
                            <PictureCard key={picture.id} picture={picture} onPictureSelect={onPictureSelect} />
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

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
        <Accordion
            type="multiple"
            defaultValue={[picturesDate]}
            className="mt-8"
        >
            <AccordionItem value={picturesDate}>
                <AccordionTrigger className="hover:no-underline">
                    <p className="mb:text-3xl text-xl font-bold">{picturesDate}</p>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-2 lg:grid-cols-5">
                        {pictures.map((picture) => (
                            <PictureCard key={picture.id} picture={picture} onPictureSelect={onPictureSelect} />
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

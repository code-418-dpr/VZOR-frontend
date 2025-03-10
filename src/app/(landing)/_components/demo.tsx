import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useMediaQuery } from "@/hooks/use-media-query";

const pics = ["/landing-examples/0.jpg", "/landing-examples/1.jpg"];

export default function Demo() {
    const carouselItems = pics.map((filename, index) => {
        return (
            <CarouselItem key={index}>
                <Image src={filename} alt="" width={800} height={0} className="rounded-3xl" />
            </CarouselItem>
        );
    });

    const isDesktop = useMediaQuery("(min-width: 768px)");

    return (
        <section className="mx-4 flex flex-col items-center justify-center gap-5 space-y-5 sm:mx-20 md:mt-20 lg:flex-row lg:gap-0 lg:space-x-20">
            <Card className="flex-1">
                <CardHeader>
                    <CardTitle className="text-center text-xl md:text-2xl lg:text-left">Как это работает</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-4 text-base md:text-xl">
                    <p>
                        Взор берёт на себя классификацию ваших изображений. Это просто: вы загружаете картинки, а
                        система их <span className="gradient-text font-medium">обрабатывает</span>!
                    </p>
                    <ul>
                        При этом происходит:
                        <li>- генерация описания всего изображения;</li>
                        <li>- распознавание отдельных объектов;</li>
                        <li>- считывание и корректировка текста;</li>
                        <li>- внесение распознанных данных в метаданные файла.</li>
                    </ul>
                    <p>
                        Ваши картинки хранятся почти так же, как в галерее смартфона. Но при этом вы можете искать их
                        обычными текстовыми запросами!
                    </p>
                </CardContent>
            </Card>
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="mx-5 flex-1"
            >
                <CarouselContent>{carouselItems}</CarouselContent>
                <CarouselPrevious className={isDesktop ? "" : "hidden"} />
                <CarouselNext className={isDesktop ? "" : "hidden"} />
            </Carousel>
        </section>
    );
}

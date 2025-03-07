import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const pics = ["/landing-examples/0.jpg", "/landing-examples/1.jpg"];

export default function Demo() {
    const carouselItems = pics.map((filename, index) => {
        return (
            <CarouselItem key={index}>
                <Image src={filename} alt="" width={800} height={0} className="rounded-3xl" />
            </CarouselItem>
        );
    });

    return (
        <section className="flex h-screen justify-center items-center mx-20 space-x-20">
            <Card className="flex-1">
                <CardHeader>
                    <CardTitle className="text-2xl">Как это работает</CardTitle>
                </CardHeader>
                <CardContent className="text-xl text-muted-foreground space-y-4">
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
                className="flex-1"
            >
                <CarouselContent>{carouselItems}</CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    );
}

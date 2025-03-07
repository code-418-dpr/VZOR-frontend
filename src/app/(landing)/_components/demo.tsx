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
                        Взор позволяет вам автоматизировать классификацию ваших изображений. Это просто: вы загружаете
                        картинки, а система их обрабатывает!
                    </p>
                    <ul>
                        При этом происходит:
                        <li>- генерация описания всего изображения;</li>
                        <li>- распознавание отдельных объектов;</li>
                        <li>- считывание и корректировка текста;</li>
                        <li>- внесение распознанных данных в метаданные.</li>
                    </ul>
                    <p>
                        Ваши картинки хранятся в вашем аккаунте, так что вы можете осуществлять удобный поиск по ним и
                        многое другое!
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

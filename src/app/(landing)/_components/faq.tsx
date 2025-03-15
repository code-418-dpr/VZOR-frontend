import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqQuestions = {
    "Как работает нейросеть в системе? 🧠🤖":
        "Наша нейросеть анализирует изображения, распознает текст и объекты, а затем автоматически сортирует и генерирует описания для удобного поиска.",
    "Безопасны ли мои данные в облачном хранилище? 🔒☁️":
        "Да! Мы используем современные методы шифрования и защиты данных, чтобы исключить несанкционированный доступ к вашему контенту.",
    "Можно ли редактировать или изменять описания, созданные системой? ✍️🖼️":
        "Конечно! Вы можете вручную редактировать описания и корректировать сортировку изображений, если хотите внести свои изменения.",
    "Как система помогает находить нужные изображения? 🔍📸":
        "Благодаря автоматической сортировке и тегам, сгенерированным нейросетью, поиск нужного изображения занимает считанные секунды.",
    "Поддерживает ли система разные форматы изображений? 📂📷":
        "Да! Мы работаем с основными форматами, включая JPEG, PNG, TIFF и даже некоторые RAW-файлы.",
};

export default function FAQ() {
    const accordionItems = Object.entries(faqQuestions).map(([question, answer]) => (
        <AccordionItem key={question} value={question}>
            <AccordionTrigger className="text-muted-foreground text-base md:text-xl">{question}</AccordionTrigger>
            <AccordionContent className="text-base md:text-xl">{answer}</AccordionContent>
        </AccordionItem>
    ));

    return (
        <Card className="mx-4 my-5 sm:mx-20 md:mx-30 md:mt-20 lg:mx-50 xl:mx-80">
            <CardHeader>
                <CardTitle className="text-center text-xl md:text-2xl">Популярные вопросы</CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible>
                    {accordionItems}
                </Accordion>
            </CardContent>
        </Card>
    );
}

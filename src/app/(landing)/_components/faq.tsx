import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqQuestions = {
    "Что? Где? Когда? Почему?":
        "Скоро здесь будет и вопрос, и ответ на этот вопрос, и вообще всё будет очень красиво и замечательно!",
    "Ещё один какой-то интересный вопрос?":
        "Скоро здесь будет и вопрос, и ответ на этот вопрос, и вообще всё будет очень красиво и замечательно!",
    "А может ну его, этим заниматься?":
        "Скоро здесь будет и вопрос, и ответ на этот вопрос, и вообще всё будет очень красиво и замечательно!",
    "Может, стоит сделать всё по-другому?":
        "Скоро здесь будет и вопрос, и ответ на этот вопрос, и вообще всё будет очень красиво и замечательно!",
    "ВАЖНЫЙ ПОПРОС":
        "Скоро здесь будет и вопрос, и ответ на этот вопрос, и вообще всё будет очень красиво и замечательно!",
};

export default function FAQ() {
    const accordionItems = Object.entries(faqQuestions).map(([question, answer]) => (
        <AccordionItem key={question} value={question}>
            <AccordionTrigger className="text-muted-foreground text-base md:text-xl">{question}</AccordionTrigger>
            <AccordionContent className="text-base md:text-xl">{answer}</AccordionContent>
        </AccordionItem>
    ));

    return (
        <Card className="mx-4 mt-5 mb-15 sm:mx-20 md:mx-30 md:mt-20 lg:mx-50 xl:mx-80">
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

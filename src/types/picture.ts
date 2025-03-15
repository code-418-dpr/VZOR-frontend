// интерфейс описывающий обработанное изображение
export interface Picture {
    id: string;
    date: string; // Дата в формате строки
    url: string; // URL изображения
    uploadDate: string; // Дата загрузки в формате строки (опционально, если нужно)
    description: string; // Описание изображения
    picture?: string; // Дополнительное поле для изображения (опционально)
    objects: string[]; // Список объектов на изображении
    text: string; // Текст, связанный с изображением
    category: string; // Категория изображения
    processingResult?: {
        // Результат обработки (опционально)
        description: string;
        objects: unknown[];
        text: string;
    };
}

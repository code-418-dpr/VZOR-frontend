// интерфейс описывающий обработанное изображение
export interface Picture {
    id: string;
    description: string;
    picture: string;
    objects: string[];
    text: string;
    category: string;
    date: string;
}

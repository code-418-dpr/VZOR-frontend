export const processImageUrl = (url: string): string => {
    return url
        .replace("minio:", "localhost:") // Заменяем хост
        .split("?")[0] // Удаляем параметры после расширения
        .replace("/vzor/", "/"); // Убираем лишний путь (опционально)
};

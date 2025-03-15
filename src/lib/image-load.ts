/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { processImageUrl } from "@/lib/image-utils";
import { ApiImage, ApiResponse } from "@/types";
import { Picture } from "@/types/picture";

export const fetchImages = async (date: Date): Promise<Picture[]> => {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const params = new URLSearchParams({
        StartUploadDate: startDate.toISOString(),
        EndUploadDate: endDate.toISOString(),
        SortBy: "UploadDate",
        SortDirection: "asc",
        Page: "1",
        PageSize: "100",
    });

    const response = await fetch(`http://localhost:8080/api/Images?${params}`);

    if (!response.ok) throw new Error("Failed to fetch images");

    const data: ApiResponse = await response.json();

    if (!data.result.isSuuccess) {
        throw new Error(data.result.errors[0]?.errorMessage || "API error");
    }

    return data.result.value.items.map(transformImage);
};

const transformImage = (image: ApiImage): Picture => ({
    id: image.id,
    url: processImageUrl(image.presignedDownloadUrl),
    uploadDate: image.uploadDate,
    description: "",
    picture: "",
    objects: [],
    text: "",
    category: "",
    date: "",
});

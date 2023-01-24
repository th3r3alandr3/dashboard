interface Website {
    id: string;
    title: string;
    url: string;
    image: {
        light: string;
        dark: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

interface WebsiteGetByIdOptions {
    id: string;
}

interface WebsiteAddOptions {
    url: string;
    title?: string;
    categoryId?: string;
}

interface WebsiteDeleteOptions {
    id: string;
}

interface WebsiteModel {
    id: string;
    title: string;
    url: string;
    img_light: string;
    img_dark: string;
    created_at: string;
    updated_at: string;
}

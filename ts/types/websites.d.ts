interface Website {
    id: string;
    title: string;
    url: string;
    priority: number;
    image: {
        light: string;
        dark: string;
    };
    // position: number;
    createdAt: Date;
    updatedAt: Date;
}

interface WebsiteGetByIdOptions {
    id: string;
}

interface WebsiteUpdateOptions {
    id: string;
    url: string;
    title?: string;
    priority?: number;
}

interface WebsiteAddOptions {
    url: string;
    title?: string;
}

interface WebsiteDeleteOptions {
    id: string;
}

interface WebsiteSortOptions {
    id: string;
    newPriority: number;
    oldPriority: number;
    userId: string;
}


interface WebsiteModel {
    id: string;
    title: string;
    url: string;
    priority: number;
    img_light: string;
    user_id: string;
    img_dark: string;
    created_at: string;
    updated_at: string;
}

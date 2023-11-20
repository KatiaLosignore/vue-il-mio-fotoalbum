import { reactive } from 'vue';

export const store = reactive(
    {
        baseUrl: 'https://localhost:7083/api',
        baseUrlnoApi: 'https://localhost:7083',
        photos: []
    }
);
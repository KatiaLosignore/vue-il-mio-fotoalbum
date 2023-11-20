import { createRouter, createWebHistory } from "vue-router";
import AppHome from './pages/AppHome.vue';
import AppPhotoList from './pages/AppPhotoList.vue';
import AppPhotoShow from './pages/AppPhotoShow.vue';
import AppNotFound from './pages/AppNotFound.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome
        },
        {
            path: '/photos',
            name: 'photo_list',
            component: AppPhotoList
        },
        {
            path: '/photo/:slug',
            name: 'photo_page',
            component: AppPhotoShow
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: AppNotFound
        },

    ]
});

export { router };
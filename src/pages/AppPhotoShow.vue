<script>
import { store } from '../store.js';
import axios from 'axios';

export default {
    name: 'AppPhotoShow',

    data() {
        return {
            store,
            photo: null
        }
    },
    methods: {
        getImageUrl(path) {
            if (path.startsWith("http")) {
                return path; // Restituisce l'URL direttamente se inizia con "http"
            } else {
                return `${this.store.baseUrlnoApi}/${path}`;
            }
        }
    },
    mounted() {
        const slug = this.$route.params.slug;

        axios.get(`${this.store.baseUrl}/Photos/PhotoById/${slug}`)
            .then(response => {
                console.log(response);
                if (response.data) {
                    this.photo = response.data
                } else {
                    this.$router.push({ name: 'not-found' });
                }

            });

    }

}

</script>

<template>
    <div class="container">
        <div class="row py-5">
            <div class="col-12">
                <div id="bg-card" class="card-single rounded-5 d-flex justify-content-center align-items-center">

                    <div class="card-body text-center card-single" v-if="photo">
                        <img v-if="photo.imageFile" :src="photo.imageSrc" :alt="photo.title">
                        <img v-else :src="getImageUrl(photo.imageUrl)" alt="photo.title">
                        <div class="card-body text-center">
                            <h3 class="card-text fw-bold fs-2 my-4"> {{ photo.title }} </h3>
                            <h3 class="card-text mb-3" v-for="category in photo.categories"> Categoria: {{ category.name }}
                            </h3>
                            <p class="card-text my-4"> {{ photo.description }} </p>
                        </div>
                    </div>


                </div>
                <router-link :to="{ name: 'photo_list' }">
                    <button class="btn btn-secondary fw-bold mt-4">Torna indietro</button>
                </router-link>

            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.container {
    margin-top: 400px;
}

#bg-card {
    background-color: rgb(235, 203, 108);
    padding: 20px;
}

img {
    object-fit: cover;
    width: 1200px;
    margin-top: 15px;
    border-radius: 20px;
}

h3 {
    color: rgb(99, 106, 114);
}

p {
    font-size: 20px;
    color: grey;
    font-weight: bold;
}
</style>
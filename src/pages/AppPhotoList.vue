<script>
import { store } from '../store.js';
import axios from 'axios';


export default {
    name: 'AppPhotoList',
    data() {
        return {
            store,
            inputValue: '',
            text: 'Nessuna foto trovata!',
            displayText: ''
        }
    },
    methods: {
        getPhotos() {
            let url = `${this.store.baseUrl}/Photos/GetPhotos`;
            axios.get(url)
                .then(response => {
                    console.log(response);
                    // Filtra solo le foto con visible === true
                    this.store.photos = response.data.filter(photo => photo.visible === true);
                })
        },
        getSearchPhotos(searchParams) {
            let url = `${this.store.baseUrl}/Photos/SearchPhoto`;
            axios.get(url, {
                params: {
                    search: searchParams
                }

            }).then((response) => {
                console.log(response);
                if (response.data.length > 0) {
                    this.displayText = '';
                    // Filtra solo le foto con visible === true
                    this.store.photos = response.data.filter(photo => photo.visible === true);
                } else {
                    this.changeText();
                    this.store.photos = '';
                }
            })
            this.inputValue = '';
        },
        changeText() {
            this.displayText = this.text;
        },
        getImageUrl(path) {
            if (path.startsWith("http")) {
                return path; // Restituisce l'URL direttamente se inizia con "http"
            } else {
                return `${this.store.baseUrlnoApi}/${path}`;
            }
        }
    },
    mounted() {
        this.getPhotos();
    }
}

</script>

<template>
    <p class="back-button mt-3 text-center mt-5">
        <router-link :to="{ name: 'home' }">
            <button class="btn btn-secondary fw-bold">Torna alla Home</button>
        </router-link>
    </p>
    <div class="container">
        <div class="d-flex justify-content-center align-items-center mt-5 text-head">
            <img src="src/assets/logoalbum.webp" class="logo me-4" alt="Immagine logo" />
            <h1 class="text text-primary fw-bold">
                Il mio Foto Album
            </h1>
        </div>
        <div class="d-flex justify-content-center align-items-center">
            <input v-model='inputValue' type="text" class="form-control mt-3 mb-4 w-50 d-block"
                placeholder="Cerca per titolo...">
            <button @click="getSearchPhotos(inputValue)" class="btn btn-secondary fw-bold mb-2 ms-4">Ricerca</button>
        </div>

        <p class="text-danger fw-bold text-center no-photo"> {{ displayText }}</p>

        <div class="d-flex justify-content-center align-items-center flex-wrap">
            <div class="card card-photo shadow-sm" v-for=" photo in this.store.photos" :key="photo.id">

                <img v-if="photo.imageFile" :src="photo.imageSrc" :alt="photo.title">
                <img v-else :src="getImageUrl(photo.imageUrl)" alt="photo.title">
                <div class="card-body text-center">
                    <h3 class="card-text fw-bold mb-4"> {{ photo.title }} </h3>
                    <h3 class="card-text mb-3" v-for="category in photo.categories"> Categoria: {{ category.name }}</h3>
                    <p class="card-text mb-3"> {{ photo.description }} </p>

                    <router-link :to="{ name: 'photo_page', params: { slug: photo.id } }">
                        <button class="btn btn-primary fw-bold button-detail">Dettaglio foto</button>
                    </router-link>

                </div>

            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.container {
    max-width: 1600px;
    background-image: url('../src/assets/decorative18.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    margin-bottom: 35px;
    margin-top: 50px;
    border-radius: 20px;
}

.text-head {
    padding-top: 40px;
    padding-bottom: 40px;
}

.logo {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    cursor: pointer;
}

.text {
    font-size: 60px;
}

.no-photo {
    font-size: 38px;
    margin-top: 35px;
    margin-bottom: 65px;
}

img {
    height: 300px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}

.card {
    height: 690px;
    width: 400px;
    margin-bottom: 20px;
    margin-right: 20px;
    border-radius: 20px;
    position: relative;
}

.card-photo {
    transform: scale(1);
    transition: all .2s linear;
}

.card-photo:hover {
    transform: scale(1.1);
    z-index: 2;
}

.button-detail {
    position: absolute;
    bottom: 32px;
    right: 138px;
    color: blue;
    border: 2px solid transparent;
    background-color: rgb(141, 227, 255);
}

.search-input {
    width: 1096px;
}

.id-category {
    text-align: center;
}
</style>
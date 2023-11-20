<script>
import AppMessageForm from '../components/AppMessageForm.vue'
export default {
    name: 'AppHome',
    components: {
        AppMessageForm
    }
}

</script>

<template>
    <div class="container">

        <div class="text-center">
            <h1 class="welcome">Benvenuti nella piattaforma del mio Foto Album</h1>
            <div class="container">
                <p class="back-button mb-5">
                    <router-link :to="{ name: 'photo_list' }">
                        <button class="btn btn-outline-secondary fw-bold">Clicca qui per accedere</button>
                    </router-link>
                </p>
                <AppMessageForm />

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 1000px;
}

.welcome {
    color: rgb(203, 161, 99);
    font-weight: bold;
    font-size: 42px;
    margin-top: 570px;
    margin-bottom: 120px;
}

.text {
    color: rgb(203, 161, 99);
    font-size: 20px;
    font-weight: bold;
}
</style>
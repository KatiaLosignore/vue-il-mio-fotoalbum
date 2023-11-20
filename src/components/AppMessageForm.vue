<script>
import { store } from '../store.js';
import axios from 'axios';

export default {
    name: 'AppMessageForm',
    data() {
        return {
            store,
            email: '',
            content: '',
            responseStatus: 0,
            success: false,
            sending: false,
            errors: {
            }
        }
    },
    methods: {
        sendForm() {
            this.success = false;
            this.sending = true;
            this.errors = {};

            const payload = {
                Email: this.email,
                MessageText: this.content
            }

            axios.post(`${this.store.baseUrl}/Message/CreateMessage`, payload)
                .then((response) => {
                    console.log(payload);
                    this.responseStatus = response.status

                    // Reset the form
                    this.email = '';
                    this.content = '';
                    this.success = true;
                    setTimeout(() => {
                        this.success = false;
                    }, 7000);
                    
                    this.sending = false;

                })
                .catch(error => {
                    this.sending = false;
                    this.responseStatus = error.response.status
                    setTimeout(() => {
                        this.responseStatus = 0;
                    }, 7000);
                    console.error('Error sending message:', error);
                });
        },

    },
};


</script>

<template>
    <div class="container">
        <h3 class="text fw-bold">Contattami</h3>
        <div v-if="success" class="alert alert-success" role="alert">
            Messaggio inviato con successo!
        </div>

        <form @submit.prevent="sendForm()">
            <div class="mb-3">
                <label for="email" class="form-label fw-bold mb-2 text-form">La tua email *</label>
                <input type="email" class="form-control" :class="{ 'is-invalid': errors.email }" id="email" v-model="email"
                    required>
                <div class="invalid-feedback" v-for=" error in errors.email ">
                    {{ error }}
                </div>
            </div>

            <div class="mb-3">
                <label for="content" class="fw-bold mb-2 text-form">Il tuo messaggio *</label>
                <textarea class="form-control" :class="{ 'is-invalid': errors.content }" id="content" v-model="content"
                    required></textarea>
                <div class="invalid-feedback" v-for=" error in errors.content ">
                    {{ error }}
                </div>
            </div>
            <button type="submit" class="btn btn-secondary fw-bold mt-4" :disabled="email && content ? false : true">
                {{ sending ? 'Invio in corso...' : 'Invia messaggio' }}
            </button>
        </form>
        <p class="mt-5">* indica i campi obbligatori</p>

    </div>
</template>

<style lang="scss" scoped>
.text {
    color: rgb(203, 161, 99);
    margin-top: 130px;
    margin-bottom: 30px;
}

.text-form {
    color: gray;
}
</style>
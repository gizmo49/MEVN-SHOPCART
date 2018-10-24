<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
    <div class="container">
        <span class="navbar-brand">Shopping Cart</span>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav  ml-auto">
                <li class="nav-item active" v-for="category in categories" :key="category._id">
                   {{ category.title }}
                </li>
                
            </ul>
        </div>
    </div>
</nav>
</template>

<script>
import Api from '@/services/Api'
export default {
    data() {
        return {
            categories: []
        }
    },
    created() {
        Api().get('/categories')
            .then(response => {
                this.categories = response.data;
            });
            
    }, 
    computed: {
        cart() {
            return this.$store.getters.getCart
        }
    }

}
</script>

<style>

</style>
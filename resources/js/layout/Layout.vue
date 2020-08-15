<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
                <router-link class="navbar-brand" to="">TODO APP</router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul v-show="status.loggedIn" class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/todos">Todos</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/users">Users</router-link>
                        </li>
                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Authentication Links -->

                        <li class="nav-item" v-show="!status.loggedIn">
                            <router-link class="nav-link" to="/login">Login</router-link>
                        </li>

                        <li class="nav-item" v-show="!status.loggedIn">
                            <router-link class="nav-link" to="/register">Register</router-link>
                        </li>
                        <li class="nav-item dropdown" v-show="status.loggedIn">
                            <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {{ this.user ? this.user.name : ''}}
                                <img :src="this.user ?  'uploads/' + this.user.avatar : ''" class="avatar"/>
                                <span class="caret"></span>
                            </a>

                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#"
                                   v-on:click="logout">
                                    Logout
                                </a>
                                <a class="dropdown-item" href="/#/settings">
                                    Settings
                                </a>
                                <form id="logout-form" action="#" method="POST" style="display: none;">

                                </form>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container pt-3">
            <router-view/>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'Layout',
        data: function () {
            return {
                errors: null,
            }
        },
        computed: {
            ...mapGetters({
                'status': 'Auth/getStatus',
            }),
            ...mapGetters({
                'user': 'Auth/getUser',
            }),
        },
        methods: {
            logout: function () {
                this.$store.dispatch('Auth/logout');
            }
        },
        mounted: function () {
            this.$store.dispatch('Auth/initState');
        },
    };
</script>

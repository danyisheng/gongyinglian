<template>
    <div id="app">
        <router-view v-if="isRouterAlice" />
    </div>
</template>

<script>
    export default {
        name: 'App',
        provide() {
            return {
                reload: this.reload
            }
        },
        data () {
            return {
                isRouterAlice: true
            }
        },
        methods: {
            reload () {
                this.isRouterAlice = false
                this.$nextTick(() => {
                    this.isRouterAlice = true
                })
            }
        },
        mounted () {
            this.reload()
        }
    }
</script>

<style lang="scss">
#app {
    height: 100%;
    width: 100%;
}
</style>

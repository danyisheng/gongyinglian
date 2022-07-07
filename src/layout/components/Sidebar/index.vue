<template>
    <div :class="{'has-logo':showLogo}">
        <logo v-if="showLogo" :collapse="isCollapse"/>
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                    :default-active="activeMenu"
                    :collapse="isCollapse"
                    :background-color="variables.menuBg"
                    :text-color="variables.menuText"
                    :unique-opened="false"
                    :active-text-color="variables.menuActiveText"
                    :collapse-transition="false"
                    mode="vertical"
            >
                <sidebar-item v-for="(route, index) in routers" :key="index" :item="route" :base-path="route.path"/>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Logo from './Logo'
    import SidebarItem from './SidebarItem'
    import variables from '@/styles/variables.scss'
    import {constantRoutes} from '@/router'

    export default {
        components: {SidebarItem, Logo},
        data() {
            return {}
        },
        computed: {
            ...mapGetters([
                'permission_routes',
                'sidebar'
            ]),
            activeMenu() {
                const route = this.$route
                const {meta, path} = route
                // if set path, the sidebar will highlight the path you set
                if (meta.activeMenu) {
                    return meta.activeMenu
                }
                return path
            },
            showLogo() {
                return this.$store.state.settings.sidebarLogo
            },
            variables() {
                return variables
            },
            isCollapse() {
                return !this.sidebar.opened
            },
            routers () {
                return this.$store.state.permission.routes
            }
        }
    }
</script>

<style lang="scss">
    .scrollbar-wrapper {
        .el-menu {
            .submenu-title-noDropdown {
                padding: 0 !important;
                /*padding-left: 30px !important;!**!*/
                margin-left: 15px !important;
            }

            .el-submenu__title {
                padding: 0 !important;
                /*padding-left: 42px !important;*/
            }

            .is-opened {
                .el-menu-item {
                    padding: 0px !important;
                    /*padding-right: 0 !important;*/
                    padding-left: 40px !important;
                }
            }
            .el-submenu__icon-arrow {
                color: #fff;
                top: 56%;
            }
        }
        .el-submenu [class^="el-icon-"] {
            margin-left: 15px;
            margin-right: 2px;
            color: #fff;
        }
        .el-menu-item [class^="el-icon-"] {
            color: #fff;
        }
    }
</style>

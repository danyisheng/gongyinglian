<template>
    <div class="mapsBox">
        <div id="pickerBox">
            <div id="pickerBoxInfo">
                <input id="pickerInput" v-model="addressCity" @blur="changeBlur" placeholder="请输入地址信息"/>
                <div id="poiInfo"></div>
            </div>
            <div id="lnglatBox">
                <label for="">坐标：</label>
                <el-input v-model="lng" disabled style="width: 30%" clearable></el-input>
                <el-input v-model="lat" disabled style="width: 30%" clearable></el-input>
            </div>
        </div>
        <div id="container" @click="getClickMap" class="map" tabindex="0"></div>
    </div>
</template>

<script>
    import AMap from 'AMap'
    import AMapUI from 'AMapUI'

    export default {
        name: '',
        props: {
            isDisabled: {
                type: Boolean,
                default: false
            },
            lngs: {
                type: Number,
                default: 120
            },
            lats: {
                type: Number,
                default: 20
            },
            shopName: {
                type: String,
                default: ''
            },
            detailAddress: {
                type: String,
                default: '武汉'
            }
        },
        data() {
            return {
                map: null,
                addressCity: this.detailAddress,
                lng: this.lng,
                lat: this.lats,
                poiPicker: null,
                marker: null,
                infoWindow: null,
                source: null,
                poi: {name: ''},
                info: {
                    address: '',
                    location: '',
                    name: ''
                },
                areaAddress: '',
                flag: false
            }
        },
        computed: {},
        components: {},
        methods: {
            init() {
                let that = this
                this.map = new AMap.Map('container', {
                    zoom: 10
                })
                AMapUI.loadUI(['misc/PoiPicker'], function (PoiPicker) {
                    that.poiPicker = new PoiPicker({
                        input: 'pickerInput'
                    })
                    //初始化poiPicker
                    that.poiPickerReady(that.poiPicker)
                })
            },
            poiPickerReady(poiPicker) {
                let that = this
                window.poiPicker = poiPicker
                that.infoWindow = new AMap.InfoWindow({
                    offset: new AMap.Pixel(0, -20)
                })
                poiPicker.on('poiPicked', function (poiResult) {
                    console.log(poiResult)
                    if (that.marker) {
                        that.map.remove(that.marker)
                    }
                    that.marker = new AMap.Marker()
                    that.flag = true
                    that.areaAddress = poiResult.item.district //区域地址
                    that.source = poiResult.source
                    that.poi = poiResult.item
                    that.info = {
                        name: that.poi.name,
                        location: that.poi.location.toString()
                    }
                    if (that.source === 'suggest') {
                        that.info.address = that.areaAddress + that.poi.address
                    } else if (that.source === 'search') {
                        that.info.address = that.poi.pname + that.poi.cityname + that.poi.address
                    }
                    that.marker.setMap(that.map)
                    that.infoWindow.setMap(that.map)

                    that.marker.setPosition(that.poi.location)
                    that.infoWindow.setPosition(that.poi.location)
                    that.infoWindow.setContent('地址信息: <pre>' + JSON.stringify(that.info, null, 2) + '</pre>')
                    that.infoWindow.open(that.map, that.marker.getPosition())
                    console.log(that.poi.location.getLng(), '纬度');
                    that.lng = that.poi.location.getLng()
                    that.lat = that.poi.location.getLat()
                    that.addressCity = that.info.address
                    that.$emit('change', {
                        lng: that.poi.location.getLng(),
                        lat: that.poi.location.getLat(),
                        address: that.info.address
                    })
                })
                poiPicker.onCityReady(function () {
                    poiPicker.suggest('')
                })
            },
            changeBlur() {
                // let that = this
                // that.$emit('change', {lng: that.poi.location.getLng(), lat: that.poi.location.getLat(), address: that.info.address})
                // that.$emit('change', {lng: e.lnglat.getLng(), lat: e.lnglat.getLat(), address: that.info.address})
            },
            getClickMap() {
                let that = this
                if (that.flag) {
                    that.map.on('click', (e) => {
                        let location = e.lnglat.getLng() + '，' + e.lnglat.getLat()
                        let address = that.info.address ? that.info.address : that.addressCity
                        let name = that.poi.name ? that.poi.name : that.shopName
                        that.getMarkPosition(name, location, address, e)
                    })
                }
            },
            getMarkPosition(name, location, address, e) {
                let that = this
                if (that.marker) {
                    that.map.remove(that.marker)
                }
                that.info = {
                    name,
                    location,
                    address
                }
                that.marker.setMap(that.map)
                that.infoWindow.setMap(that.map)
                that.marker.setPosition(e.lnglat)
                that.infoWindow.setPosition(e.lnglat)
                that.infoWindow.setContent('地址信息: <pre>' + JSON.stringify(that.info, null, 2) + '</pre>')
                that.infoWindow.open(that.map, that.marker.getPosition())
                that.lng = e.lnglat.getLng()
                that.lat = e.lnglat.getLat()
                that.$emit('change', {lng: e.lnglat.getLng(), lat: e.lnglat.getLat(), address: that.info.address})
            },
            getMarkerInfo(name, location, address, lng, lat) {
                let that = this
                this.flag = true
                if (that.marker) {
                    that.map.remove(that.marker)
                }
                that.marker = new AMap.Marker({
                    position: new AMap.LngLat(Number(lng), Number(lat))
                })
                that.map.add(that.marker)
                that.map.setFitView(that.marker, null, null, 11)
            }
        },
        created() {
        },
        mounted() {
            this.init()
        },
        watch: {}
    }
</script>

<style scoped lang="scss">

</style>

<style lang="scss">

</style>





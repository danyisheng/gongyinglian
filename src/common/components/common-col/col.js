export default {
    name: 'commonCol',
    props: {
        lot: {
            type: Number,
            default: 5
        },
        tag: {
            type: String,
            default: 'div'
        },
        height: {
            type: Number,
            default: null
        }
    },
    computed: {
        gutter() {
            let parent = this.$parent
            while (parent && parent.$options.componentName !== 'commonRow') {
                parent = parent.$parent
            }
            return parent ? parent.gutter : 0
        },
        type() {
            let parent = this.$parent
            while (parent && parent.$options.componentName !== 'commonRow') {
                parent = parent.$parent
            }
            return parent ? parent.type : 'normal'
        }
    },
    render(h) {
        this.lot = this.lot > 0 ? this.lot : 5
        let classList = []
        let style = {}
        if (this.gutter) {
            style.height = this.height + 'px'
            style.paddingLeft = this.gutter / 2 + 'px'
            style.paddingRight = style.paddingLeft
        }
        if (this.type === 'respone') classList.push('common-col-' + this.lot)
        if (this.type === 'flex') {
            style['-webkit-flex'] = this.lot
            style['-ms-flex'] = this.lot
            style['flex'] = this.lot
        }
        return h(this.tag, {
            class: ['common-col', ...classList],
            style
        }, this.$slots.default)
    }
}

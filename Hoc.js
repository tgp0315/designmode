function WithConsole (WrappedComponent) {
  return {
    mounted() {
      console.log("i have already mounted");
    },
    props: WrappedComponent.props,
    render(h) {
      const slots = Object.keys(this.$slots)
        .reduce((arr, key) => arr.concat(thid.$slots[key]), [])
        // 手动更正context
        .map(vnode => {
          vnode.context = this._self
          return vnode;
        })
      return h(WrappedComponent, {
        on: this.$listeners,
        props: this.$props,
        attrs: this.$attrs,
        scopedSlots: this.$scopedSlots
      }, slots)
    }
  }
}
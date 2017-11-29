import { Vue, Component } from 'vue-property-decorator'

/**
 * Mixin Page
 *
 * @export
 * @class PageMixin
 * @extends {Vue}
 */
@Component({})
export default class PageMixin extends Vue {

  mounted () {
    alert(`hello echarts example`)
  }

}

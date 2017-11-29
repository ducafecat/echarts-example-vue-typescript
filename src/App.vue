<template>
  <div id="echartsDiv" :style="{ width: chartWidth + 'px', height: chartHeight + 'px' }">
    <button @click="handelAjax">读取图表数据</button><br>
    宽:<input v-model="chartWidth"><br>
    高:<input v-model="chartHeight"><br>
    <div>{{msg1}}</div><br>
    <div>{{msg2}}</div><br>
    <IEcharts v-if="option !== null" :option="option" @ready="handelReady" :resizable="resizable"></IEcharts>
  </div>
</template>

<script lang="ts">
import Axios from 'axios'
import Vue from 'vue'
import Component from 'vue-class-component'
import IEcharts from 'vue-echarts-v3/src/full.js'
import { ECharts } from 'echarts'
import { IDataValue } from './interface/IDataValue'
import $ from 'jquery'
import PageMixin from './mixin/pageMixin'

@Component({
  components: {
    IEcharts
  },
  mixins: [PageMixin]
})
export default class App extends Vue {
  option: any = null
  chartWidth: number = 400
  chartHeight: number = 400
  instance: ECharts
  resizable: boolean = true
  msg1: string = ''
  msg2: string = ''

  ajaxData () {
    let that = this
    Axios.get('https://www.easy-mock.com/mock/5a1bb2639144e669fc6e43fa/example/g2-data')
      .then(function (response) {
        let dataList: Array<IDataValue> = response.data
        let xAxisData: Array<string> = []
        let seriesData: Array<number> = []
        for (let item of dataList) {
          xAxisData.push(item.year)
          seriesData.push(item.value)
        }
        that.option = {
          title: {
            text: 'ECharts Hello World'
          },
          tooltip: {},
          xAxis: {
            data: xAxisData
          },
          yAxis: {},
          series: [{
            name: 'Sales',
            type: 'bar',
            data: seriesData
          }]
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  handelAjax () {
    this.ajaxData()
  }

  handelReady (instance: ECharts) {
    this.instance = instance
  }

  mounted () {
    this.msg2 = this.$textInfo
    $(window).resize(() => {
      let width = $(window).width()
      let height = $(window).height()
      this.msg1 = `window.width: ${width}, window.height: ${height}`
    })
  }
}
</script>

<style scoped>
</style>
<template>
  <div id="echarts" :style="{ width: chartWidth + 'px', height: chartHeight + 'px' }">
    <button @click="handelAjax">读取图表数据</button><br>
    宽:<input v-model="chartWidth"><br>
    高:<input v-model="chartHeight"><br>
    <IEcharts v-if="option !== null" :option="option" @ready="handelReady"></IEcharts>
  </div>
</template>

<script lang="ts">
  import Axios from 'axios'
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import IEcharts from 'vue-echarts-v3/src/full.js'
  import {ECharts, EChartOption} from 'echarts'
  import { IDataValue } from './interface/IDataValue'

  @Component({
      components: {
          IEcharts
      }
  })
  export default class App extends Vue {
    option: any = null
    chartWidth:number = 400
    chartHeight:number = 400
    instance: ECharts

    ajaxData() {
      let that = this
      Axios.get('https://www.easy-mock.com/mock/5a1bb2639144e669fc6e43fa/example/g2-data')
        .then(function (response) {
          let dataList: Array<IDataValue> = response.data
          let xAxisData: Array<string> = [], seriesData:Array<number> = []
          for(let item of dataList) {
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

    handelAjax() {
      this.ajaxData()
    }

    handelReady(instance:ECharts) {
      this.instance = instance
    }

    mounted () {
    }
  }
</script>

<style scoped>
</style>
<template>
  <div class="echarts">
    <button @click="handelAjax">读取图表数据</button>
    <IEcharts v-if="option !== null" :option="option"></IEcharts>
  </div>
</template>

<script lang="ts">
  import Axios from 'axios'
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import IEcharts from 'vue-echarts-v3/src/full.js'
  import { IDataValue } from './interface/IDataValue'

  @Component({
      components: {
          IEcharts
      }
  })
  export default class App extends Vue {
    option: any = null

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
    
    mounted () {
    }
  }
</script>

<style scoped>
  .echarts {
    width: 400px;
    height: 400px;
  }
</style>
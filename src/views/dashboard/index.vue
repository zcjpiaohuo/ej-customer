<template>
  <section class="chart-container">
<Row  :gutter="16" style="margin-top:45px">


      <Col :xs="24" :sm="12"   :md="12" :lg="12">

        <div class="state-overview">
            <Col span="12">
                
              <div class="panel purple">
                <div class="symbol">
                      <Icon type="clipboard" size="50" color="white"></Icon>
                  
                </div>
                 <div  class="state-value">
                        <div class="value">
                            230
                        </div>
                         <div class="title">
                          New Order
                        </div>
                  </div>
              </div>


            </Col>
            <Col span="12">
               <div  class="panel red">
                  <div class="symbol"> 
                      <Icon type="pricetags" size="50" color="white"></Icon>
                   </div>
                    <div  class="state-value">
                        <div class="value">
                            3490
                        </div>
                         <div class="title">
                            Copy Sold
                        </div>
                  </div>

                </div>
            </Col>
        </div>


      <div  class="state-overview">
            <Col span="12" >
                
              <div class="panel blue" >
                  <div class="symbol">
                      <Icon type="cash" size="50" color="white"></Icon>
                      
                  </div>
                    <div  class="state-value">
                        <div class="value">
                          22014
                        </div>
                         <div class="title">
                           Total Revenue
                        </div>
                  </div>
              </div>

            </Col>
            <Col span="12" >
               <div class="panel green" >
                  <div class="symbol">
                      <Icon type="eye" size="50" color="white"></Icon>
                      
                  </div>
                    <div  class="state-value">
                        <div class="value">
                            390
                        </div>
                         <div class="title">
                             Unique Visitors
                        </div>
                  </div>
                </div>
            </Col>
        </div>


        
      </Col>

    


      <Col  :xs="24" :sm="12"   :md="12" :lg="12" >


          <dash-chart-visitor></dash-chart-visitor>


    </Col>

</Row>
  </section>
</template>
<script>
  import charts1 from './echarts.vue';
  import charts2 from './echarts2.vue';
  export default {
    data() {
      return {
        value5: 3.7
      }
    },
    components: {
      'v-charts1': charts1,
      'v-charts2': charts2,
    }
  };
</script>
<style>
  .chart-container{
    background-color: #F2F2F2;
  }
  .show-section {
    margin: 10px;
    border-radius: 4px;
  }

  .show-section.top {
    background-color: white;
    padding: 10px;
    margin-top: 0;
  }

  .show-section span {
    font-weight: bold;
    font-size: 18px;
    color: #333333;
  }
  .el-rate{
    display:inline;
  }
</style>

/*
 * @Author: your name
 * @Date: 2021-09-09 16:23:45
 * @LastEditTime: 2021-09-09 17:00:31
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \course_2021_sxnd_xxtx_1-masterd:\2-综合实训-行学天下门户系统\ej\ej-houtai\src\store\modules\category.js
 */
import request from '@/utils/request';
export default {
  namespaced: true,
  state () {
    return {

    }
  },
  mutations: {

  },
  actions: {
    async findAllCategories () {
      let res = await request.get('/account/pageQueryCustomerAccount', {
        params: { page: 1, pageSize: 1000 }
      })
      return res
    }
  }
}
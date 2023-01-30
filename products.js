import {
  createApp
} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const url = 'https://vue3-course-api.hexschool.io/v2'; // 請加入站點
const path = 'jpshop'; // 請加入個人 API Path

// bootstrap 彈窗所需要空物件
let productsModal = {};
let delProductsModal = {};


createApp({
  data() {
    return {
      // 產品渲染空陣列
      products:[],
      // tempProduct 新增產品
      tempProduct:{
         imagesUrl:[],
        }, 
        isNew:false,
     }
  },
  _methods: {
    // 取得產品
    getProducts() {
      console.log(`${url}/api/${path}/admin/products`);
      const productsUrl = `${url}/api/${path}/admin/products/all`;
      axios.get(productsUrl)
        .then((res) => {
          // console.log(res.data);
          // 將 products 存取 products
          this.products = res.data.products;
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    // 打開 彈窗
    opemModel(status,item) {
      if (status === 'create') {
        productsModal.show();
        this.isNew = true;
        // 帶入初始化資料
        this.tempProduct = {
            imagesUrl:[],
        }; 
      } else if (status === 'edit') {
        productsModal.show();
        this.isNew = false;
          // 帶入目前item資料
        this.tempProduct = {...item};
      } else if (status === 'delete') {
        delProductsModal.show();
          // 帶入 id使用
        this.tempProduct = {...item};
        // console.log('1',item);
      }
    },
    // 更新產品
    updateProducts() {
      let sit = `${url}/api/${path}/admin/product`;
      // 用 isNew 判斷 api 如何進行
      let methot = 'post';
      // 如果 不是this.isNew 就可以使用下方API
      if (!this.isNew) {
          sit = `${url}/api/${path}/admin/product/${this.tempProduct.id}`;
          methot = 'put';
      } 
      // console.log(sit);
      axios[methot](sit, { data: this.tempProduct })
        .then((res) => {
          res.data;
          this.getProducts();
          productsModal.hide();
        })
        .catch((err) => {
          // console.log(err.response.data.message);
        });
    },
    // 刪除產品
    deleteProducts(){
      const sit = `${url}/api/${path}/admin/product/${this.tempProduct.id}`;
       axios.delete(sit)
        .then((res) => {
          res.data;
          this.getProducts();
           delProductsModal.hide();
      
        })
        .catch((err) => {
          // console.log(err.response.data.message);
        });
    }
  },
  get methods() {
    return this._methods;
  },
  set methods(value) {
    this._methods = value;
  },
    mounted() {
      //取出token 
        const cookieValue = document.cookie
        .split('; ')
        .find((row) => row.startsWith('hexToken='))
        ?.split('=')[1];
        // console.log(cookieValue);
        // axios 存取 Header 發送
        axios.defaults.headers.common['Authorization'] = cookieValue;
        this.getProducts();
        
        console.log(bootstrap);
        // 1. 初始化 new
        // 2. 呼叫方法 show hide
        productsModal = new bootstrap.Modal('#productModal');
        // 刪除的 model
        delProductsModal = new bootstrap.Modal('#delProductModal');

  },
}).mount('#app');
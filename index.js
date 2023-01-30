import {
  createApp
} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const url = 'https://vue3-course-api.hexschool.io/v2'; // 請加入站點
const path = 'jpshop'; // 請加入個人 API Path
createApp({
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    login() {
      const shopUrl = `${url}/admin/signin`
      axios.post(shopUrl,this.user)
        .then((res) => {
        //   console.log(res.data.token);
        //   console.log(res.data.expired);
          const { token,expired } = res.data
            // 寫入 cookie token
           // expires 設置有效時間
           document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
           window.location = 'products.html';
        })
        .catch((err)=>{
            console.log(err);
        })
    },
  },
    mounted() {
    console.log(`${url}`);
  },
}).mount('#app');
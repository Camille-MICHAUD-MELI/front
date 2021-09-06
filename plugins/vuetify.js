import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'fa', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
  theme: {
    dark:
      {
        primary: '#00bcd4',
        secondary: '#ff9800',
        accent: '#ffc107',
        error: '#f44336',
        warning: '#9c27b0',
        info: '#009688',
        success: '#4caf50'
      }
  }
})

import Api from '@/services/Api'

export default {
  fetchCats () {
    return Api().get('categories')
  }
}
export class HttpSrv {
  /* @ngInject */
  constructor($http) {
    this.$http = $http
  }
  
  post(url, data) {
    return this.$http.post(url, data)
  }

  get(url) {
    return this.$http.get(url)
  }
}

/* @ngInject */
export default function jwtInterceptorConfig(jwtInterceptorProvider, $httpProvider){
  /* @ngInject */
  jwtInterceptorProvider.tokenGetter = function (jwtHelper) {
    let token = localStorage.getItem('authToken')
    if (token){
      if (jwtHelper.isTokenExpired(token)){
        // TODO fire event to go to logout
        console.log('should go to login here')
      }
      else {
        let expDate = jwtHelper.getTokenExpirationDate(token)
        if (expDate - Date.now() <= 60*60*24*5){
          // TODO
          console.log('should reauthenticate here')
        }
      }
    }
    return  token
  }

  $httpProvider.interceptors.push('jwtInterceptor')
}

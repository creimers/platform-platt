import * as authActions from '../actions/auth'

export default class viewComponentCtrl {
  /* @ngInject */
  constructor($q, jwtHelper, $ngRedux, $scope, $mdToast) {
    this.$q = $q
    this.jwtHelper = jwtHelper
    this.$mdToast = $mdToast

    const unsubscribe = $ngRedux.connect(this._mapStateToThis, authActions)(this)
    $scope.$on('$destroy', unsubscribe);
  }

  $routerOnActivate(next, prev) {
    let deferred = this.$q.defer()

    let token = localStorage.getItem('jwt_token')

    if (token) {
      if (this.jwtHelper.isTokenExpired(token)){
        if(this.requiresAuthentication) {
          this.$router.navigate(['Login'])
        }
        deferred.reject()
      }

      else {
        let expDate = this.jwtHelper.getTokenExpirationDate(token)
        let expiresIn = expDate - Date.now()
        const day = 60 * 60 * 24
        const expiration = day * 5
        if (expiresIn <= expiration){
          this.reauthenticate().then((resp) => {
            if(!resp.ok) {
              if(this.requiresAuthentication) {
                this.$router.navigate(['Login'])
              }
              deferred.reject()
            }
            else {
              deferred.resolve()
            }
          })
        }
        else {
          this.reauthenticateSuccess({token})
          deferred.resolve()
        }
      }
    }
    else {
      if(this.requiresAuthentication) {
        this.$router.navigate(['Login'])
      }
      deferred.reject()
    }
    return deferred.promise
  }

}

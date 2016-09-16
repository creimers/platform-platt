import loadGoogleMapsAPI from 'load-google-maps-api'

class googleAutocompleteCmpCtrl {
  /* @ngInject */
  constructor($element) {
    this.$element = $element;
  }

  $onInit() {
    try{
      google
    }
    catch(err){
      loadGoogleMapsAPI({
          key: 'AIzaSyBon5CXrbuZJcsyGCAuZJcp4HzQi81eFoQ',
          //v: '3.20', //defaults to latest 3.X anyhow
          libraries: 'weather,geometry,visualization,places',
          language: 'de'
      }).then(() => {
        this._initializeAutocomplete()
      })
    }
  }

  _initializeAutocomplete() {
    var autocompleteListener = ()=> {
      var model = {location: {city: {}}}
      var place = autocomplete.getPlace()
      for (let component of place.address_components) {
        var componentType = component.types[0]
        if ( componentType === 'postal_code') {
          model.location.postal_code = component.short_name
        }
        else if ( componentType === 'route') {
          model.location.street = component.long_name
        }
        else if ( componentType === 'locality') {
          model.location.city.name = component.long_name
        }
        else if ( componentType === 'street_number') {
          model.location.house_number = component.long_name
        }
      }

      model.location.lat = place.geometry.location.lat()
      model.location.lon = place.geometry.location.lng()

      this.onSelect({model: model})
    }

    const element = document.getElementById('autocomplete')
    var autocomplete = new google.maps.places.Autocomplete(
      (element),
      {types: ['geocode'], componentRestrictions: {country: 'de'}}
    )
    element.placeholder = ''

    autocomplete.addListener('place_changed', autocompleteListener)

  }
}

let googleAutocompleteCmp = {
  controller: 'googleAutocompleteCmpCtrl',
  template: require('./index.pug')(),
  bindings: {
    onSelect: '&',
    placeholder: '@'
  }
}

const MODULE_NAME = 'google-autocomplete'

angular.module(MODULE_NAME, [
])
  .component('googleAutocompleteCmp', googleAutocompleteCmp)
  .controller('googleAutocompleteCmpCtrl', googleAutocompleteCmpCtrl)

export default MODULE_NAME

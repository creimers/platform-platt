import { BASE_URL } from '../constants/http'

import * as types from '../constants/actiontypes'
import * as actions from './index'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)


describe('auth actions', ()=> {

  //afterEach(() => {
    //nock.cleanAll()
  //})

  it('should login', ()=> {
    let user = {email: 'a@b.c', password: 'secret'}

    //nock(BASE_URL)
      //.post('authenticate/', user)
      //.reply(200, {data: {token: 'asdflkj', user: {email: 'a@b.c'}}})

    const expectedActions = [actions.LOGIN_REQUEST, actions.LOGIN_SUCCESS]
    const store = mockStore({auth: {}})

    return store.dispatch(actions.loginUser(user))
      .then(() => {
        let dispatchedActionTypes = store.getActions().map((o)=> o.type)
        console.log(dispatchedActionTypes)
      })
    //actions.loginUser(user)
    //console.log(dispatchedActionTypes)
    //expect(dispatchedActionTypes).toEqual(expectedActions)
    //debugger
  })
})

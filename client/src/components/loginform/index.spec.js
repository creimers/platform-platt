import { LoginFormCtrl } from './index'

let controller
let onSubmitSpy = jasmine.createSpy('onSubmit')

describe('component: loginFormCmp', ()=> {

  beforeEach(()=> {
    controller = new LoginFormCtrl()
    controller.onSubmit = onSubmitSpy
  })

  it('login should call onSubmit', ()=> {
    let model = {email: 'one@two.com', password: 'secret'}
    expect(controller.onSubmit).toBeDefined()
    controller.onLogin(model)
    expect(onSubmitSpy).toHaveBeenCalled()
  })

})

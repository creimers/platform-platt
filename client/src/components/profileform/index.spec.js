import { ProfileFormCtrl } from './index'

let controller
let onSubmitSpy = jasmine.createSpy('onSave')

describe('component: loginFormCmp', ()=> {

  beforeEach(()=> {
    controller = new ProfileFormCtrl()
    controller.onSave = onSubmitSpy
    let profile = {
      email: 'one@two.com',
      password: 'secret',
      firstname: 'John',
      lastname: 'Lennon',
      color: '#000000'
    }
    controller.model = {}
    controller.model.profile = profile
  })

  it('save should call onSave', ()=> {
    expect(controller.handleOnSave).toBeDefined()
    controller.handleOnSave()
    expect(onSubmitSpy).toHaveBeenCalled()
  })

})

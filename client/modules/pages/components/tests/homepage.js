const {describe, it} = global
import {expect} from 'chai'
import {shallow} from 'enzyme'
import Homepage from '../homepage.jsx'

// TODO adjust these tests for your homepage
describe('homepage', ()=>{
  const el = shallow(<Homepage />)
  it('Display page name',()=>{
    expect(el.find('h1').text()).to.be.match(/Web starter/)
  })
})

import Vue from 'vue'
import Formly from '@/components/ic-formly/ic-formly.vue'

describe('ic-formly.vue', () => {
  const propsData = {
    value: {
      duck: {
        name: 'Charlie',
        specie: 'Mountain Duck'
      }
    },
    fields: [
      {
        key: 'duck.name',
        type: 'input',
        required: true
      }, {
        key: 'duck.specie',
        type: 'input',
        required: true
      }
    ]
  }

  let Constructor, vm;

  beforeEach(() => {
    Constructor = Vue.extend(Formly);
    vm = new Constructor({
      propsData,
    }).$mount();
  })

  afterEach(() => vm.$destroy())

  it('should emit `submit` with the model values', done => {
    vm.$on('input', data => {
      expect(data.duck).to.deep.equal(propsData.value.duck);
      done();
    });

    vm.$nextTick().then(() => vm.submit());
  })

  it('should emit `error` when validation errors occurs', done => {
    vm.$destroy();
    propsData.value.duck.name = ''; // Force error
    vm = new Constructor({
      propsData,
    }).$mount();

    vm.$on('input', console.warn);
    vm.$on('error', () => done());

    vm.$nextTick().then(() => {
      vm.submit();
    });
  });
})

const Store = require('./src/Store')
const Action = require('./src/Action')
const State = require('./src/State')
const store = new Store()
store.configure({
  rootState: { users: { list: ['Jim', 'Jack', 'Paul'] }, Counter: 0 },
})

Action()
  .setName('INCREMENT')
  .hookToStore(store)
  .setAsync(true)
  .setOnDispatchListener(
    value =>
      new Promise(resolve => setTimeout(() => resolve(value * value), 1000)),
  )
  .make()

Action()
  .setName('INCREMENT')
  .hookToStore(store)
  .onSucceed((action, state) => ({
    Counter: state.Counter + action.payload,
  }))
  .make()

Action()
  .setName('INCREMENT')
  .hookToStore(store)
  .onSucceed((action, state) => ({
    Counter: state.Counter + action.payload + action.payload,
  }))
  .make()

const increment = Action.find('INCREMENT', store)

store.dispatch(increment.prepareForDispatch(4))

Action()
  .setName('DECREMENT')
  .hookToStore(store)
  .setOnDispatchListener(value => value * 2)
  .setSelfDispatch(true)
  .setOnDispatchArgs([66])
  .onSucceed((action, state) => ({ Counter: state.Counter - action.payload }))
  .make()

State.set({ test: 'redux-peach' }, store)

setTimeout(() => console.log(store.state), 200)

setTimeout(() => console.log(store.state), 1001)

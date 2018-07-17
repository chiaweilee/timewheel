import merge from './merge'
import option from './option'
import build from './build'

export default class TimeWheel {
  constructor (opt) {
    // merge custom option into default
    merge(option, opt)
    // get option
    const {duration, async: type, section} = option
    this.type = type
    this.duration = duration
    this.section = section
    // slots
    const slots = {}
    this.slots = slots
    // angle of slot
    let angle = 0
    this.angle = angle
    // engine control
    const park = this.park.bind(this)
    const driver = function () {
      // execute slot
      const slot = slots[angle]
      if (!!slot && slot instanceof Array) {
        slot.forEach(function (s) {
          if (typeof s === 'function') {
            s(park)
          }
        })
      }
      // drive wheel angle
      if (angle >= section - 1) {
        angle = 0
        this.angle = angle
      } else {
        angle += 1
        this.angle = angle
      }
    }
    // build wheel
    this.wheel = build(type)(driver.bind(this), duration)
  }
  park () {
    if (!this.wheel) return
    this.type ? window.clearInterval(this.wheel) : window.clearTimeout(this.wheel)
    this.wheel = null
  }
  add ({start, duration, fn}) {
    // type check
    const durationType = typeof duration
    const fnType = typeof fn
    if (durationType !== 'number') {
      console.warn('Except start \'number\', but found \'' + durationType + '\'.')
      return this
    }
    if (fnType !== 'function') {
      console.warn('Except duration \'function\', but found \'' + fnType + '\'.')
      return this
    }
    const pos = start || Math.floor(duration / this.duration) - 1
    const posType = typeof pos
    if (pos !== undefined) {
      if (posType !== 'number') {
        console.warn('Except start position \'number\', but found \'' + posType + '\'.')
        return this
      }
      if (pos >= this.section) {
        console.warn('Can not add to slot ' + pos + ', only ' + this.section + ' slot(s) found.')
        return this
      }
    }
    // duration match perfect or not (delay)
    const diff = duration % this.duration
    // pre-init slot
    if (!this.slots[pos]) {
      this.slots[pos] = []
    }
    this.slots[pos].push(function () {
      setTimeout(fn, diff)
    })
    // plug into slot
    return this
  }
}

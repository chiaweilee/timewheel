export default (object, target) => {
  for (let item in target) {
    if (target.hasOwnProperty(item)) {
      object[item] = target[item]
    }
  }
}

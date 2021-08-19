import { DirectiveBinding } from 'vue'

const datasetName = 'resizeListenerId'
let counter = 0
const callbacks: Record<string, () => void> = {}
const onResize = (e: ResizeObserverEntry[]) => {
  e.forEach((f) => callbacks[(f.target as HTMLElement).dataset[datasetName]!]())
}

const resizeObserver = new ResizeObserver(onResize)

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    if (el.dataset === undefined) throw new Error('onResize directive can only be used on a HTMLElement.')
    if (binding.value === undefined) throw new Error('onResize directive requires a binding.')
    el.dataset[datasetName] = counter.toString()
    callbacks[counter.toString()] = binding.value
    // console.log(`Added data attribute ${datasetName} = ${counter}`, callbacks)
    resizeObserver.observe(el)
    counter++
  },
  beforeUnmount(el: HTMLElement) {
    if (el.dataset[datasetName] && callbacks[el.dataset[datasetName]!]) {
      delete callbacks[el.dataset[datasetName]!]
      resizeObserver.unobserve(el)
    }
    // console.log(`Deleted CB for el with data attribute = ${counter}`, callbacks)
  },
}

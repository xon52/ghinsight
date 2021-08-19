import { onUnmounted } from 'vue'

export const useWindowEvent = <TType extends keyof WindowEventMap>(
  type: TType,
  listener: (this: Window, ev: WindowEventMap[TType]) => any,
  options?: boolean | AddEventListenerOptions
) => {
  window.addEventListener(type, listener, options)
  onUnmounted(() => window.removeEventListener(type, listener, options))
}

export default useWindowEvent

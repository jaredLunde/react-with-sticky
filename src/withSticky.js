import React from 'react'
import {asyncComponent} from 'react-async-component'
import getDisplayName from 'react-display-name'


export const canStick = (function() {
  if (typeof document === 'undefined') {
    return false
  }

  const el = document.createElement('a')
  const mStyle = el.style
  mStyle.cssText = "position:sticky;position:-webkit-sticky;position:-ms-sticky;"
  return mStyle.position.indexOf('sticky') !== -1
})();



const Sticky = asyncComponent({resolve: () => import('react-sticky-fill')})


export default function withSticky (Component) {
  function Sticker (props) {
    return canStick || typeof window === 'undefined'
      ? <Component {...props}/>
      : <Sticky children={<Component {...props}/>}/>
  }

  if (__DEV__) {
    Sticker.displayName = `withSticky(${getDisplayName(Component)})`
  }

  return Sticker
}

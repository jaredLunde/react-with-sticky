import React from 'react'
import {lazy} from 'react-broker'
import getDisplayName from 'react-display-name'
const Sticky = lazy('react-sticky-fill', () => import(/* webpackChunkName: "react-sticky-fill" */'react-sticky-fill'))


export const canStick = (function() {
  if (typeof document === 'undefined') {
    return false
  }

  const el = document.createElement('a')
  const mStyle = el.style
  mStyle.cssText = "position:sticky;position:-webkit-sticky;position:-ms-sticky;"
  return mStyle.position.indexOf('sticky') !== -1
})();


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

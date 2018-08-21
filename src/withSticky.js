import React from 'react'
import universal from 'react-universal-component'
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



const Sticky = universal(
  import('react-sticky-fill'),
  {loading: function () { return '' }}
)


export default function withSticky (Component) {
  function Sticker (props) {
    return canStick || typeof window === 'undefined'
      ? <Component {...props}/>
      : <Sticky children={<Component {...props}/>}/>
  }

  Sticker.displayName = `withSticky(${getDisplayName(Component)})`
  return Sticker
}

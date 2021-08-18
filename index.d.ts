declare module '@qwp/react-scroll-up' {
  import React from 'react';

  interface Props {
    showUnder: number,
    topPosition?: number,
    easing?: 'linear' | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad' | 'easeInCubic' |
      'easeOutCubic' | 'easeInOutCubic' | 'easeInQuart' | 'easeOutQuart' | 'easeInOutQuart' | 'easeInQuint' |
      'easeOutQuint' | 'easeInOutQuint' | 'easeInSine' | 'easeOutSine' | 'easeInOutSine' | 'easeInExpo' | 'easeOutExpo' |
      'easeInOutExpo' | 'easeInCirc' | 'easeOutCirc' | 'easeInOutCirc' | 'easeInElastic' | 'easeOutElastic' |
      'easeInOutElastic' | 'easeInBack' | 'easeOutBack' | 'easeInOutBack' | 'easeInBounce' | 'easeOutBounce' |
      'easeInOutBounce',
    duration?: number,
    style?: object,
    onShow?: () => void,
    onHide?: () => void
  }
  type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
  export type ScrollToTopProps = Props & NativeAttrs

  export default class ScrollToTop extends React.Component<ScrollToTopProps, any> {}
}

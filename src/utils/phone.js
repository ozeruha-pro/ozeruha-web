export const onPhoneClick = (label) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'click', {
      action: 'phone click',
      label,
    })
  }
}

// import { sendEventToFb } from "./facebook"

const sendLead = ({ name, phone, message, form }) => {
  const http = new XMLHttpRequest()
  const url = 'http://2299893.sashagol.web.hosting-test.net/post_lead_to_tg.php'
  const params = {
    name,
    phone,
    url: window.location.href,
    message,
    form,
  }

  return new Promise((resolve) => {
    http.open('POST', url, true)

    http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

    http.onreadystatechange = function () {
      if (http.readyState === 4) {
        http.status === 200 ? resolve(true) : resolve(false)
      }
    }

    http.send(
      Object.keys(params)
        .map((key) => `${key}=${encodeURIComponent(params[key]) || ''}`)
        .join('&')
    )

    // sendEventToFb("Lead")
  })
}

export default sendLead

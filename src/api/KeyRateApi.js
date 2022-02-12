import XMLParser from "react-xml-parser"

// var xml = new XMLParser()

const KeyRateApi = (props) => {
    var data = `<?xml version="1.0" encoding="utf-8"?>\r\n<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">\r\n  <soap12:Body>\r\n    <KeyRateXML xmlns="http://web.cbr.ru/">\r\n      <fromDate>${props}</fromDate>\r\n      <ToDate>${props}</ToDate>\r\n    </KeyRateXML>\r\n  </soap12:Body>\r\n</soap12:Envelope>`

    var xhr = new XMLHttpRequest()
    xhr.withCredentials = true

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText)
        }
    })

    xhr.open("POST", "http://www.cbr.ru/DailyInfoWebServ/DailyInfo.asmx")
    xhr.setRequestHeader("SOAPAction", "http://web.cbr.ru/MainInfoXML")
    xhr.setRequestHeader("Content-Type", "application/soap+xml; charset=utf-8")
    xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    xhr.setRequestHeader("Access-Control-Allow-Credentials", "true")

    xhr.send(data)
}

export default KeyRateApi

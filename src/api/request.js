import {BASE_API_URL, ISU_BASE_API_URL} from "../config";
import {parseXML, toXML} from "../utils/xmlParser";

export const request = async (url, method = 'GET', body = null, isu = false) => {
	let response
	// console.log('request body', body)
	let options = {
		method: method,
		headers: {
		'accept': 'application/xml',
		'content-type': 'application/xml'
		}
	}

	if (body) {
		const stringBody = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>${toXML(body).toString()}`
		// console.log('string body', stringBody)
		console.log('body', toXML(body))
		options.body = toXML(body)
	}

	try {
		response = await fetch(`${isu ? ISU_BASE_API_URL : BASE_API_URL}${url}`, options)

		// console.log('request response', await response.text())

		if (response.ok) {
			let responseString = await response.text()
			let json
			try {
				json = parseXML(responseString)
			} catch (e) {
				responseString = responseString.split("<?xml version=\"1.0\" encoding=\"UTF-8\"?>")
				const editedResponseString = `<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response>${responseString[1]}</Response>`
				json = parseXML(editedResponseString)
			}
			return json
		} else {
			const responseString = await response.text()
			const responseJson = parseXML(responseString)
			console.error(responseJson.Error.message._text)
			throw new Error(responseJson.Error.message._text)
		}
	} catch (e) {
		throw e
	}
}

import {BASE_API_URL} from "../config";
import {parseXML, toXML} from "../utils/xmlParser";

export const request = async (url, method = 'GET', body = null) => {
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
		const plug = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
			"<Vehicle>\n" +
			"   <name>Name23</name>\n" +
			"   <coordinates>\n" +
			"       <x>1.1</x>\n" +
			"       <y>4</y>\n" +
			"   </coordinates>\n" +
			"   <enginePower>80</enginePower>\n" +
			"   <numberOfWheels>4</numberOfWheels>\n" +
			"   <distanceTravelled>4444.1</distanceTravelled>\n" +
			"   <type>CAR</type>\n" +
			"</Vehicle>"
		options.body = toXML(body)
	}

	try {
		response = await fetch(`${BASE_API_URL}${url}`, options)

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
			// responseString = responseString.split("<?xml version=\"1.0\" encoding=\"UTF-8\"?>")
			// console.log('responseString', responseString)
			// console.log('responseString', responseString[1])
			// const editedResponseString = `<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response>${responseString[1]}</Response>`
			// console.log('editedResponseString', editedResponseString)
			// return parseXML(editedResponseString)
			// return parseXML(responseString)
			// return await new window.DOMParser().parseFromString(responseString, "text/xml")
		} else {
			const responseJson = await response.json()
			console.log('status', response.status)
			// console.log('request responseJson', responseJson)
			// throw new Error(await responseJson.description)
			throw new Error('Что-то пошло не так...')
		}
	} catch (e) {
		throw e
	}
}

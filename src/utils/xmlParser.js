// import * as convert from "xml-js";

import {js2xml, json2xml, xml2js} from "xml-js";

export const parseXML = (xml) => {
	return xml2js(xml, {compact: true, spaces: 4})
}

export const toXML = (json) => {
	return js2xml(json, {compact: true, spaces: 4})
}

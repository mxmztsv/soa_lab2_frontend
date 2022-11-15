import {parseXML, toXML} from "../utils/xmlParser";

export const getStudyGroups = async (data) => {

	console.log(data)

	const response = [
		{
			'id': 123,
			'name': 'P34101',
			'coordinates': {
				'x': 12,
				'y': 34
			},
			'creationDate': '1045-52-93T00:00:56Z',
			'studentsCount': 32,
			'shouldBeExpelled': 2,
			'transferredStudents': 1,
			'semesterEnum': 'THIRD',
			'groupAdmin': 'Ольга'
		}
	]

	const responseXML = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
\t<StudyGroupDto>
\t\t<id>1232</id>
\t\t<name>P34111</name>
\t\t<coordinates>
\t\t\t<x>12</x>
\t\t\t<y>34</y>
\t\t</coordinates>
\t\t<creationDate>1045-52-93T00:00:56Z</creationDate>
\t\t<studentsCount>32</studentsCount>
\t\t<shouldBeExpelled>2</shouldBeExpelled>
\t\t<transferredStudents>1</transferredStudents>
\t\t<semesterEnum>THIRD</semesterEnum>
\t\t<groupAdmin>
\t\t\t<name>Ильинская Ольга</name>
\t\t\t<height>185</height>
\t\t\t<weight>92</weight>
\t\t\t<passportID>1234 123456</passportID>
\t\t\t<nationality>RUSSIA</nationality>
\t\t</groupAdmin>
\t</StudyGroupDto>
\t<StudyGroupDto>
\t\t<id>1234</id>
\t\t<name>P34101</name>
\t\t<coordinates>
\t\t\t<x>12</x>
\t\t\t<y>34</y>
\t\t</coordinates>
\t\t<creationDate>1045-52-93T00:00:56Z</creationDate>
\t\t<studentsCount>32</studentsCount>
\t\t<shouldBeExpelled>2</shouldBeExpelled>
\t\t<transferredStudents>1</transferredStudents>
\t\t<semesterEnum>THIRD</semesterEnum>
\t\t<groupAdmin>
\t\t\t<name>Зайцев Максим</name>
\t\t\t<height>185</height>
\t\t\t<weight>92</weight>
\t\t\t<passportID>1234 123456</passportID>
\t\t\t<nationality>RUSSIA</nationality>
\t\t</groupAdmin>
\t</StudyGroupDto>
</Response>`

	const responseJSON = parseXML(responseXML)

	// console.log(responseJSON.Response.StudyGroupDto)

	// return response
	return responseJSON.Response.StudyGroupDto
}

export const getStudyGroupById = async (id) => {

	console.log('group id', id)

	const response = [
		{
			'id': 123,
			'name': 'P34101',
			'coordinates': {
				'x': 12,
				'y': 34
			},
			'creationDate': '1045-52-93T00:00:56Z',
			'studentsCount': 32,
			'shouldBeExpelled': 2,
			'transferredStudents': 1,
			'semesterEnum': 'THIRD',
			'groupAdmin': 'Ольга'
		}
	]

	const responseXML = `<?xml version="1.0" encoding="UTF-8"?>
<StudyGroupDto>
\t<id>1234</id>
\t<name>P34101</name>
\t<coordinates>
\t\t<x>12</x>
\t\t<y>34</y>
\t</coordinates>
\t<creationDate>2022-05-05</creationDate>
\t<studentsCount>32</studentsCount>
\t<shouldBeExpelled>2</shouldBeExpelled>
\t<transferredStudents>1</transferredStudents>
\t<semesterEnum>EIGHTH</semesterEnum>
\t<groupAdmin>
\t\t\t<name>Ильинская Ольга</name>
\t\t\t<height>185</height>
\t\t\t<weight>92</weight>
\t\t\t<passportID>1234 654321</passportID>
\t\t\t<nationality>RUSSIA</nationality>
\t</groupAdmin>
</StudyGroupDto>`

	const responseJSON = parseXML(responseXML)

	// console.log(parseXML(responseXML))

	console.log(responseJSON.StudyGroupDto)

	// return response
	return responseJSON.StudyGroupDto
}

export const getStudentsByGroupId = async (id) => {

	const responseXML = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
\t<PersonDto>
\t\t\t<name>Зайцев Максим</name>
\t\t\t<height>185</height>
\t\t\t<weight>92</weight>
\t\t\t<passportID>1234 123456</passportID>
\t\t\t<nationality>RUSSIA</nationality>
\t</PersonDto>
\t<PersonDto>
\t\t\t<name>Ильинская Ольга</name>
\t\t\t<height>185</height>
\t\t\t<weight>92</weight>
\t\t\t<passportID>1234 654321</passportID>
\t\t\t<nationality>RUSSIA</nationality>
\t</PersonDto>
\t<PersonDto>
\t\t\t<name>Чупанов Али</name>
\t\t\t<height>185</height>
\t\t\t<weight>92</weight>
\t\t\t<passportID>1234 123654</passportID>
\t\t\t<nationality>RUSSIA</nationality>
\t</PersonDto>
</Response>`

	const responseJSON = parseXML(responseXML)
	console.log(responseJSON.Response.PersonDto)

	return responseJSON.Response.PersonDto
}

export const addGroup = (data) => {
	console.log(data)
}

export const saveGroup = (data) => {
	console.log(data)
}

export const getStudentsAmount = () => {
	return 12
}


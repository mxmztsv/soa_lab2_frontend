import {parseXML, toXML} from "../utils/xmlParser";
import {request} from "./request";
import toast from "react-hot-toast";

export const getStudyGroups = async (data) => {

	console.log(data)

	let url = `/study-groups?page=${data.page}&limit=${data.limit}&sort_by=${data.sort_by}&order=${data.order}`

	for (let key in data) {
		if (data[key] !== "") {
			if (key !== 'sort_by' && key !== 'order' && key !== 'page' && key !== 'limit') {
				url = url + `&${key}=${data[key]}`
			}
		}
	}

	console.log('url', url)

	const response = await request(url)

	if (response.ListOfStudyGroups.StudyGroupDTO === undefined) {
		return []
	} else if (response.ListOfStudyGroups.StudyGroupDTO.length !== undefined) {
		return response.ListOfStudyGroups.StudyGroupDTO
	} else {
		return [response.ListOfStudyGroups.StudyGroupDTO]
	}
}

export const getStudyGroupById = async (id) => {
	const response = await request(`/study-groups/${id}`)
	return response.StudyGroupDTO
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

	// const responseJSON = parseXML(responseXML)
	// console.log(responseJSON.Response.PersonDto)

	const response = await request(`/group/${id}/students`, "GET", null, true)

	console.log('students by group id', response.ListOfPersons)

	// return response.ListOfPersons.PersonDTO

	if (response.ListOfPersons.PersonDTO === undefined) {
		return []
	} else if (response.ListOfPersons.PersonDTO.length !== undefined) {
		return response.ListOfPersons.PersonDTO
	} else {
		return [response.ListOfPersons.PersonDTO]
	}
}

export const addGroup = async (data) => {
	console.log(toXML(data))
	request('/study-groups', 'POST', data).then((response) => {
		toast.success(`Группа ${response.StudyGroupDTO.name._text} добавлена`)
		return response
	}).catch((e) => {
		toast.error(e.message)
	})

}

export const saveGroup = (id, data) => {
	console.log(toXML(data))
	request(`/study-groups/${id}`, 'PATCH', data).then((response) => {
		toast.success(`Группа ${response.StudyGroupDTO.name._text} обновлена`)
		return response
	}).catch((e) => {
		toast.error(e.message)
	})
}

export const deleteGroup = async (id) => {
	request(`/study-groups/${id}`, 'DELETE').then((response) => {
		toast.success(`Группа удалена`)
		return response
	}).catch((e) => {
		toast.error(e.message)
	})
}

export const addStudentToGroup = (id, data) => {
	console.log('new student', toXML(data))
	request(`/group/${id}/add-student`, 'POST', data, true).then((response) => {
		toast.success(`Студент ${response.PersonDTO.name._text} добавлен`)
	}).catch((e) => {
		toast.error(e.message)
	})
}

export const expelAllStudentsFromGroup = (id) => {
	request(`/group/${id}/expel-all`, 'POST', null, true).then((response) => {
		toast.success(`Все студенты группы отчислены`)
	}).catch((e) => {
		toast.error(e.message)
	})
}

export const getStudentsAmount = async () => {
	const response = await request('/study-groups/students/amount')
	return response.sumStudentCount._text
}

export const countEqualsBySize = async (studentsAmount) => {
	const response = await request(`/study-groups/count-equals-by-size/${studentsAmount}`)
	return response.Response
}

export const countMoreTransferredStudents = async (transferredStudents) => {
	const response = await request(`/study-groups/count-with-more-transferred-students-than/${transferredStudents}`)
	console.log('countMoreTransferredStudents', response)
	if (response.Response === undefined) {
		return response
	} else {
		return response.Response
	}
}




import {parseXML, toXML} from "../utils/xmlParser";
import {request} from "./request";
import toast from "react-hot-toast";

export const getStudyGroups = async (data) => {

	console.log(data)

	let url = `/study-groups?page=${data.page}&limit=${data.limit}`

	for (let key in data) {
		if (data[key] !== "") {
			if (key !== 'page' && key !== 'limit') {
				url = url + `&${key}=${data[key]}`
			}
		}
	}

	console.log('url', url)

	const response = await request(url)

	if (response.ListStudyGroupResponseDTO.ListOfStudyGroups.StudyGroupDTO === undefined) {
		return []
	} else if (response.ListStudyGroupResponseDTO.ListOfStudyGroups.StudyGroupDTO.length !== undefined) {
		return response.ListStudyGroupResponseDTO.ListOfStudyGroups.StudyGroupDTO
	} else {
		return [response.ListStudyGroupResponseDTO.ListOfStudyGroups.StudyGroupDTO]
	}
}

export const getStudyGroupById = async (id) => {
	const response = await request(`/study-groups/${id}`)
	return response.StudyGroupResponseDTO
}

export const getStudentsByGroupId = async (id) => {

	const response = await request(`/study-groups/${id}/students`, "GET")

	if (response.ListPersonResponseDTO.ListOfPersons.PersonDTO === undefined) {
		return []
	} else if (response.ListPersonResponseDTO.ListOfPersons.PersonDTO.length !== undefined) {
		return response.ListPersonResponseDTO.ListOfPersons.PersonDTO
	} else {
		return [response.ListPersonResponseDTO.ListOfPersons.PersonDTO]
	}
}

export const addGroup = async (data) => {
	console.log(toXML(data))
	request('/study-groups', 'POST', data).then((response) => {
		toast.success(`Группа ${response.StudyGroupResponseDTO.name._text} добавлена`)
		return response
	}).catch((e) => {
		toast.error(e.message)
	})

}

export const saveGroup = async (id, data) => {
	console.log(toXML(data))
	request(`/study-groups/${id}`, 'PATCH', data).then((response) => {
		toast.success(`Группа ${response.StudyGroupResponseDTO.name._text} обновлена`)
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

export const addStudentToGroup = async (id, data) => {
	console.log('new student', toXML(data))
	request(`/group/${id}/add-student`, 'POST', data, true).then((response) => {
		toast.success(`Студент ${response.PersonResponseDTO.name._text} добавлен`)
	}).catch((e) => {
		toast.error(e.message)
	})
}

export const expelAllStudentsFromGroup = async (id) => {
	request(`/group/${id}/expel-all`, 'POST', null, true).then((response) => {
		toast.success(`Все студенты группы отчислены`)
	}).catch((e) => {
		toast.error(e.message)
	})
}

export const getStudentsAmount = async () => {
	const response = await request('/study-groups/students/amount')
	return response.SumStudentCountDTO.sum._text
}

export const countEqualsBySize = async (studentsAmount) => {
	const response = await request(`/study-groups/count-equals-by-size/${studentsAmount}`)
	return response.CountStudyGroupDTO
}

export const countMoreTransferredStudents = async (transferredStudents) => {
	const response = await request(`/study-groups/count-with-more-transferred-students-than/${transferredStudents}`)
	console.log('countMoreTransferredStudents', response)
	// if (response.Response === undefined) {
	// 	return response
	// } else {
	// 	return response.CountStudyGroupDTO
	// }
	return response.CountStudyGroupDTO
}




import styles from './EditModal.module.css'
import {Layout} from "../../components/Layout/Layout";
import {Card} from "../../components/Card/Card";
import {useForm} from "react-hook-form";
import {InputWrapper} from "../../components/Input/InputWrapper";
// import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
	addGroup,
	getStudentsByGroupId,
	fetchVehicleById,
	saveGroup,
	addVehicle,
	saveVehicle,
	getStudyGroupById, deleteGroup, expelAllStudentsFromGroup
} from "../../api/api";
import {toXML} from "../../utils/xmlParser";
import {AddStudentModal} from "../AddStudentModal/AddStudentModal";

export const EditModal = ({ close, id = null, updateGroups }) => {

	const [students, setStudents] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false)

	const openModal = () => {
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
	}

	const deleteHandler = () => {
		deleteGroup(id).then(() => {
			updateGroups()
			close()
		})
	}

	const expelAllHandler = () => {
		expelAllStudentsFromGroup(id).then(() => {
			getData()
		})
	}

	const { register, handleSubmit, formState: { errors }, setValue } = useForm()

	const onSubmit = async (data) => {
		let dto = {
			StudyGroupDTO: {
				...data,
				coordinates: {
					x: data.x,
					y: data.y
				}
			}
		}
		delete dto.StudyGroupDTO.x
		delete dto.StudyGroupDTO.y
		if (id) {
			saveGroup(id, dto).then(() => {
				updateGroups()
				close()
			})
		} else {
			addGroup(dto).then(() => {
				updateGroups()
				close()
			})
		}
	}

	const getData = async () => {
		if (id) {
			getStudentsByGroupId(id).then((studs) => {
				setStudents(studs)
			}).then(() => {
				getStudyGroupById(id).then((groupData) => {
					setValue("name", groupData.name._text)
					// setValue("creationDate", groupData.creationDate._text)
					setValue("x", groupData.coordinates.x._text)
					setValue("y", groupData.coordinates.y._text)
					setValue("studentsCount", groupData.studentsCount._text)
					setValue("shouldBeExpelled", groupData.shouldBeExpelled._text)
					setValue("transferredStudents", groupData.transferredStudents._text)
					setValue("semesterEnum", groupData.semesterEnum._text)
					if (groupData.groupAdmin.id !== undefined) {
						setValue("groupAdminId", groupData.groupAdmin.id._text)
					}
				})
			})
		} else {
			getStudentsByGroupId(id).then((studs) => {
				setStudents(studs)
			})
		}
	}

	useEffect(() => {
		getData()
	}, [])

	return (
		<>
			{ isModalOpen && <AddStudentModal close={closeModal} groupId={id}/> }
			<div className={styles.bg} onClick={close}/>
			<div className={styles.modal}>
				{/*<h1 className="title">Редактор группы</h1>*/}
				<Card title="Редактор группы">
					{ id && <h2 className={styles.itemId}>id {id}</h2> }
					<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
						<div className={styles.formInnerContainer}>
							<div className={styles.formColumn}>
								<InputWrapper title="Название">
									<input
										type="text"
										className={styles.input}
										placeholder="Название"
										{...register('name')}
									/>
								</InputWrapper>
								<InputWrapper title="Координата X">
									<input
										type="text"
										className={styles.input}
										placeholder="x"
										{...register('x')}
									/>
								</InputWrapper>
								<InputWrapper title="Координата Y">
									<input
										type="text"
										className={styles.input}
										placeholder="y"
										{...register('y')}
									/>
								</InputWrapper>
								<InputWrapper title="Кол-во студентов">
									<input
										type="text"
										className={styles.input}
										placeholder="Количество студентов"
										{...register('studentsCount')}
									/>
								</InputWrapper>
							</div>
							<div className={styles.formColumn}>
								<InputWrapper title="К отчислению">
									<input
										type="text"
										className={styles.input}
										placeholder="Количество студентов к отчислению"
										{...register('shouldBeExpelled')}
									/>
								</InputWrapper>
								<InputWrapper title="Переведенных">
									<input
										type="text"
										className={styles.input}
										placeholder="Количество переведенных студентов"
										{...register('transferredStudents')}
									/>
								</InputWrapper>
								<InputWrapper title="Семестр">
									<select {...register('semesterEnum')}>
										<option value="">
											-
										</option>
										<option value="THIRD">
											3
										</option>
										<option value="FIFTH">
											5
										</option>
										<option value="EIGHTH">
											8
										</option>
									</select>
								</InputWrapper>
								<InputWrapper title="Админ группы">
									<select {...register('groupAdminId')}>
										<option value="null">
											-
										</option>
										{
											students.map((student, index) => {
												return (
													<option value={student.id._text} key={index}>
														{student.name._text}
													</option>
												)
											})
										}
									</select>
								</InputWrapper>
							</div>
						</div>
						{
							id && <div className={styles.btnRow}>
								<button className="btn_outlined" type="button" onClick={openModal}>Добавить студента</button>
								<button className="btn_outlined" type="button" onClick={expelAllHandler}>Отчислить всех</button>
							</div>
						}
						<div className={styles.btnRow}>
							<button className="btn_filled" type="submit">Сохранить</button>
							<button className="btn_outlined" type="button" onClick={close}>Отмена</button>
							{
								id && <>
									<button className="btn_outlined" type="button" onClick={deleteHandler}>Удалить</button>
								</>
							}

						</div>
					</form>
				</Card>
			</div>
		</>
	)
}

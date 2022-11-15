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
	getStudyGroupById
} from "../../api/api";
import {toXML} from "../../utils/xmlParser";
import {AddStudentModal} from "../AddStudentModal/AddStudentModal";

export const EditModal = ({ close, id = null }) => {

	const [students, setStudents] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false)

	const openModal = () => {
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
	}

	const { register, handleSubmit, formState: { errors }, setValue } = useForm()

	const onSubmit = async (data) => {
		let dto = {
			Vehicle: {
				...data,
				coordinates: {
					x: data.x,
					y: data.y
				}
			}
		}
		delete dto.Vehicle.x
		delete dto.Vehicle.y
		if (id) {
			const response = await saveGroup(dto)
		} else {
			const response = await addGroup(dto)
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
					setValue("shouldBeExpelled", groupData.shouldBeExpelled._text)
					setValue("transferredStudents", groupData.transferredStudents._text)
					setValue("semester", groupData.semesterEnum._text)
					setValue("group_admin_name", groupData.groupAdmin.passportID._text)
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
								<InputWrapper title="К отчислению">
									<input
										type="text"
										className={styles.input}
										placeholder="Количество студентов к отчислению"
										{...register('shouldBeExpelled')}
									/>
								</InputWrapper>
							</div>
							<div className={styles.formColumn}>
								<InputWrapper title="Переведенных">
									<input
										type="text"
										className={styles.input}
										placeholder="Количество переведенных студентов"
										{...register('transferredStudents')}
									/>
								</InputWrapper>
								<InputWrapper title="Семестр">
									<select {...register('semester')}>
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
									<select {...register('group_admin_name')}>
										<option value="">
											-
										</option>
										{
											students.map((student, index) => {
												return (
													<option value={student.passportID._text} key={index}>
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
								<button className="btn_outlined" type="button">Отчислить всех</button>
							</div>
						}
						<div className={styles.btnRow}>
							<button className="btn_filled" type="submit">Сохранить</button>
							<button className="btn_outlined" type="button" onClick={close}>Отмена</button>
							{
								id && <>
									<button className="btn_outlined" type="button">Удалить</button>
								</>
							}

						</div>
					</form>
				</Card>
			</div>
		</>
	)
}

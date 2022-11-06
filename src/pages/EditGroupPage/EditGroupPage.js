import styles from './EditGroupPage.module.css'
import {Layout} from "../../components/Layout/Layout";
import {Card} from "../../components/Card/Card";
import {useForm} from "react-hook-form";
import {InputWrapper} from "../../components/Input/InputWrapper";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {addGroup, getStudentsByGroupId, getStudyGroupById, saveGroup} from "../../api/api";

export const EditGroupPage = () => {

	const [groupId, setGroupId] = useState(null)
	const [students, setStudents] = useState([])

	const params = useParams()
	const navigate = useNavigate()

	const { register, handleSubmit, formState: { errors }, setValue } = useForm()

	const onSubmit = async (data) => {
		if (params.id !== undefined) {
			const response = await saveGroup(data)
		} else {
			const response = await addGroup(data)
		}
	}

	const getData = async () => {
		if (params.id !== undefined) {
			setGroupId(params.id)
			getStudentsByGroupId(params.id).then((studs) => {
				setStudents(studs)
			}).then(() => {
				getStudyGroupById(params.id).then((groupData) => {
					setValue("name", groupData.name._text)
					setValue("creationDate", groupData.creationDate._text)
					setValue("x", groupData.coordinates.x._text)
					setValue("y", groupData.coordinates.y._text)
					setValue("shouldBeExpelled", groupData.shouldBeExpelled._text)
					setValue("transferredStudents", groupData.transferredStudents._text)
					setValue("semester", groupData.semesterEnum._text)
					setValue("group_admin_name", groupData.groupAdmin.passportID._text)
				})
			})
		} else {
			getStudentsByGroupId(params.id).then((studs) => {
				setStudents(studs)
			})
		}
	}

	useEffect(() => {
		getData()
	}, [])

	return (
		<Layout>
			<div className={styles.page}>
				<h1 className="title">Редактор группы</h1>
				<Card title="Данные">
					<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
						<InputWrapper title="Название группы">
							<input
								type="text"
								className={styles.input}
								placeholder="Название"
								{...register('name')}
							/>
						</InputWrapper>
						<InputWrapper title="Дата создания">
							<input
								type="date"
								className={styles.input}
								placeholder="Дата создания"
								{...register('creationDate')}
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
						<div className={styles.btnRow}>
							<button className="btn_filled" type="submit">Сохранить</button>
							{
								groupId && <>
									<button className="btn_outlined" type="button">Удалить</button>
									<button className="btn_outlined" type="button" onClick={() => {navigate(`/edit-group/${groupId}/add-student`)}}>Добавить студента</button>
									<button className="btn_outlined" type="button">Отчислить всех</button>
								</>
							}

						</div>
					</form>
				</Card>
			</div>
		</Layout>
	)
}

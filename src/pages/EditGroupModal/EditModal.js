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

export const EditModal = ({ close, id = null, updateGroups = () => {
	console.log('testtest')} }) => {

	const [students, setStudents] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [shouldUpdate, setShouldUpdate] = useState(false)

	const openModal = () => {
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
	}

	const deleteHandler = () => {
		deleteGroup(id).then(() => {
			setTimeout(() => {
				updateGroups()
				close()
			}, 1000)
		})
	}

	const update = () => {
		setShouldUpdate(prevState => !prevState)
	}

	const expelAllHandler = () => {
		expelAllStudentsFromGroup(id).then(() => {
			setTimeout(() => {
				updateGroups()
				getData()
			}, 1000)
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
				setTimeout(() => {
					updateGroups()
				}, 1000)
			})
		} else {
			addGroup(dto).then(() => {
				setTimeout(() => {
					updateGroups()
				}, 1000)
			})
		}
	}

	const getData = async () => {
		console.log("fetching group data")
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
	}, [shouldUpdate])

	return (
		<>
			{ isModalOpen && <AddStudentModal close={closeModal} groupId={id} updateGroup={update}/> }
			<div className={styles.bg} onClick={close}/>
			<div className={styles.modal}>
				{/*<h1 className="title">???????????????? ????????????</h1>*/}
				<Card title="???????????????? ????????????">
					{ id && <h2 className={styles.itemId}>id {id}</h2> }
					<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
						<div className={styles.formInnerContainer}>
							<div className={styles.formColumn}>
								<InputWrapper title="????????????????">
									<input
										type="text"
										className={styles.input}
										placeholder="????????????????"
										{...register('name')}
									/>
								</InputWrapper>
								<InputWrapper title="???????????????????? X">
									<input
										type="text"
										className={styles.input}
										placeholder="x"
										{...register('x')}
									/>
								</InputWrapper>
								<InputWrapper title="???????????????????? Y">
									<input
										type="text"
										className={styles.input}
										placeholder="y"
										{...register('y')}
									/>
								</InputWrapper>
								<InputWrapper title="??????-???? ??????????????????">
									<input
										type="text"
										className={styles.input}
										placeholder="???????????????????? ??????????????????"
										{...register('studentsCount')}
									/>
								</InputWrapper>
							</div>
							<div className={styles.formColumn}>
								<InputWrapper title="?? ????????????????????">
									<input
										type="text"
										className={styles.input}
										placeholder="???????????????????? ?????????????????? ?? ????????????????????"
										{...register('shouldBeExpelled')}
									/>
								</InputWrapper>
								<InputWrapper title="????????????????????????">
									<input
										type="text"
										className={styles.input}
										placeholder="???????????????????? ???????????????????????? ??????????????????"
										{...register('transferredStudents')}
									/>
								</InputWrapper>
								<InputWrapper title="??????????????">
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
								<InputWrapper title="?????????? ????????????">
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
								<button className="btn_outlined" type="button" onClick={openModal}>???????????????? ????????????????</button>
								<button className="btn_outlined" type="button" onClick={expelAllHandler}>?????????????????? ????????</button>
							</div>
						}
						<div className={styles.btnRow}>
							<button className="btn_filled" type="submit">??????????????????</button>
							<button className="btn_outlined" type="button" onClick={close}>????????????</button>
							{
								id && <>
									<button className="btn_outlined" type="button" onClick={deleteHandler}>??????????????</button>
								</>
							}

						</div>
					</form>
				</Card>
			</div>
		</>
	)
}

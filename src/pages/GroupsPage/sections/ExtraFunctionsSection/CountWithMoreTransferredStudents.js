import styles from './ExtraFunctionsSection.module.css'
import {useForm} from "react-hook-form";
import {InputWrapper} from "../../../../components/Input/InputWrapper";
import {useState} from "react";
import {countEqualsBySize, countMoreTransferredStudents} from "../../../../api/api";

export const CountWithMoreTransferredStudents = ({ setResultGroups = () => {}, updateGroups = () => {} }) => {

	const [count, setCount] = useState(0)

	const { register, handleSubmit, reset } = useForm()

	const onSubmit = async (data) => {
		const response = await countMoreTransferredStudents(data.transferredStudents)
		setCount(response.count._text)
		// console.log('response.ListOfStudyGroups', response.ListOfStudyGroups)
		if (response.listStudyGroup.StudyGroupResponseDTO === undefined) {
			setResultGroups([])
		} else if (response.listStudyGroup.StudyGroupResponseDTO.length === undefined) {
			setResultGroups([response.listStudyGroup.StudyGroupResponseDTO])
		} else {
			setResultGroups(response.listStudyGroup.StudyGroupResponseDTO)
		}
	}

	return (
		<div className={styles.filterContainer}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<InputWrapper title="Кол-во объектов, transferredStudents которых больше">
					<input
						type="text"
						className={styles.input}
						placeholder="Значение transferredStudents"
						{...register('transferredStudents')}
					/>
				</InputWrapper>
				<p> = {count}</p>
				<div className={styles.btnRow}>
					<button className="btn_filled" type="submit">Применить</button>
					<button className="btn_outlined" type="reset" onClick={() => {
						reset()
						setCount(0)
						updateGroups()
					}}>Очистить</button>
				</div>
			</form>
		</div>
	)
}

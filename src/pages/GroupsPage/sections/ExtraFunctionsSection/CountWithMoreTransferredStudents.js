import styles from './ExtraFunctionsSection.module.css'
import {useForm} from "react-hook-form";
import {InputWrapper} from "../../../../components/Input/InputWrapper";
import {useState} from "react";
import {countEqualsBySize, countMoreTransferredStudents} from "../../../../api/api";

export const CountWithMoreTransferredStudents = ({ setResultGroups = () => {} }) => {

	const [count, setCount] = useState(0)

	const { register, handleSubmit, formState: { errors }, reset } = useForm()

	const onSubmit = async (data) => {
		const response = await countMoreTransferredStudents(data.transferredStudents)
		setCount(response.Count._text)
		console.log('response.ListOfStudyGroups', response.ListOfStudyGroups)
		if (response.ListOfStudyGroups.StudyGroupDTO === undefined) {
			setResultGroups([])
		} else if (response.ListOfStudyGroups.StudyGroupDTO.length === undefined) {
			setResultGroups([response.ListOfStudyGroups.StudyGroupDTO])
		} else {
			setResultGroups(response.ListOfStudyGroups.StudyGroupDTO)
		}
	}

	return (
		<div className={styles.filterContainer}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<InputWrapper title="Кол-во объектов, значение поля transferredStudents которых больше">
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
					}}>Очистить</button>
				</div>
			</form>
		</div>
	)
}

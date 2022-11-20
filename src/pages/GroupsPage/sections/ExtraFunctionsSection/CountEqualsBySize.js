import styles from './ExtraFunctionsSection.module.css'
import {useForm} from "react-hook-form";
import {InputWrapper} from "../../../../components/Input/InputWrapper";
import {useState} from "react";
import {countEqualsBySize} from "../../../../api/api";

export const CountEqualsBySize = ({ setResultGroups = () => {
	console.log('test')} }) => {

	const [count, setCount] = useState(0)

	const { register, handleSubmit, formState: { errors }, reset } = useForm()

	const onSubmit = async (data) => {
		const response = await countEqualsBySize(data.studentsCount)
		setCount(response.Count._text)
		console.log('response.ListOfStudyGroups.StudyGroupDTO', response.ListOfStudyGroups.StudyGroupDTO)
		if (response.ListOfStudyGroups.StudyGroupDTO.length === undefined) {
			setResultGroups([response.ListOfStudyGroups.StudyGroupDTO])
		} else {
			setResultGroups(response.ListOfStudyGroups.StudyGroupDTO)
		}
	}

	return (
		<div className={styles.filterContainer}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<InputWrapper title="Кол-во объектов, значение поля studentsCount которых =">
					<input
						type="text"
						className={styles.input}
						placeholder="Значение studentsCount"
						{...register('studentsCount')}
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

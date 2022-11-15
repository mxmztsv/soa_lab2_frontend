import styles from './AddStudentModal.module.css'
import {useForm} from "react-hook-form";
import {Card} from "../../components/Card/Card";
import {InputWrapper} from "../../components/Input/InputWrapper";
// import {useNavigate} from "react-router-dom";

export const AddStudentModal = ({ close, groupId }) => {

	// const navigate = useNavigate()
	const {register, handleSubmit, formState: {errors}} = useForm()
	const onSubmit = data => console.log(data)

	return (
		<>
			<div className={styles.bg} onClick={close}/>
			<div className={styles.modal}>
				<Card title="Добавление студента">
					<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
						<InputWrapper title="Имя">
							<input
								type="text"
								className={styles.input}
								placeholder="Имя"
								{...register('name')}
							/>
						</InputWrapper>
						<InputWrapper title="Рост">
							<input
								type="text"
								className={styles.input}
								placeholder="Рост"
								{...register('height')}
							/>
						</InputWrapper>
						<InputWrapper title="Вес">
							<input
								type="text"
								className={styles.input}
								placeholder="Вес"
								{...register('weight')}
							/>
						</InputWrapper>
						<InputWrapper title="Паспорт">
							<input
								type="text"
								className={styles.input}
								placeholder="Номер паспорта"
								{...register('passportID')}
							/>
						</InputWrapper>
						<InputWrapper title="Национальность">
							<select {...register('nationality')}>
								<option value="RUSSIA">
									Русский
								</option>
								<option value="FRANCE">
									Француз
								</option>
								<option value="SPAIN">
									Испанец
								</option>
								<option value="CHINA">
									Китаец
								</option>
								<option value="JAPAN">
									Японец
								</option>
							</select>
						</InputWrapper>
						<div className={styles.btnRow}>
							<button className="btn_filled" type="submit">Сохранить</button>
							{/*<button className="btn_outlined" type="button" onClick={() => {navigate(-1)}}>Отмена</button>*/}
							<button className="btn_outlined" type="button" onClick={close}>Отмена
							</button>
						</div>
					</form>
				</Card>
			</div>
		</>
	)
}

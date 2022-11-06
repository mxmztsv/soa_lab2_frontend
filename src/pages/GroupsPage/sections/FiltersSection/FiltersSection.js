import styles from './FiltersSection.module.css'
import {InputWrapper} from "../../../../components/Input/InputWrapper";
import {Card} from "../../../../components/Card/Card";
import { useForm } from "react-hook-form";
import {getStudyGroups} from "../../../../api/api";
import {useEffect} from "react";

export const FiltersSection = ({ setGroups = () => {}, page, limit, setFirstPage }) => {

	const { register, handleSubmit, formState: { errors } } = useForm()

	const onSubmit = async (data) => {
		data.page = page
		data.limit = limit
		const response = await getStudyGroups(data)
		setGroups(response)
	}

	const filter = () => {
		if (page === 1) {
			handleSubmit(onSubmit)()
		} else {
			setFirstPage()
		}
	}

	useEffect(() => {
		handleSubmit(onSubmit)()
	}, [page, limit])


	return (
		<section>
			<Card title="Поиск">
				<form>
					<div className={styles.filtersContainer}>
						<div className={styles.filtersRow}>
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
									{...register('creation_date')}
								/>
							</InputWrapper>
							<InputWrapper title="Координата X">
								<input
									type="text"
									className={styles.input}
									placeholder="x"
									{...register('coordinates_x')}
								/>
							</InputWrapper>
							<InputWrapper title="Координата Y">
								<input
									type="text"
									className={styles.input}
									placeholder="y"
									{...register('coordinates_y')}
								/>
							</InputWrapper>
							<InputWrapper title="К отчислению">
								<input
									type="text"
									className={styles.input}
									placeholder="Количество студентов к отчислению"
									{...register('should_be_expelled')}
								/>
							</InputWrapper>
						</div>
						<div className={styles.filtersRow}>
							<InputWrapper title="Переведенных">
								<input
									type="text"
									className={styles.input}
									placeholder="Количество переведенных студентов"
									{...register('transferred_students')}
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
								<input
									type="text"
									className={styles.input}
									placeholder="Имя админа"
									{...register('group_admin_name')}
								/>
							</InputWrapper>
							<InputWrapper title="Количество студентов">
								<input
									type="text"
									className={styles.input}
									placeholder="Количество студентов"
									{...register('studentsCount')}
								/>
							</InputWrapper>
							<InputWrapper title="> переведенных">
								<input
									type="text"
									className={styles.input}
									placeholder="Минимум переведенных студентов"
									{...register('transferredStudents')}
								/>
							</InputWrapper>
						</div>
						<div className={styles.filtersRow}>
							<InputWrapper title="Сортировать по">
								<select {...register('sort_by')}>
									<option value="id">
										id
									</option>
									<option value="name">
										Названию группы
									</option>
									<option value="creation_date">
										Дате создания
									</option>
									<option value="coordinates_x">
										Координате X
									</option>
									<option value="coordinates_y">
										Координате Y
									</option>
									<option value="students_count">
										Кол-ву студентов
									</option>
									<option value="should_be_expelled">
										Кол-ву студентов к отчислению
									</option>
									<option value="transferred_students">
										Кол-ву переведенных студентов
									</option>
									<option value="semester">
										Семестру
									</option>
									<option value="group_admin_name">
										Имени админа
									</option>
								</select>
							</InputWrapper>
							<InputWrapper title="Порядок сортировки">
								<select {...register('order')}>
									<option value="ASC">
										По возрастанию
									</option>
									<option value="DESC">
										По убыванию
									</option>
								</select>
							</InputWrapper>
							<div className={styles.btnRow}>
								<button className="btn_filled" type="button" onClick={filter}>Применить</button>
								<button className="btn_outlined" type="reset">Очистить</button>
							</div>
						</div>
					</div>
				</form>
			</Card>
		</section>
	)
}

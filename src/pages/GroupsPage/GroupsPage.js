import styles from './GroupsPage.module.css'
import {Layout} from "../../components/Layout/Layout";
import {FiltersSection} from "./sections/FiltersSection/FiltersSection";
import {TableSection} from "./sections/TableSection/TableSection";
import {getStudentsAmount, getStudyGroups} from "../../api/api";
import {useEffect, useState} from "react";

export const GroupsPage = () => {

	const [groups, setGroups] = useState([])
	const [studentsAmount, setStudentsAmount] = useState(0)
	const [pageNum, setPageNum] = useState(1)
	const [pageLimit, setPageLimit] = useState(5)

	const fetchGroups = async () => {
		const response = await getStudyGroups()
		setGroups(response)
	}

	const fetchStudentsAmount = async () => {
		const response = await getStudentsAmount()
		setStudentsAmount(response)
	}

	const prevPageHandler = () => {
		if (pageNum > 1) {
			setPageNum(prevState => prevState - 1)
		}
	}

	const nextPageHandler = () => {
		setPageNum(prevState => prevState + 1)
	}

	const setFirstPage = () => {
		setPageNum(1)
	}

	useEffect(() => {
		fetchGroups()
		fetchStudentsAmount()
	}, [])


	return (
		<Layout>
			<div className={styles.page}>
				<h1 className="title">Учебные группы</h1>
				<p className={styles.studentsAmount}>Всего студентов: {studentsAmount}</p>
				<FiltersSection setGroups={setGroups} page={pageNum} limit={pageLimit} setFirstPage={setFirstPage}/>
				<TableSection groups={groups} nextPage={nextPageHandler} prevPage={prevPageHandler} limit={pageLimit}
				              page={pageNum}
				              setLimit={setPageLimit}
				/>
			</div>
		</Layout>
	)
}
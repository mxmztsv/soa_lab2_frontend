import styles from './TableSection.module.css'
import {Card} from "../../../../components/Card/Card";
import {GroupsTable} from "../../../../components/GroupsTable/GroupsTable";
// import {useNavigate} from "react-router-dom";
import {Pagination} from "../../../../components/Pagination/Pagination";
import {useState} from "react";
import {EditModal} from "../../../EditGroupModal/EditModal";

export const TableSection = ({groups, nextPage, prevPage, page, limit, setLimit, updateGroups = () => {
	console.log('test')}}) => {

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedObjectId, setSelectedObjectId] = useState(null)

	const openModal = () => {
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
		setSelectedObjectId(null)
	}

	const editObject = (id) => {
		setSelectedObjectId(id)
		openModal()
	}

	return (
		<section className={styles.section}>
			{ isModalOpen && <EditModal close={closeModal} id={selectedObjectId} updateGroups={updateGroups}/> }
			<Card title="Список групп">
				<div className={styles.header}>
					<Pagination onPrev={prevPage} onNext={nextPage} onChangeLimit={setLimit} actualPageNum={page}
					            limit={limit}/>
					<button className="btn_filled" onClick={openModal}>Добавить группу
					</button>
				</div>
				<GroupsTable groups={groups} editObject={editObject}/>
			</Card>
		</section>
	)
}

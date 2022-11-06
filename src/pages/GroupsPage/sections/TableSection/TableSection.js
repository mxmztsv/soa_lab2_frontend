import styles from './TableSection.module.css'
import {Card} from "../../../../components/Card/Card";
import {GroupsTable} from "../../../../components/GroupsTable/GroupsTable";
import {useNavigate} from "react-router-dom";
import {Pagination} from "../../../../components/Pagination/Pagination";

export const TableSection = ({groups, nextPage, prevPage, page, limit, setLimit}) => {

	const navigate = useNavigate()

	return (
		<section className={styles.section}>
			<Card title="Список групп">
				<div className={styles.header}>
					{/*<p className={styles.count}>Количество: {groups.length}</p>*/}
					<Pagination onPrev={prevPage} onNext={nextPage} onChangeLimit={setLimit} actualPageNum={page}
					            limit={limit}/>
					<button className="btn_filled" onClick={() => {
						navigate('/edit-group')
					}}>Добавить группу
					</button>
				</div>
				<GroupsTable groups={groups}/>
			</Card>
		</section>
	)
}

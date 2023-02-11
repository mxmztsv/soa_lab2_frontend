import styles from './ExtraFunctionsSection.module.css'
import {Card} from "../../../../components/Card/Card";
import {CountEqualsBySize} from "./CountEqualsBySize";
import {CountWithMoreTransferredStudents} from "./CountWithMoreTransferredStudents";

export const ExtraFunctionsSection = ({ setGroups = () => {}, updateGroups = () => {} }) => {
	return (
		<section className={styles.section}>
			<Card title="Дополнительные функции">
				<CountEqualsBySize setResultGroups={setGroups} updateGroups={updateGroups} />
				<CountWithMoreTransferredStudents setResultGroups={setGroups} updateGroups={updateGroups} />
			</Card>
		</section>
	)
}

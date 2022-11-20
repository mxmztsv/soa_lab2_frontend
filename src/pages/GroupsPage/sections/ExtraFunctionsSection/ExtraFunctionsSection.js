import styles from './ExtraFunctionsSection.module.css'
import {Card} from "../../../../components/Card/Card";
import {CountEqualsBySize} from "./CountEqualsBySize";
import {CountWithMoreTransferredStudents} from "./CountWithMoreTransferredStudents";

export const ExtraFunctionsSection = ({ setGroups = () => {
	console.log('test1')} }) => {
	return (
		<section className={styles.section}>
			<Card title="Дополнительные функции">
				<CountEqualsBySize setResultGroups={setGroups} />
				<CountWithMoreTransferredStudents setResultGroups={setGroups} />
			</Card>
		</section>
	)
}

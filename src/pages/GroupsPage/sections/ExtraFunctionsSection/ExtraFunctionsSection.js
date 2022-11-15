import styles from './ExtraFunctionsSection.module.css'
import {Card} from "../../../../components/Card/Card";
import {CountTypeSearch} from "./CountTypeSearch";
import {LikeSearch} from "./LikeSearch";
import {EnginePowerLessSearch} from "./EnginePowerLessSearch";
import {TypeSearch} from "./TypeSearch";
import {EnginePowerRangeSearch} from "./EnginePowerRangeSearch";

export const ExtraFunctionsSection = () => {
	return (
		<section className={styles.section}>
			<Card title="Дополнительные функции">
				<CountTypeSearch />
				<LikeSearch />
				<EnginePowerLessSearch />
				<h3 className={styles.subtitle}>Функции сервиса Shop</h3>
				<TypeSearch />
				<EnginePowerRangeSearch />
			</Card>
		</section>
	)

}

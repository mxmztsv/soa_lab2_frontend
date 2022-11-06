import styles from './Card.module.css'

export const Card = ({ children, title = null }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.card}>
				<p className={styles.title}>{title}</p>
				{ children }
			</div>
		</div>
	)
}

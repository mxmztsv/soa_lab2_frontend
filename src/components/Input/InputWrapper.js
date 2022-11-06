import styles from './Input.module.css'

export const InputWrapper = ({ title, children }) => {
	return (
		<div className={styles.wrapper}>
			<p className={styles.title}>{title}</p>
			{children}
		</div>
	)
}

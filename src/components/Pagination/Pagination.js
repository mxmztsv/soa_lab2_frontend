import styles from './Pagination.module.css'
import {InputWrapper} from "../Input/InputWrapper";

export const Pagination = ({ onPrev = () => {},
	                           onNext = () => {},
	                           actualPageNum = 1,
								limit = 3,
	                           onChangeLimit = () => {}
}) => {


	const limitHandler = (e) => {
		onChangeLimit(e.target.value)
	}

	return (
		<div className={styles.pagination}>
			<button className="btn_outlined" onClick={onPrev}>&lt;</button>
			<p className={styles.pageNum}>{actualPageNum}</p>
			<button className="btn_outlined" onClick={onNext}>&gt;</button>
			<div className={styles.limit}>
				<InputWrapper title="Элементов на странице">
					<select value={limit} onChange={limitHandler}>
						<option value="1">
							1
						</option>
						<option value="3">
							3
						</option>
						<option value="5">
							5
						</option>
						<option value="10">
							10
						</option>
					</select>
				</InputWrapper>
			</div>
		</div>
	)
}

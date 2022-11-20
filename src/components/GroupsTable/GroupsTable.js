import styles from './GroupsTable.module.css'
import {parseDate} from "../../utils/dateParser";

export const GroupsTable = ({ groups = [], editObject = () => {} }) => {

	return (
		<table>
			<thead>
				<tr>
					<th>id</th>
					<th>Название</th>
					<th>x</th>
					<th>y</th>
					<th>Дата создания</th>
					<th>Кол-во студентов</th>
					<th>Кол-во к отчислению</th>
					<th>Кол-во переведенных</th>
					<th>Семестр</th>
					<th>Админ</th>
				</tr>
			</thead>

			<tbody>
			{
				groups.map((group, index) => {
					return (
						<tr key={index} onClick={() => {editObject(group.id._text)}}>
							<td>{group.id._text}</td>
							<td>{group.name._text}</td>
							<td>{group.coordinates.x._text}</td>
							<td>{group.coordinates.y._text}</td>
							<td>{parseDate(group.creationDate._text)}</td>
							<td>{group.studentsCount._text}</td>
							<td>{group.shouldBeExpelled._text}</td>
							<td>{group.transferredStudents._text}</td>
							<td>{group.semesterEnum._text}</td>
							<td>{group.groupAdmin.name === undefined ? "-" : group.groupAdmin.name._text}</td>
						</tr>
					)
				})
			}
			</tbody>
		</table>
	)
}

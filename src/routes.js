import {Navigate, Route, Routes} from "react-router-dom";
import {GroupsPage} from "./pages/GroupsPage/GroupsPage";
import {EditGroupPage} from "./pages/EditGroupPage/EditGroupPage";
import {AddStudentPage} from "./pages/AddStudentPage/AddStudentPage";

export const useRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<GroupsPage/>} />
			<Route path="/edit-group" element={<EditGroupPage />} >
				<Route path=":id" element={<EditGroupPage />} />
				{/*	<Route path="/add-student" element={<AddStudentPage />} />*/}
				{/*</Route>*/}
			</Route>
			<Route path="/edit-group/:id/add-student" element={<AddStudentPage />} />
		</Routes>
	)
}

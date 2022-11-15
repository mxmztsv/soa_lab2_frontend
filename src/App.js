import {Toaster} from "react-hot-toast";
import {GroupsPage} from "./pages/GroupsPage/GroupsPage";

function App() {

	return (
		<div className="App">
			<Toaster
				position="top-right"
				reverseOrder={false}
			/>
			<GroupsPage/>
		</div>
	)
}

export default App

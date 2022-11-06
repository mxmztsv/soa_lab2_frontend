import {Layout} from "./components/Layout/Layout";
import {useRoutes} from "./routes";
import {BrowserRouter as Router} from "react-router-dom";
import {Toaster} from "react-hot-toast";

function App() {

    const routes = useRoutes()

    return (
        <div className="App">
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <Router>
                <div>
                    {routes}
                </div>
            </Router>
        </div>
    )
}

export default App

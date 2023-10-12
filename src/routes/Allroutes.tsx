import { createBrowserRouter } from "react-router-dom";
import { Weblayout } from "../layouts";
import {Home} from "../pages"
import {Deatails} from "../components/index"
export const element = createBrowserRouter([
	{
		path: "/",
		element: <Weblayout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
                path: 'single/:id',
                element: <Deatails />,
            },
		]
	},
	
]);
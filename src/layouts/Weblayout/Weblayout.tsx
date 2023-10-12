
import { Outlet } from "react-router";
import { Header } from "../../components";

const WebLayout = () => {
	return (
		<div
			style={{
				overflow: "hidden",
			}}>
			<Header />
			<Outlet />
			
		</div>
	);
};

export default WebLayout;
import React from "react";

import styled from "styled-components";
import { ButtonType } from "../../types/index";


const ButtonOutlined: React.FC<ButtonType> = ({ ...props }) => {
	return (
		<div>
		
		
			<MyButton>{props.title}</MyButton>
		
		
		</div>
	);
};

export default ButtonOutlined;

const MyButton = styled.button`
	width: 150px;
	height: 40px;
	border: none;
	outline: none;
	color: #8ed8bf;
	background-color: transparent;
	border-radius: 5px;
	transition: all 350ms;
	font-weight: 600;
	font-family: "Poppins", sans-serif;
	border: 1px solid #8ed8bf;
	cursor: pointer;

	:hover {
		transform: scale(0.98);
		color: white;
		background-color: #8ed8bf;
	}
`;
// const ButtonHold = styled(NavLink)`
// 	cursor: pointer;
// 	/* margin-right: 70px; */
// 	/* text-decoration: none; */

// 	/* @media screen and (max-width: 790px) { */
// 	/* display: none; */
// 	/* } */
// `;
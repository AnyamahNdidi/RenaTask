import React, { useEffect } from "react";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-scroll";
import pic from "../../assets/svg/quality-logo.svg";
import SideBar from "./SideBar";
import { useDispatch } from 'react-redux';
import {changeShow} from "../../Global/reduxstate"

const Header = () => {
	const [sideShow, setSideShow] = React.useState(false);
	const dispatch = useDispatch();

	const toggleSideBar = () => {
		setSideShow(!sideShow);
	};

	useEffect(() => {
		if (sideShow) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
	}, []);

	const handleCrete = () => {
		dispatch(changeShow(true))
	}

	return (
		<Container>
			<Logo src={pic} />
			<NavHolder>
				<Nav offset={-100} smooth={true} duration={500} to='Home'>
					HOME
				</Nav>

				<Nav offset={-100} smooth={true} duration={500} to='blog'>
					All BLOGS
				</Nav>

				
			</NavHolder>
			
				<MyButton  onClick={handleCrete} >Create Blog</MyButton>
			

			<Menu onClick={toggleSideBar}>
				<GiHamburgerMenu />
			</Menu>

			{sideShow ? <SideBar toggleSideBar={toggleSideBar} /> : null}
		</Container>
	);
};

export default React.memo(Header);

const MyButton = styled.button`
	width: 150px;
	height: 40px;
	border: none;
	outline: none;
	color: white;
	background-color: #000000;
	border-radius: 5px;
	transition: all 350ms;
	font-weight: 600;
	margin-right: 30px;

	font-family: "Poppins", sans-serif;

	cursor: pointer;

	:hover {
		transform: scale(0.98);
	}

	@media screen and (max-width: 790px) {
		display: none;
	}
`;

const Menu = styled.div`
	display: none;
	@media screen and (max-width: 960px) {
		display: block;
		margin-right: 30px;
		font-size: 30px;
		cursor: pointer;
	}
`;

const Logo = styled.img`
	width: 110px;
	height: 50px;
	margin-left: 70px;
	object-fit: cover;
	margin-top:15px;

	@media screen and (max-width: 790px) {
		margin-left: 30px;
			width: 120px;
	height: 50px;
	}
`;
const NavHolder = styled.div`
	display: flex;
	align-items: center;

	@media screen and (max-width: 790px) {
		margin-right: 10px;
		display: none;
	}
`;
const Nav = styled(Link)`
	margin-right: 25px;
	margin-left: 25px;
	color: #3e4581;
	cursor: pointer;
	font-width:700;

	transition: all 350ms;
	:hover {
		transform: scale(0.98);
		text-decoration: underline;
	}
`;

const Container = styled.div`
	height: 70px;
	width: 100%;
	display: flex;
	font-width:700;
	align-items: center;
	justify-content: space-between;
	position: fixed;
	background-color: white;
	z-index: 10;
`;
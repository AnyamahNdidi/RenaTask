
import styled from "styled-components";
import {changeShow} from "../../Global/reduxstate"
import { useDispatch } from 'react-redux';


const Hero = () => {
	const dispatch = useDispatch();
	const handleCrete = () => {
		dispatch(changeShow(true))
	}
	return (
		<Container id='Home'>
			<Title>Get The Latest Blog. To Stay Upated.</Title>
			<Desc>
				create your own post for people to see too.
			</Desc>
			<ButHold>
				
					<MyButton  onClick={handleCrete} >Create Blog</MyButton>
				
				
			</ButHold>
		</Container>
	);
};

export default Hero;

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

`;

const ButHold = styled.div`
	display: flex;
`;

const Title = styled.div`
	font-size: 60px;
	font-weight: 800;
	line-height: 70px;
	color: #0b163f;
	width: 700px;
	margin-top: 30px;

	@media screen and (max-width: 700px) {
		width: 90%;
		font-size: 45px;
		line-height: 47px;
	}
`;
const Desc = styled.p`
	margin-top: 20px;
	width: 700px;
	font-size: 20px;

	@media screen and (max-width: 700px) {
		width: 90%;
	}
`;

const Container = styled.div`
	min-height: 450px;
	padding-top: 100px;
	background-color:#FFF4E5;
	background-size: contain;
	background-repeat: no-repeat;
	/* background-position: center; */
	background-position: bottom center;
	display: flex;
	/* justify-content: center; */
	flex-direction: column;
	align-items: center;
	text-align: center;

	padding-bottom: 20px;

	/* @media screen and (max-width: 700px) { */
	background-image: url("https://quiety.themetags.com/assets/img/shape/dot-dot-wave-shape.svg");

	@media screen and (max-width: 700px) {
		background-size: 900px;
		
	}

	/* background-attachment: fixed; */

	/* background-repeat: no-repeat; */

	/* background-position: right center; */
	/* } */
`;
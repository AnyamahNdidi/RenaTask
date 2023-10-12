import React from 'react'
import { Hero, Blogpost, Postmode } from "../../components/"
import { useSelector, useDispatch } from 'react-redux';
import {changeShow} from "../../Global/reduxstate"



const Home: React.FC = () => {
  const show = useSelector((state: any) => state.myReducer.show);
  const dispatch = useDispatch();
  console.log("thuis", show)
  const handleCrete = () => {
		dispatch(changeShow(false))
	}
  //  const [show, setShow] = React.useState<boolean>(true)
      // {show && <Postmode/>}
  return (
      <
         
      >
      <Hero />
      {show && <Postmode onConfirm={ handleCrete} />}
      
      <Blogpost/>
          
      </>
  )
}

export default Home
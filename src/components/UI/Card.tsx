import React from 'react'

import {Link} from "react-router-dom"
import styled from 'styled-components'
import Updated from './Updated'
import {changeModle,changeid} from "../../Global/reduxstate"
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'



interface porpsData {

    mydata:any

 }

const Card :React.FC<porpsData>= (props) => {
    console.log("any", props.mydata)
     const show = useSelector((state: any) => state.myReducer.Modelshow);
     
    
    const dispatch = useDispatch();
	const handleShow = () => {
		dispatch(changeModle(true))
	}
	const handleCrete = () => {
		dispatch(changeModle(false))
	}
	const handleId = (id:string) => {
		dispatch(changeid(id))
	}

     const deleteTask = async (id:string) => {
  try {
    const response = await fetch(
      `https://ourmoni-5fa7c-default-rtdb.firebaseio.com/data/${id}.json`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
        throw new Error('Request failed!');
          Swal.fire(
                 'OOPsa',
                'something went wrong check your internet',
              
                )
    }

      console.log('Task deleted successfully.');
      window.location.reload();
       Swal.fire(
                 'Good job!',
                'Deleted sucessfully',
                'success'
      )
      
  } catch (err) {
      console.error(err);
        Swal.fire(
                 'OOPsa',
                'something went wrong check your internet',
              
                )
  }
};
    
  
    const {blogTitle, content, img,createtAt, id} = props.mydata
    return (
      <>
      <Container>
          <Imgcon src={ img} />
          <Title>
              {blogTitle}
              
                </Title>
                
          <Content  style={{ color: 'black' }}  dangerouslySetInnerHTML={{ __html: content }}/>
           
          <Created>
              <div>CreateAt:</div> <span>{ createtAt}</span>  
                </Created>
                <Link to={`/single/${id}`}>
                        <p style={{ color: "green", cursor:"pointer"}}>View more</p>
                </Link>
                <div style={{ display: "flex", width:"100%", justifyContent:"space-between", cursor:"pointer", fontWeight:"bold", color:"grey" }}>
                      <p style={{ color: "red", cursor: "pointer" }} onClick={() => {
                    deleteTask(id)
                    }}>Delete Post</p>
                    
                    <span style={{ cursor: "pointer" }} onClick={
                        () => {
                            handleShow()
                            handleId(id)
                        }
                       
                    }>Edit</span>
                  
                </div>
              
                
          
            </Container>
            {show && <Updated onConfirm={handleCrete}  />}
            </>
  )
}

export default Card

const  Created = styled.div`
display:flex;
div{
    color:green;
    font-weight:bold;
    margin-right:5px;
}
`

const Content = styled.div`
  width:100%;
 
  height:auto;
 display: flex;
 color:black;
  

  overflow: hidden; /* Hide any overflowing content */
  text-overflow: ellipsis;
`
const Title = styled.div`
  width:100%;
  height:auto;
  
 color:black;
 font-weight:bold;


`
const Imgcon = styled.img`
   width:100%;
   height:180px;
  
   border-radius:5px;
   object-fit:cover;
`


const Container = styled.div`
width:330px;
height:360px;

border-radius:5px;
margin-top:25px;

display:flex;
flex-direction:column;

p{
    
}

@media screen and (max-width: 700px) {
	width:95%;
  
		
	}
`
import React from 'react'
import styled from "styled-components"


const RecentPost = () => {
  const [myval, setMyval] = React.useState<string>("");
 

  return (
      <Container>
      <Main>
        <div>
          <input  value={myval}  onChange = {(e: React.ChangeEvent<HTMLInputElement>)=> setMyval(e.target.value) } placeholder='Search by title '/>
        </div>
        <p>Recent Blog Post</p>
        
          </Main>
   </Container>
  )
}

export default RecentPost

const Main = styled.div`
width: 73%;
height:100%;

align-items:center;
display: flex;
justify-content: space-between;

p{
   font-bold;
   font-size:20px;

   @media screen and (max-width: 768px) {
	  display:none;

	}
}



;
div input{

  background-color:#E1E1E1;
  padding-left:8px;
  height:35px;
  border-radius:5px;
  outline:none;
  width:200px;
  margin-top:10px;
}


`

const Container = styled.div`
height:50px;
width:100%;

display:flex;
justify-content:center;
align-items:center;
`
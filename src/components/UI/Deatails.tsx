import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom';



interface idata {
        id: string,
        blogTitle: string,
        content: string,
        createtAt:string,
        img:string
        
        
}
    
const Deatails = () => {

    const { id }:any  = useParams();
   
    const [show, setShow] = React.useState <idata>()

  
    const fetchSingleTask = async () => {
  try {
    const response = await fetch(
      `https://ourmoni-5fa7c-default-rtdb.firebaseio.com/data/${id}.json`
    );

    if (!response.ok) {
      throw new Error('Request failed!');
    }

    const taskData = await response.json();

      // Process the taskData as needed
      setShow(taskData)

    console.log("from fn",taskData);
  } catch (err) {
    console.error(err);
  }
    };
    
   
    React.useEffect(() => {
     fetchSingleTask()
 },[])

  return (
      <Container>
          <Wrapper>
              <Img src={show?.img } />
              <Title>
                  {show?.blogTitle}
                
              </Title>

              <Content style={{ color: 'black' }}  dangerouslySetInnerHTML={{ __html: show?.content ?? ''}}/>
                <span style={{color:"green"}}>Created at:{show?.createtAt}</span>
          </Wrapper>
      </Container>
  )
}

export default Deatails

const Content = styled.div`
width:100%;
   
margin-top:20px;
height:auto;
`

const Title = styled.div`
   width:100%;
   height:50px;
  
   font-weight:bold;
   text-align:center;
   margin-top:20px;
   font-size:30px;
 
`
const Img = styled.img`
   width:100%;
   height:350px;
   background-color:blue;
   margin-top::10px;
   object-fit:cover;
`
const Container = styled.div`
    width:100%;
    min-height:100vh;
    height:100%;
 
    display: flex;
    justify-content: center;



`

const Wrapper = styled.div`
    width:75%;
     height:100%;

     display:flex;
     flex-direction :column;
`
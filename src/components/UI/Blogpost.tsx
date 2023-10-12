import React from 'react'
import styled from "styled-components";
import Card from './Card';
import ReactPaginate from "react-paginate";
import "./pagination.css"
import { useQuery } from '@tanstack/react-query';
import { ReadAllBlog } from "../../utils/Endpoint"
import { useDispatch, useSelector } from 'react-redux';
import {addBlog} from "../../Global/reduxstate"


import Swal from 'sweetalert2'




interface idata {
        id: string,
        blogTitle: string,
        content: string,
        createtAt:string,
        img:string
        
        
    }
      
const Blogpost = () => {

    const [search, setSearch] = React.useState<string>("")
  const [pageNumber, setPageNumber] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const getBlog = useSelector((state: any) => state.myReducer.blog);
 
  const dispatch = useDispatch()
       

    
     
 
  const { data: datas } = useQuery({
      queryKey: ['blog'],
      queryFn: () => ReadAllBlog(),
  });
  
  console.log("how man",datas)

    
    const fetchTasks = async () => {
      setIsLoading(true);
    
    try {
      const response = await fetch(
        'https://ourmoni-5fa7c-default-rtdb.firebaseio.com/data.json'
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

        
      const loadedTasks: idata[] = [];
    

      for (const taskKey in data)
      {
        console.log("sdd",taskKey)
          loadedTasks.push({
              id: taskKey,
              blogTitle: data[taskKey].blogTitle,
              content: data[taskKey].content,
              createtAt: data[taskKey].createtAt,
              img:data[taskKey].img
          });
      }
    
        console.log(loadedTasks)
    
      dispatch(addBlog(loadedTasks))
    } catch (err) {
      console.log(err)
        Swal.fire(
                 'OOPsa',
                'something went wrong check your internet',
              
                )
    }
    setIsLoading(false);
  };

  


  React.useEffect(() => {
    fetchTasks();
  }, []);
   

    const usersPerPage:number = 6;
    const pagesVisited: number = pageNumber * usersPerPage;
    
    const viewPost = getBlog.slice(pagesVisited, pagesVisited + usersPerPage)?.filter((val:any) => {
         if(search === ""){
            return val
         } else if (val.blogTitle.toLowerCase().includes(search.toLowerCase())
      
        
        ){
          return val
        }
    })?.map((props:any) => {
        return (
            <>
            <Card key={props?.id} mydata={props} />
            </>
        )
    })
  const pageCount = Math.ceil(getBlog.length / usersPerPage);
  
  const changePage = (event: any) => {
    setPageNumber(event.selected);
  };
  return (
    <Container id="blog">
      <div>
         <input  value={search}  onChange = {(e: React.ChangeEvent<HTMLInputElement>)=> setSearch(e.target.value) } placeholder='Search by title '/>
      </div>
       
          <Main>
              {isLoading && <div style={{fontWeight:"bold"}}>Loading Blog....... please check your network or refresh</div>}
              { getBlog.length > 0 && viewPost}
              { getBlog.length === 0 && <div style={{fontWeight:"bold"}}>No Blog hase been posted </div>}
             
          </Main>
      <br />
      {
        getBlog.length > 0 ? (
          <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={'paginationBttns'}
        previousLinkClassName={'previousBttn'}
        nextLinkClassName={'nextBttn'}
        disabledClassName={'paginationDisabled'}
        activeClassName={'paginationActive'}
      />
        ): null
      }
     </Container>
  )
}

export default Blogpost


const Main = styled.div`
width: 76%;
display: flex;

justify-content: space-around;
flex-wrap:wrap;



@media screen and (max-width: 700px) {
	width:97%;

	}




`

const Container = styled.div`
min-height:500px;
width:100%;

display:flex;
justify-content:center;
flex-wrap:wrap;
margin-bottom:50px;
align-items:center;
flex-direction:column;

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
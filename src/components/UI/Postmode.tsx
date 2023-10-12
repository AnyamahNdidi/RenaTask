import React from 'react'

import ReactDOM from "react-dom"
import styled from 'styled-components' 

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./pagination.css"
import { useMutation } from '@tanstack/react-query';
import ShowToast from '../../reuse/ShowToast';
import { creatMyBlog } from "../../utils/Endpoint"
import { useDispatch,useSelector } from 'react-redux';
import {addBlog} from "../../Global/reduxstate"
import Swal from 'sweetalert2'

 
 const modules = {
        toolbar:[
            
            [{header:[1,2,3,4,5,6, false]}],
        //    [{ font:[]}],
        //    [{ size:[]}],
            // superscript/subscript
             // outdent/indent
        [{ align: [] }],
         
        //   ["link", "image"],
          ["bold", "italic"],
          [
            {list:"ordered"},
            {list:"bullet"},
            {indent:"-1"},
           ],   

           
           
          
        ],
       
    }

interface PostmodeProps {
  onConfirm: () => void;
}

const Backdrop:React.FC<PostmodeProps>= (props) => {
    return <Backdropcontainer onClick={props.onConfirm} />
}

const ModelOverlay:React.FC<PostmodeProps> = (props) => {

    const [blogContent, setblogContent] = React.useState<string>("");
    const [picloading, setPicLoading] = React.useState<boolean>(false);
    const [pic, setPic] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");
  const dispatch = useDispatch()
  const getBlog = useSelector((state: any) => state.myReducer.blog);
 

    
     const handleProcedureContentChange = (content:any) => {
      setblogContent(content);
 
    };

    
  const postDetails = (pics:any) => {
    setPicLoading(true);
    console.log("gavdhb", pics)
    if (pics === undefined || pics === "") {
   ShowToast(true, "please select pic");
        console.log("please selecte pic")
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "renatask");
      data.append("cloud_name", "ndtech");
      fetch("https://api.cloudinary.com/v1_1/ndtech/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log("img url",data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else
    {
        Swal.fire(
                 'Somethig went wrong',
                'check network',
               
                )
    
        setPicLoading(false);
        console.log("erro occurs")
      return;
    }
    };
      const { mutate } = useMutation({
      mutationFn: (data: any) => creatMyBlog(data),
      onSuccess: () => {
          Swal.fire(
                 'Good job!',
                'Uploaded sucessful',
                'success'
                )

       
      },
      onError: (err: any) => {
        ShowToast(false, err?.response?.data?.message);
         Swal.fire(
                 
                'something went wrong check your connections',
               
                )
      },
      });
  
  const striptHtml = (html:string) => {
      
      const temporalDivElement = document.createElement("div");
      temporalDivElement.innerHTML = html;
      return temporalDivElement.textContent || temporalDivElement.innerText || "";

    }
    
    const postData = () => {
        try
        {
            const properDate = new Date()
            const year = properDate.getFullYear()
            const month = properDate.toLocaleString("en-US", { month: "long" })
          const day = properDate.toLocaleString("en-US", { day: "2-digit" })
          console.log(title)
          if (!title ) {
            // ShowToast(false, "Please fill in all required fields.");
            console.log("Title is needed")
           return;
         }
          if (!pic ) {
            // ShowToast(false, "Please fill in all required fields.");
            console.log("pic can be empty")
           return;
         }
          if (!blogContent ) {
            // ShowToast(false, "Please fill in all required fields.");
            console.log("content needed")
           return;
         }
            
            const data:any = {
                blogTitle: title,
                img: pic,
                content:striptHtml(blogContent) ,
                createtAt: day + " " + month + " " + year,
        }
            console.log("this is data", data);
          mutate(data)
         dispatch(addBlog([...getBlog, data]))
          props.onConfirm()
        } catch (error)
        {
            console.log(error)
        }
    }
    console.log(blogContent)
    return <Holder >
              <HolerH>
                  <h2>create post</h2>
        </HolerH>
        
        <HolerC >
            <InputTitle
          placeholder='Title'
          required
                value={title}
              onChange = {(e: React.ChangeEvent<HTMLInputElement>)=> setTitle(e.target.value) }

            />
            <InputTitle
                type="file"
                placeholder='Title'
                accept="image/*"
          onChange={(e) => {
             if (e.target.files && e.target.files.length > 0) {
                        postDetails(e.target.files[0]);
                        }
           }}
            />
        { picloading && <>loading image.........</>}
        { !picloading && <>uploading done</>}
                  <ReactQuill 
           
         
            theme="snow" 
            value={blogContent} 
            onChange = {handleProcedureContentChange }
            modules={modules}
            className= "showing"
            
          
        />
        <br/>
        <br/>
        <br/>
        <br/>
           <MyButton onClick={() => {
          postData()
         
                  }}>Post</MyButton>
        </HolerC>
        <br/>
              <HolerF >
     
              </HolerF>
          </Holder>
}
 
interface PostmodeProps {
  onConfirm: () => void;
}
const Postmode:React.FC<PostmodeProps> = (props) => {
  return (
      <>
          {ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm} />, document.getElementById("backdrop-root")!)}
          {ReactDOM.createPortal(<ModelOverlay onConfirm={props.onConfirm} />, document.getElementById("overlay-root")!)}
      </>
  )
}

export default Postmode;


const InputTitle  = styled.input`
Outline:1px solid grey;
margin-bottom:5px;
border-radius:2px;
width :100%;
height:25px;
padding-left:5px;
`

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

const Backdropcontainer = styled.div`

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 20;
    background: rgba(0, 0, 0, 0.75);
`

const Holder = styled.div`
   position: fixed;
    top: 10vh;
    left: 15%;
    width: 70%;
    min-height:500px;
    z-index: 999;
    overflow: hidden;
    background-color:white;

    
@media screen and (max-width: 768px) {
	  left: calc(50% - 10rem);
        width: 20rem;

	}


`
const HolerH = styled.div`

    padding: 1rem;
    color:white;

`
const HolerC = styled.div`
 padding: 1rem;
 height: auto;
 
 display: flex;
 flex-direction:column;

`
const HolerF= styled.div`
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
`

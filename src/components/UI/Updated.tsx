import React from 'react'
import ReactDOM from "react-dom"
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import "./pagination.css"



interface PostmodeProps {
  onConfirm: () => void;
}

const Backdrop:React.FC<PostmodeProps> = (props) => {
    return <Backdropcontainer onClick={props.onConfirm} />
}



interface idata {
        id: string,
        blogTitle: string,
        content: string,
        createtAt:string,
        img:string
        
        
}
const ModelOverlay = () => {

     const [blogContent, setblogContent] = React.useState<string>("");
    const [picloading, setPicLoading] = React.useState<boolean>(false);
    const [pic, setPic] = React.useState<string>("");
    const [title, setTitle] = React.useState<string>("");
   const [show, setShow] = React.useState<idata>({ id: '', blogTitle: '', content: '', createtAt: '', img: '' });
      const getId = useSelector((state: any) => state.myReducer.updateId);

  

     const postDetails = (pics:any) => {
    setPicLoading(true);
    console.log("gavdhb",)
//     if (pics === undefined) {
//    ShowToast(true, "please select pic");
//         console.log("please selecte pic")
//       return;
//     }
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
    } else {
    //   toast({
    //     title: "Please Select an Image!",
    //     status: "warning",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "bottom",
    //   });
        setPicLoading(false);
        console.log("erro occurs")
      return;
    }
    };

    const fetchSingleTask = async () => {
  try {
    const response = await fetch(
      `https://ourmoni-5fa7c-default-rtdb.firebaseio.com/data/${getId}.json`
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
  
   

      const striptHtml = (html:any) => {
      
      const temporalDivElement = document.createElement("div");
      temporalDivElement.innerHTML = html;
      return temporalDivElement.textContent || temporalDivElement.innerText || "";

    }
       console.log(pic)
    const handleUpdate =async () => {

         const properDate = new Date()
            const year = properDate.getFullYear()
            const month = properDate.toLocaleString("en-US", { month: "long" })
        const day = properDate.toLocaleString("en-US", { day: "2-digit" })

     
        
          const data:any = {
                blogTitle: title || show?.blogTitle,
                img: pic || show?.img,
                content:striptHtml(blogContent) || show?.content,
                createtAt: day + " " + month + " " + year,
        }

         const updatedTaskData:any = {
      ...show,
      ...data,
        };
        
        const updateResponse = await fetch(
      `https://ourmoni-5fa7c-default-rtdb.firebaseio.com/data/${getId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(updatedTaskData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!updateResponse.ok) {
        throw new Error('Update request failed!');
          Swal.fire(
                 
                'Update faild check',
                'success'
        )
        return;
        }
        
        window.location.reload();
    Swal.fire(
                 'Good job!',
                'Update  sucessfully done',
                'success'
                )
    console.log('Task updated successfully.');

    }
    React.useEffect(() => {
     fetchSingleTask()
 },[])
    return  <Holder >
              <HolerH>
            <h2>update post </h2>
        </HolerH>
        
        <HolerC >
         
            <InputTitle
          placeholder='Title'
          required
              
                onChange = {(e: React.ChangeEvent<HTMLInputElement>)=> setTitle(e.target.value) }
                defaultValue={show.blogTitle}
            //   onChange = {(e: React.ChangeEvent<HTMLInputElement>)=> setTitle(e.target.value) }

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
            <textarea
                
                style={{
                    outline:"1px solid grey"
                }}
              onChange = {(e: React.ChangeEvent<HTMLTextAreaElement>)=> setblogContent(e.target.value) }
               defaultValue={show.content}
            className= "showing"
        />
        <br/>
        <br/>
           <MyButton onClick={() => {
          handleUpdate()
         
                  }}>update </MyButton>
        </HolerC>
        <br/>
              
          </Holder>
}

interface UpdatedProps {
  onConfirm: () => void;

}

const Updated:React.FC<UpdatedProps> = (props) => {
  return (
     <>
          {ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm} />, document.getElementById("details-root")!)}
          {ReactDOM.createPortal(<ModelOverlay />, document.getElementById("ov-root")!)}
      </>
  )
}

export default Updated


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

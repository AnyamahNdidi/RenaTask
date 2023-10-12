import axios from './axios';


interface user{
    blogTitle: string,
    img: string,
    content:string
    
}

export const creatMyBlog = async (data: user) => {
   
      const response = await axios.post(`/data.json`, data, );
      return response.data;

};


export const ReadAllBlog= async () => {
  
    const response = await axios.get(`/data.json`)
      return response.data;
 
};


export const fetchSingleBlog = async (id: string) => {
  
      const response = await axios.get(`/${id}.json`);
      return response.data;
  
};

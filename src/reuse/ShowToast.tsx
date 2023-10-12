import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ShowToast = (isSuccess: boolean, value: string) => {
   if (isSuccess) {
      toast.success(value, {
         autoClose: 3000,
      });
   } else {
      toast.error(value, {
         autoClose: 3000,
      });
   }
};

export default ShowToast;
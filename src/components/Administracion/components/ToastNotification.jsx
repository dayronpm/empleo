import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notifySuccess = (message) => toast.success(message);
const notifyError = (message) => toast.error(message);

const ToastNotification = () => {
  return <ToastContainer />;
};

export { notifySuccess, notifyError }; // Exporting both notify functions
export default ToastNotification;

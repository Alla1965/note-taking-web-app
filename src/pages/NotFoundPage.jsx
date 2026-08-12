import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
 const navigate = useNavigate();

 useEffect(() => {
 const timer = setTimeout(() => {
 navigate("/", { replace: true });
 }, 3000);

 return () => clearTimeout(timer);
 }, [navigate]);

 return <h1>Сторінку не знайдено. Повертаємоcь на головну...</h1>;
};
export default NotFoundPage;

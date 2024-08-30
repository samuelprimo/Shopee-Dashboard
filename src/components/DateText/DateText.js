import { Description } from "../Text/Description/Description";
import "./style.scss"            

export function DateText (){
const time= Date.now();   
const today= new Date(time);

const weekDay = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-Feira", "Sábado"];
const month = ["Jan", "Fev", "Mar","Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov","Dez"];
const todayDate= `${today.getDate()} ${month[today.getMonth()]} ${today.getFullYear()}, ${weekDay[today.getDay()]}`;
return(
    <>
        <Description fontWeight={500} fontSize={"3.2rem"} color={"#B4B4B4"} className="date-text">{todayDate}</Description> 
        <hr className="date-line" color="#e9e9e9"/>
    </>
)

}
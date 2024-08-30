import "./style.scss"
import { useEffect, useState } from "react";
import { ContentArea } from "../../components/ContentArea/ContentArea";
import { DateText } from "../../components/DateText/DateText";
import { Title } from "../../components/Text/Title/Title";
import { api } from "../../services/Api";

export function Dashboard() {
  const [data, setData] = useState([]);
  const [userSales, setUserSales] = useState([]);

  async function loadingData() {
    const response = await api.get("/sales");
    setData(response.data);
  }

  function treatDate(dataLegal) {
    const transformedDate = new Date(dataLegal);
    const returningDate = `${String(transformedDate.getDate()).padStart(2, "0")}/${String(transformedDate.getMonth()+1).padStart(2, "0")}/${transformedDate.getFullYear()}`
    const returningTime = `${String(transformedDate.getHours()).padStart(2, "0")}:${String(transformedDate.getMinutes()).padStart(2, "0")}:${String(transformedDate.getSeconds()).padStart(2, "0")}`
    return [returningDate, returningTime]
  }

useEffect(() => {
    loadingData();
},[])

useEffect(() => {
  setUserSales(data.filter((sale) => sale.seller.email === "iaragao@example.net"));
}, [data]);

    return (
      <ContentArea>
        <Title fontWeight={500}> 
        Dashboard
        </Title>
        
        <DateText/>
         
      <Title fontWeight={500} >Últimas vendas deste mês</Title>

      <div className="table-wrapper-box">
      <table>
      <tbody>
        {userSales.map((sale, index) => {
          let [returningDate, returningTime] = treatDate(sale.date)
          return(
            <tr key={index}>
              <td className="green">{sale.product.name}</td>
              <td>{returningDate}</td>
              <td>{returningTime}</td>
              <td>R$ {`${(sale.price / 1000).toFixed(1)}k`}</td> 
            </tr>
          )
        })}
      </tbody>
      </table>
      </div>
      </ContentArea>
    );
  }
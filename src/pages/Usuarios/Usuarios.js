import "./style.scss"
import { useState, useEffect } from "react";
import { ContentArea } from "../../components/ContentArea/ContentArea";
import { DateText } from "../../components/DateText/DateText";
import { Title } from "../../components/Text/Title/Title";
import { useRef } from "react";
import { Description } from "../../components/Text/Description/Description";
import { api } from "../../services/Api";

export function Usuarios() {
  const [order, setOrder] = useState('decrescente');
  const [data, setData] = useState([]);
  const [classes, setClasses] = useState(['gold', 'silver', 'bronze', ''])

  useEffect(() => {
    async function getSales() {
      await api.get("/sales").then((result) =>{
        const salesBySeller = {};

        result.data.forEach((sale) => {
          const { seller, price } = sale;
          const sellerKey = `${seller.first_name} ${seller.last_name}`;

          if (salesBySeller[sellerKey]) {
            salesBySeller[sellerKey] += price;
          } else {
            salesBySeller[sellerKey] = price;
          }
        });
        const salesArray = Object.entries(salesBySeller);
        setData(salesArray.sort((a, b) => b[1] - a[1]))
      });
    }
    getSales();
  }, []);

  useEffect(() => {
    if (data && data.length > 0){
      if (order === 'crescente') {
        setData((prevData) => [...prevData].sort((a, b) => a[1] - b[1]));
        setClasses(['', '', '', ''])
      } else {
        setData((prevData) => [...prevData].sort((a, b) => b[1] - a[1]));
        setClasses(['gold', 'silver', 'bronze', '']);
      }
    }
  }, [order]);

  let isReverse = false;

    return (
      <ContentArea>
        <Title fontSize={"3.3rem"} fontWeight={500}> 
        Usuários
        </Title>
        <DateText/>

       <Description color={"#000000"} fontSize={"1.7rem"} fontWeight={500} >Ordenar por </Description>
        <select id="order" onChange={(event) =>{setOrder(event.target.value)}}>
          <option value="decrescente">Decrescente</option>
          <option value="crescente">Crescente</option>
        </select>
         
     

      <div className="table-wrapper">
      <table>
      <tbody>
        {data.length > 0 && data.slice(0, 4).map((sale, index) => (
          <tr key={index}>
            <td className={[classes[index]]}>{sale[0]}</td>
            <td> {`R$ ${(sale[1] / 1000).toFixed(1)}k`}</td>
          </tr>
        ))}
        
  
      </tbody>
      </table>
      </div>
      </ContentArea>
    );
  }
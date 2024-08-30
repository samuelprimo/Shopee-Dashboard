import "./style.scss";
import 'chart.js/auto';
import { Line } from "react-chartjs-2";
import {useState, useEffect} from "react"
import { Title } from "../Text/Title/Title";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineController, PointElement, LinearScale, CategoryScale} from "chart.js";

export function Chartbox({ user, year, month, title, data}){
  const [daysOfMonth, setDaysOfMonth] = useState(0);
  const [daysLabel, setDaysLabel] = useState([]);
  const [amountOfSales, setAmountOfSales] = useState([]);

  ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineController);
  ChartJS.defaults.plugins.legend.display = false;
  ChartJS.defaults.scales.category.grid = {
    display: false
  }; 
  
  function daysInMonth (month, year) {
    const numberOfDays = new Date(year, month+1, 0);
    return Number(numberOfDays.getDate());
  }

  function extractYearAndMonth(dateString) {
    const extractedDate = new Date(dateString);
    return [extractedDate.getMonth()+1, extractedDate.getFullYear()];
  }

  function extractDay(dateString) {
    const extractedDate = new Date(dateString);
    return extractedDate.getDate();
  }
  
  useEffect(() => {
    setDaysOfMonth(daysInMonth(month, year))
    
    if(daysOfMonth > 0) {
      
      const days = [...Array(daysOfMonth).keys()].map(key => `${key+1}`)
      setDaysLabel(days)
      setAmountOfSales([...Array(daysOfMonth).keys()].map(() => 0));
    }
  }, [daysOfMonth, year, user])
  
  useEffect(() => {
    if(data && amountOfSales.length > 1) {
      let salesPerDay = []
  
      data.forEach((sale, index) => {
        const [dataMonth, dataYear] = extractYearAndMonth(data[index].date);
        const [saleMonth, saleYear] = extractYearAndMonth(`${year}-${month+1}`);
        const dataDay = extractDay(data[index].date)
        const saleDay = extractDay(sale.date)
    
        if(dataMonth == saleMonth && dataYear == saleYear && dataDay == saleDay && `${sale.seller.first_name + " " + sale.seller.last_name}` === user) {
          salesPerDay.push(sale);
        }
      })
      if(salesPerDay.length > 0) {
        salesPerDay.forEach((item) => {
          determineSalesByDay(extractDay(item.date), salesPerDay.length);
        })
      } 
    }

  }, [data, daysLabel, year, user])

  function determineSalesByDay(day, saleAmount) {
    const salesByDay = [
      ...amountOfSales.slice(0, day-1),
      saleAmount,
      ...amountOfSales.slice(day+1)
    ];
    setAmountOfSales(salesByDay);
  }


return(
  <div className="chart-wrapper">
    <Title fontSize={"1.6rem"} margin={0}>{title}</Title>
    <Line  data={{
         labels: daysLabel,
         datasets: [{  
           data: amountOfSales,
           type: "bar",
           backgroundColor: "#EB4C4C",
           borderWidth: 1,
           borderColor: "rgba(0,0,0,0)",
           borderRadius: 20,
           inflateAmount: 1,
           options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1,
                  precision: 0 
                },
              },
            },
          },
         },
       ]
       }} /> 
  </div> 
)

}
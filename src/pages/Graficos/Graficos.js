import "./style.scss";
import { useState, useEffect } from "react";
import { ContentArea } from "../../components/ContentArea/ContentArea";
import { DateText } from "../../components/DateText/DateText";
import { Title } from "../../components/Text/Title/Title";
import { Description } from "../../components/Text/Description/Description";
import { ChartBoxArea } from "../../components/ChartBoxArea/ChartBoxArea";
import { api } from "../../services/Api";

export function Graficos() {
  const [chartData, setChartData] = useState([]);
  const [nameOptions, setNameOptions] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);
  const [yearValue, setYearValue] = useState("");
  const [nameValue, setNameValue] = useState("");


  //Essa parte dos gráficos ainda apresenta problemas e será corrigida!


  async function loadData() {
    const response = await api.get("/sales");
    setChartData(response.data);
  }
  function treatDate(dataLegal) {
    const transformedDate = new Date(dataLegal);
    return Number(transformedDate.getFullYear())
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
   
    if(chartData.length > 0) {
    handleYearOptions(chartData);
    handleNameOptions(chartData);
    }
  }, [chartData]);

  function handleNameOptions(array) {
    let nameList = [];
    let final = [];
    let count = 0;
    array.forEach((item, index) => {
      
      if(chartData[index]?.seller.first_name === item.seller.first_name && count === 0) {
        count = 1;
        nameList.push(item)
        if(chartData[index - 1]?.seller.first_name !== item.seller.first_name) {
          count = 0;
        }
      }
    })
    let unique = [];
    let uniqueLast = [];
    nameList.forEach((item) => {
      if(!unique.includes(item.seller.first_name) && !unique.includes(item.seller.last_name)) {
        unique.push(`${item.seller.first_name}`)
      }
      if(!uniqueLast.includes(item.seller.last_name)) {
        uniqueLast.push(`${item.seller.last_name}`)
      }
    })
    uniqueLast.forEach((item, index) => {
      if(index < uniqueLast.length - 1) {

        final.push(`${unique[index]} ${item}`)
      }
      if(index === uniqueLast.length - 1) {
        final.push(`${unique[5]} ${item}`)
      }
      setNameOptions((options) => [...options, {label: final[index], value: final[index]}]);
    })
    
  }
  function handleYearOptions(array) {
    let yearList = [];
    let count = 0;
    array.forEach((item, index) => {
      
      if(index > 0) {
        if(treatDate(chartData[index - 1]?.date) !== treatDate(item.date)) {
          count += 1;
          
          if(count <= 2) {
            yearList.push(item)
            setYearOptions((options) => [...options, {label: `${treatDate(item.date)}`, value: `${treatDate(item.date)}`}]);
          }
        }
      }
    })
  }

  function handleYearChange(event) {
  
    setYearValue(event.target.value);
  }
  function handleNameChange(event) {
    setNameValue(event.target.value);
  }
 
    return (
      <ContentArea>
        <Title fontSize={"3.3rem"} fontWeight={500}> 
        Gráficos
        </Title>
        <DateText/> 

        <div style={{display:"flex"}}>

        <div style={{marginRight:"2rem"}}>
        <Description color={"#000000"} fontWeight={500}>Ano de Referência</Description>
        
       
        <select onChange={handleYearChange}>
        <option value={null}></option>
        {yearOptions.map((year, index) => {
          return(
            <option key={index} value={year.value}>
              {year.label}
            </option>
          )
        })}
        </select>
        </div>
        <div>
        <Description color={"#000000"} fontWeight={500}>Vendedor</Description>
        <select onChange={handleNameChange}>
          <option value={null}></option>
        {nameOptions.map((name, index) => {
          return(
            <option key={index} value={name.value}>
              {name.label}
            </option>
          )
        })}
        </select>
        </div>
        </div>
       
       {yearValue && nameValue &&  (

       <ChartBoxArea year={yearValue} data={chartData} user={nameValue} />
       )}
         
      </ContentArea>
    );
  }
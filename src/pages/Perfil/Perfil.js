import "./style.scss";
import {useEffect, useState} from "react"
import { ContentArea } from "../../components/ContentArea/ContentArea";
import { api } from "../../services/Api";
export function Perfil({urlUser}) {
  const [data, setData] = useState(null);

  async function loadData() {
    const response = await api.get("/users/me");
    setData(response.data);
  }

  useEffect(() => {
    loadData();
  }, [])
 
  return (
    <>
    {data != null && (

    <ContentArea>
      <div className="content-wrapper">
        <div className="box">
                <div className="area1">
                    {urlUser ? (
                      <img className="profile" src={urlUser}/>
                    )
                    :
                    (
                      
                      <div className="profile">{data.first_name[0]}</div>
                    )
                  }
                    <h1>{data.first_name + " " + data.last_name}</h1>
                    <p>{data.occupancy}</p>
                </div>
                <hr className="bar" color="#f1f1f1"/>
                <div className="area2">
                  <div className="inputs">
                    <label for="first-name" >Primeiro nome: </label>
                    <input id="first-name" value={data.first_name}/>
                  </div>
                  <div className="inputs">
                    <label for="midle-name">Sobrenome: </label>
                    <input id="midle-name" value={data.last_name} />
                  </div>
                  <div className="inputs">
                    <label for="phone">Telefone: </label>
                    <input id="phone" value={data.phone} />
                  </div>
                  <div className="inputs">
                    <label for="e-mail">E-mail: </label>
                    <input id="-mail" value={data.email} />
                  </div>
                  <div className="inputs">
                    <label for="cpf">CPF: </label>
                    <input id="cpf"  value={data.cpf} />
                  </div>
                  <div className="inputs">
                    <label for="id">ID: </label>
                    <input id="id" value={4} />
                  </div>
                </div>
        </div>
      </div>
         
    </ContentArea>
    )}
    </>
  );
}
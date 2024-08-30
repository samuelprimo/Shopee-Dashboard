import { Chartbox } from "../ChartBox/ChartBox"
import "./style.scss"

export function ChartBoxArea({year, user, data}) {
    const months = [...Array(12).keys()].map(key => new Date(0, key).toLocaleString('pt-br', { month: 'long' }))

    return(
        <div className="chart-area">
            {months.map((month, index) => {
                return(
                    <Chartbox key={index} user={user} title={month} month={index} year={year} data={data}/>
                )
            })}
         </div>
    )
}
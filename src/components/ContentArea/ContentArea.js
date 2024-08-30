import "./style.scss"

export function ContentArea({children, style}){
return(
    <div className="content" style={style}>
        {children}
    </div>
)
}

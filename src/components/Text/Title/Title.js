import "./style.scss"

export function Title({children, fontSize, fontWeight, margin}){
return(
    <h1 className="title" style={{fontSize:fontSize, fontWeight:fontWeight, margin: margin}}>{children}</h1>
)
}
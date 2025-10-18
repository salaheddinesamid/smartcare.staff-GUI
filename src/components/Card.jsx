
export const Card = ({details})=>{

    return(
        <div className="stat-card" style={{
            backgroundColor : details.backgroundColor
        }}>
            <div className="stat-info">
                <span className="stat-title">{details.title}</span>
                <span className="stat-value">{details.data}</span>
            </div>
        </div>
    )
}
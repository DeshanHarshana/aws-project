import { useHistory, useLocation } from "react-router-dom";
import "./year.css";
let data = require('./data.json');

function Years(props) {
    const location = useLocation()
    const history = useHistory()
    const subjectName=location.state
   
    return (
        <div className="row">
            
            <div className="row">
                <div className="col-2">
                <button className="backButton" onClick={()=>{history.push({pathname:"/dashboard/main"})}}><i className="fas fa-arrow-alt-circle-left"></i> Back</button>
                </div>
                <div className="col-10">
                <h1 style={{ fontFamily:"Typo" }}>{subjectName.name}</h1>
                </div>
            </div>
            
            {data.map((value, index) => {
                return (
                    <div key={index} className="col-6">
                        <div className="card 1" onClick={()=>{                               
                                    history.push({
                                        pathname:"/dashboard/subjectlist",
                                        state:{subjectName:subjectName.name, Year:value.name}
                                    });
                        }}>
                            <div className="card_image"> <img src={value.imageUri} alt="img"/> </div>
                            <div className="card_title title-white">
                                <p style={{ fontSize:"1.3rem", paddingTop:"2%", fontFamily:"Typo" }}>{value.name}</p>
                            </div>
                        </div>
                    </div>)
            })}
        </div>
    )
}

export default Years

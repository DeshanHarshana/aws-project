import React from 'react';
import { Switch, Route, useHistory, withRouter } from "react-router-dom";
import AddSubject from '../AddSubject/AddSubject';
import ChooseExam from '../Exam/ChooseExam';
import Main from '../MainPage/Main';
import AddPaper from '../PaperList/Paper/AddPaper/AddPaper';
import PaperList from '../PaperList/PaperList';
import SubjectList from '../SubjectList/SubjectList';

import Years from '../Years/Years';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import "./dashboard.css"

let data=require('./data.json')

const Dashboard = (props) => {
    const history = useHistory();
    if(!(localStorage.getItem("role") && localStorage.getItem('email'))){
        history.push("/")
    }
        
    return (

        <div className="container-fluid grad">
                  
            <div className="row">
      
            <div className="col-1  " > 
                <div className="logo rounded mx-auto d-block" > 
                
                </div>
            </div>
            <div className="col-3 "  > 
                <div className="dist">
                  <div className="data">
                  <p  className="post"> Name: {localStorage.getItem('username')}  <br/>
                    Position: {localStorage.getItem('role')}
                  </p>

             
                  </div>
                </div>
            </div>
            <div className="col-6" > 
                <h2 className="topic">University of Jaffna,  Faculty of Science</h2>
            </div>
            <div className="col-2 " > 
                <div  className="logout d-flex justify-content-center" >
              <p  className="sign" style={{ fontSize:"2rem", paddingTop:"1.7rem", cursor:"pointer"}} onClick={(()=>{
                  confirmAlert({
                    title: 'Logout',
                    message: "Are you sure to logout?",
                    
                    buttons: [
                      {
                        label: 'Yes',
                        onClick: () => {
                            history.push("/");
                            localStorage.removeItem("username");
                            localStorage.removeItem("role");
                            localStorage.removeItem("email");
                        }
                      },
                      
                    ]
                  });
                    

              })}>Sign out </p>
</div>
</div>
</div>     
            <div className="row mt-5">
                <div className="col-2 shadow pt-5 bg" style={{ marginLeft: "1vw"}}>
                    {data.map((value,index)=>{
                        return(
                        <div className="row" key={index} style={{ marginBottom: "15%" }} onClick={()=>{
                            history.push({
                                pathname:"/dashboard/year",
                                state:{name:value.name}
                            });
                        }}>
                        <p className="cta">
                            <span>{value.name}</span>
                            <svg width="8px" height="10px" viewBox="0 0 8 10">
                            </svg>
                        </p>
                    </div>
                        )
                    })}
                    
                    
                </div>
             <div className="col-9 shadow p-4" style={{width: '80%', marginLeft: "1vw", marginBottom: '2vh' }}>
                    <Switch>
                        <Route exact path="/dashboard/main" component={() => <Main data={data} />}></Route>
                        <Route exact path="/dashboard/year" component={Years}></Route>
                        <Route exact path="/dashboard/subjectlist" component={SubjectList}></Route>
                        <Route exact path="/dashboard/addsubject" component={AddSubject}></Route>
                        <Route exact path="/dashboard/exams" component={ChooseExam}></Route>
                        <Route exact path="/dashboard/paperlist" component={PaperList}></Route>
                        <Route exact path="/dashboard/addpaper" component={AddPaper}></Route>
                    </Switch>
         
             </div>
            </div>
      </div>
      
      
    )
}




export default withRouter(Dashboard)

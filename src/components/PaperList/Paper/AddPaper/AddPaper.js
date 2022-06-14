import React, { useState } from 'react';
import { useHistory, useLocation } from "react-router-dom"
import { uploadFile } from 'react-s3';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const S3_BUCKET ='unipaperbucket';
const REGION ='us-east-1';


const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}

const AddPaper = () => {
    const location = useLocation()
   
    const history=useHistory()
    var isDisable=false
     //fields
     const [paperYaer, setPaperYaer] = useState("");
     const [regNo, setRegNo] = useState("");
 
     const [description, setDescription] = useState("");
     const [selectedFile, setSelectedFile] = useState(null);

     const handleFileInput = (e) => {
         setSelectedFile(e.target.files[0]);
     }

    const addpaper = (event) =>{
        event.preventDefault()
        isDisable=true;
        if(selectedFile){
        
            const uploading = new Promise((resolve,reject) => {
                uploadFile(selectedFile, config)
                .then(data => { 
                    let info={
                        id:uuidv4(),
                        department:location.state.data.department,
                        subjectCode:location.state.data.subjectCode,
                        year:location.state.data.year,
                        exam:location.state.data.exam,
                        paperYear:paperYaer,
                        regNo:regNo,
                        description:description,
                        fileUrl:data.location,
                        ownerEmail:localStorage.getItem("email"),
                        filename:selectedFile.name
                    }
                    axios.put("https://mwhnp1hb4f.execute-api.us-east-1.amazonaws.com/addPaper", info).then(res => {
                        console.log(res.data);
                        resolve();
                        history.push({
                            pathname:"/dashboard/paperlist",
                            state:{data:info}
                        });
                    }).catch(error => {
                        console.log(error);
                        toast.error("Something went wrong i can feel it");
                    
                    })
                  console.log(info)
                 
                })
                .catch(err => {
                  console.error(err);
                  reject();
                })
              });
              toast.promise(
                uploading,
                  {
                    pending: 'Uploading, Please Wait',
                    success: 'Upload Successfully 👌',
                    error: 'Upload Failed 🤯'
                  }
              )
               
                
        }else{
            console.log("Choose image")
        }

    }
    return (
        <div>
            <ToastContainer />
            <div className="row">
                <div className="col-12" style={{ marginBottom: "3%", marginTop: '3%' }}>
                    <h2>Add Subject</h2>
                </div>
            </div>
            <form onSubmit={addpaper}>
            <div className="row ">
               
                <div className="col-6 " >
                    <label className="d-flex justify-content-start">Paper Year</label>
                    <input className="form-control form-control-lg" type="text" id="subname" required  placeholder="Paper Year" onChange={(event)=>{
                       setPaperYaer(event.target.value)
                    }} />
                </div>
                <div className="col-6">
                    <label className="d-flex justify-content-start">Registration number</label>
                    <input className="form-control form-control-lg" type="text" placeholder="Registration number" required onChange={(event)=>{
                        setRegNo(event.target.value)
                    }} />
                </div>
                <div className="col-6" style={{ marginBottom: "3%", marginTop: '3%' }}>
                    <label className="d-flex justify-content-start">Year</label>
                    <input className="form-control form-control-lg" type="text" placeholder="Year" disabled={true} value={location.state.data.year} />
                </div>
                <div className="col-6" style={{ marginBottom: "3%", marginTop: '3%' }}>
                    <label className="d-flex justify-content-start">Department</label>
                    <input className="form-control form-control-lg" type="text" placeholder="Department" disabled={true} value={location.state.data.department} />
                </div>
                <div className="form-group">
                    <label className="d-flex justify-content-start" htmlFor="exampleFormControlTextarea1">Description</label>
                    <textarea className="form-control" required placeholder="Description..." id="exampleFormControlTextarea1" rows="4" onChange={(event)=>{
                        setDescription(event.target.value);
                    }}></textarea>
                </div>
                <div className="col-12 d-flex justify-content-start">
                <input type="file" accept="application/pdf" onChange={handleFileInput}/>
            
                </div>
                <div className="col-12 d-flex justify-content-end">
                <input type="submit" disabled={isDisable} className="myButton"  value="Add Paper" />
                </div>
               
                
               
            </div>
            </form>
        </div>
    )
    
}

export default AddPaper

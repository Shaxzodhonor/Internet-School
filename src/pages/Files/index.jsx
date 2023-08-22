import React, { useEffect, useState, useContext } from 'react';
import { Context as LoginContext } from "../../LoginContext";
import request from '../../request';

const Files = () => {
  const [login, setLogin] = useContext(LoginContext)
  const [output, setOutput] = useState();
  const [allFile, setAllFile] = useState([]);
  const [deleteItem, setItem] = useState(null);

  useEffect(()=> {
    fetch(`${process.env.REACT_APP_API_ROOT}/file/getAll`)
    .then(res => res.json())
    .then(data => {
      if(data.status === "success") {
        setAllFile(data.data.reverse())
      } else {
        console.log("error");
      }
    })
  },[])

  
  function GetType(type){
    request.get(`/file/type/${type}`).then(data => {
      if(data?.status === 200) {
        console.log(data?.data?.data);
      }
    })
  }

  function SubmitForm (evt) {
    evt.preventDefault();

    const Form = evt.target.elements
    const inputFile = Form[0].files[0];    
    const formData = new FormData();
    formData.append("file", inputFile);

    request.post(`/file?type=${Form[1]?.value}`, formData).then(data => {
      console.log(data);
      if(data.status === "success") {
        setAllFile((prevState) => ([data?.data, ...prevState]))
        setOutput(data?.data)
      }
    })
    .catch((err) => {
      alert(err?.message)
      console.log(err);
    })


  }

  function Delete () {
    fetch(`${process.env.REACT_APP_API_ROOT}/file/${deleteItem}`, {
      method: "Delete",
      headers: {
        "Authorization": "Bearer " + login
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.status === "success") {
        setAllFile(prevState => prevState.filter(val => val.id != deleteItem))
        document.getElementById("closeModal").click()
      }
      
    })
    .catch((err) => {
      alert(err?.message)
      console.log(err);
    })

  }

  return (
    <div>
    <nav>
      <div className="nav nav-tabs" id="nav-tab" role="tablist">
        <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">File qo'shish</button>
        <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Files</button>
        {/* <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">---</button>
        <button className="nav-link" id="nav-disabled-tab" data-bs-toggle="tab" data-bs-target="#nav-disabled" type="button" role="tab" aria-controls="nav-disabled" aria-selected="false" disabled>Disabled</button> */}
      </div>
    </nav>
    <div className="tab-content" id="nav-tabContent">
      <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
        <form onSubmit={SubmitForm} className='border border-1 border-dark bg-white rounded p-5'>
          <div className="row">
            <div className="col-4">
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">Yangi file tanlang</label>
                <input name='file' className="form-control" type="file" id="formFile" required/>
              </div>
              <div className="mb-3">
                <label htmlFor="filetype" className="form-label">Typeni tanlang</label>
                <input name='type' className="form-control" type="number" id="filetype" required/>
              </div>
            </div>
            <div className="col text-dark">
              <div>ID: {output?.id}</div>
              <div>LINK: {output?.link}</div>
            </div>
          </div>
          <button type='submit' className='btn btn-outline-dark mt-4'>Tayyor</button>
        </form>
      </div>
      <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">
        <div className='bg-light p-4 rounded'>
          <div className="mb-3 w-25">
            <input className='form-control' type="text" onChange={(e)=> GetType(e.target.value)}/>
          </div>
          <div className="row">
            {allFile?.length ? allFile.map((val, key) => (
              <div key={key} className='col-4 border border-2 border-primary'>
                <div className="p-3">
                  <div className='border-2 border rounded p-2'>
                    <img src={val.link} alt="" width={"100%"}/>
                  </div>
                  <button type='button' className='btn btn-danger mt-2' onClick={()=> setItem(val?.id)} data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button>
                  
                  <div className='fs-14 fst-italic border mt-2 p-2 rounded fw-800'>ID: {val?.id}</div>
                  <div className='fs-14 fst-italic border mt-2 p-2 rounded'>{val?.link}</div>
                </div>
              </div>
            )) : null}
          </div>
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  Rostdan o'chirishni hoxlaysizmi?
                </div>
                <div className="modal-footer">
                  <button id='closeModal' type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-danger" onClick={Delete}>Ha</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabIndex="0">
        
      </div>
      <div className="tab-pane fade" id="nav-disabled" role="tabpanel" aria-labelledby="nav-disabled-tab" tabIndex="0">
   

      </div> */}
    </div>
 </div>
  );
};

export default Files;
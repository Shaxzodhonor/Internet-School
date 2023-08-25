import React, { useEffect, useState } from 'react';
import request from '../../request';

const Sections = () => {
  const [name, setName] = useState("")
  const [edit, setEdit] = useState()
  const [sections, setSection] = useState()

  useEffect(()=> {
    request.get(`http://13.233.237.234:8080/api/department/getAll`).then(data => {
      if(data.status === 200) {
        setSection(data?.data?.data)
      }
    })
  },[])

  function SubmitForm (evt) {
    evt.preventDefault();  

    request.post(`/department`, {name: name}).then(data => {
      if(data.status === 200) {
        setSection((prevState) => ([data?.data?.data, ...prevState]))
        setName("")
        alert("Success")
      }
    })
    .catch((err) => {
      alert(err?.message)
      console.log(err);
    })
  }
  function Edit(evt) {
    evt.preventDefault();

    request.patch("/department", edit).then(data => {      
      if(data.status === 200) {
        const mydata = data?.data?.data
        setSection((prevState) => prevState.map(sect => sect?.id === mydata?.id ? mydata : sect))
        alert("Success")
      }
    })
    .catch((err) => {
      alert(err?.message)
      console.log(err);
    })
  }  
  function Delete(id) {
    request.delete(`/department/${id}`).then(data => {
      if (data?.status === 200) {
        alert("Success")
        setSection(prevState => prevState.filter(val => val.id != id))
      }
    })
  }
  return (
    <>
      <div className="row">
        <div className="col-5">
          <form onSubmit={SubmitForm} className='border border-1 border-dark bg-white rounded p-5'>
          <div className="mb-3">
            <label htmlFor="section_name" className="form-label">Bo'lim nomi</label>
            <input className="form-control" name='name' type="text" id="section_name" value={name || ""} onChange={(e)=> setName(e?.target?.value)}/>
          </div>
            <button type='submit' className='btn btn-outline-dark mt-3'>Submit</button>
          </form>
        </div>
        <div className="col-7">
          <div className='h-100 border border-1 border-dark bg-white rounded p-5'>
            {sections?.length ? sections.map((section,id)=>(
              <div key={id} className='py-2'>ID : {section?.id} / {section?.name} 
                <button type='button' className='btn btn-danger p-1 mx-2' style={{fontSize:"12px"}} data-bs-toggle="modal" data-bs-target="#sectionModal" onClick={()=> setEdit(section)}>Tahrirlash</button>
                <button type='button' className='btn btn-danger p-1' style={{fontSize:"12px"}} onClick={Delete.bind(null,section?.id)}>O'chirish</button>
              </div>
            )) : null}
                <div className="modal" tabIndex="-1" id="sectionModal">
                <div className="modal-dialog modal-md">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Tahrir</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>                      
                    </div>
                    <div className="modal-body">
                      <form onSubmit={Edit} className='border border-1 border-dark bg-white rounded p-5'>
                       
                        <div className="mb-3">
                          <label htmlFor="section_name" className="form-label">Bo'lim nomini tahrirlang</label>
                          <input name='name' type="text" className="form-control" id="section_name" onChange={(evt)=> setEdit(prState => ({...prState, name: evt.target.value}))} value={edit?.name || ""}/>
                        </div>
                        <button type='submit' className='btn btn-outline-dark mt-4'>Tayyor</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sections;
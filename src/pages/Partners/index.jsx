import { useState, useEffect } from "react";
import request from "../../request";

const Partners = () => {
  const [all, setAll] = useState();
  const [edit, setEdit] = useState();
  const [editFile, setEditFile] = useState();
  
  useEffect(() => {
    request.get("/partner/getAll").then(data => {
      if (data.status === 200) {
        setAll(data?.data.data)
      }
    })
  },[])
  function SubmitForm (evt) {
    evt.preventDefault();

    const input = evt.target.elements[0].files[0];    
    const formData = new FormData();
    formData.append("photo", input);

   
    request.post(`/partner?name=${evt.target.elements[1]?.value}&linkWebsite=${evt.target.elements[2]?.value}`, formData).then(data => {          
      if(data.status === 200) {
        console.log(data);
        // setAll((prevState) => ([data?.data?.data, ...prevState]))
        alert("Success")
      }
    })
    .catch((err) => {
      alert(err?.message)
      console.log(err);
    })
  }
  function PartnerEdit(evt) {
    evt.preventDefault();

    const input = evt.target.elements[0].files[0];    
    const formData = new FormData();
    formData.append("photo", input);
    console.log(edit);
    // request.post("/partner", edit).then(data => {      
    //   if(data.status === 200) {
    //     const mydata = data?.data?.data
    //     setAll((prevState) => prevState.map(partner => partner?.id === mydata?.id ? mydata : partner))
    //     alert("Success")
    //   }
    // })
    // .catch((err) => {
    //   alert(err?.message)
    //   console.log(err);
    // })
  }
  function Delete(id) {
    request.delete(`/partner/${id}`).then(data => {
      if (data?.status === 200) {
        setAll(prevState => prevState.filter(val => val.id != id))
        alert("Delete Partner")
      }
    })
  }
  function OnChange(evt) {
    const name = evt.target.name
    const value = evt.target.value
    if(name === "file") {
      setEdit(prevState => ({...prevState, [name]: {id: value}}))
    } else {
      setEdit(prevState => ({...prevState, [name]: value}))
    }
  }
  return (
    <>
      <div className="row h-100">
        <div className="col-5">
          <form onSubmit={SubmitForm} className='border border-1 border-dark bg-white rounded p-5'>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">Hamkor logosini tanlang</label>
              <input name="photo" type="file" id="formFile" className="form-control" required/>
            </div>
            <div className="form-floating mb-3">
              <input name="name" type="text" className="form-control" required/>
              <label>Hamkor nomi</label>
            </div>
            <div className="form-floating mb-3">
              <input name="linkWebsite" type="text" className="form-control"/>
              <label>Hamkor link</label>
            </div>
            <button type='submit' className='btn btn-outline-dark mt-3'>Submit</button>
          </form>
        </div>
        <div className="col-7 h-100">
          <div className='h-100 border border-1 border-dark bg-white rounded p-5'>
            {all?.length ? all.map((partner,id) => (
              <div key={id} className="border my-3 p-3 rounded">
                <div><img src={partner?.photoLink} alt={partner?.name} height={"200px"}/></div>
                <div>{partner?.name}</div>
                <button type='button' className='btn btn-danger' onClick={Delete.bind(null,partner?.id)}>O'chirish</button>
                <button type='button' className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#partnerModal" onClick={()=> {
                  setEdit(partner)
                  setEditFile(partner?.photoLink ? true : false)
                }}>Tahrirlash</button>
              </div>
            )) : null}
               <div className="modal" tabIndex="-1" id="partnerModal">
                <div className="modal-dialog modal-xl">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Tahrir</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={PartnerEdit} className='border border-1 border-dark bg-white rounded p-5'>
                        <div className="row">
                        <div className="col-8">
                          {
                            editFile 
                            ? (
                                <div>
                                  <img src={edit?.photoLink} alt={edit?.name} height={"200px"}/>
                                  <button type="button" className="btn btn-outline-danger p-1" onClick={()=> setEditFile(false)}>O'chirish</button>
                                </div>
                              ) 
                            : (
                                <div className="mb-3">
                                  <label htmlFor="editpartnerlogo" className="form-label">LOGO ID</label>
                                  <input name="photo" className="form-control" type="file" id="editpartnerlogo" onChange={OnChange} value={edit?.file?.id || ""}/>
                                </div>
                              )
                          }
                        </div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">Hamkor nomi</label>
                          <input name="name" type="text" className="form-control" id="name" onChange={OnChange} value={edit?.name || ""}/>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="partnerlink" className="form-label">Hamkor link</label>
                          <input name="link" type="text" className="form-control" id="partnerlink" onChange={OnChange} value={edit?.link || ""}/>
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

export default Partners;
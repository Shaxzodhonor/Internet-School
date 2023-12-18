import { useState, useEffect, useContext } from "react";
import request from "../../request";
import { Context } from '../../LoginContext';

const Government = () => {
  const [all, setAll] = useState();
  const [edit, setEdit] = useState();
  const [editFile, setEditFile] = useState(true);
  const [login] = useContext(Context)

  useEffect(() => {
    request.get("/government/getAll").then(data => {
      if (data.status === 200) {
        setAll(data?.data.data)
      }
    })
  },[])
  function SubmitForm (evt) {
    evt.preventDefault();

    const Form = evt.target.elements;
    const input = Form[0].files[0];    
    const formData = new FormData();
    formData.append("photo", input);

   
    request.post(`/government?name=${Form[1]?.value}&linkWebsite=${Form[2]?.value}`, formData, {
      headers: {
         "Authorization": `Bearer ${login}`
      }
    }).then(data => {          
      if(data.status === 200) {
        setAll((prevState) => ([data?.data?.data, ...prevState]))
        alert("Success")
        evt.target.reset()
      }
    })
    .catch((err) => {
      alert(err?.message)
      console.log(err);
    })
  }
  function GovernmentEdit(evt) {
    evt.preventDefault();

    const formData = new FormData();
    if(!editFile) {
      formData.append("photo", evt.target.elements[0].files[0]);
    } else {
      formData.append("photo", "")
    }
    request.patch(`/government?name=${edit?.name}&linkWebsite=${edit?.linkWebsite}&id=${edit?.id}`, formData, {
      headers: {
         "Authorization": `Bearer ${login}`
      }
    }).then(data => {      
      if(data.status === 200) {
        setAll(prevState => prevState.map(val => val.id === data?.data?.data?.id ? data?.data?.data : val))
        alert("Success")
      }
    })
    .catch((err) => {
      alert(err?.message)
      console.log(err);
    })
  }
  function Delete(id) {
    request.delete(`/government/${id}`, {
      headers: {
         "Authorization": `Bearer ${login}`
      }
    }).then(data => {
      if (data?.status === 200) {
        setAll(prevState => prevState.filter(val => val.id != id))
        alert("Delete Success")
      }
    })
  }
  return (
    <div className="row h-100">
      <div className="col-5">
        <form onSubmit={SubmitForm} className='border border-1 border-dark bg-white rounded p-5'>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">Logo tanlang</label>
            <input name="photo" type="file" id="formFile" className="form-control" required/>
          </div>
          <div className="form-floating mb-3">
            <input name="name" type="text" className="form-control" required/>
            <label>Nomi</label>
          </div>
          <div className="form-floating mb-3">
            <input name="linkWebsite" type="text" className="form-control"/>
            <label>Link</label>
          </div>
          <button type='submit' className='btn btn-outline-dark mt-3'>Submit</button>
        </form>
      </div>
      <div className="col-7 h-100">
        <div className='h-100 border border-1 border-dark bg-white rounded p-5'>
          {all?.length ? all.map((government,id) => (
            <div key={id} className="border my-3 p-3 rounded">
              <div><img src={government?.photoLink} alt={government?.name} height={"200px"}/></div>
              <div>{government?.name}</div>
              <button type='button' className='btn btn-danger' onClick={Delete.bind(null,government?.id)}>O'chirish</button>
              <button type='button' className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#governmentModal" onClick={()=> {
                setEdit(government)
                setEditFile(government?.photoLink ? true : false)
              }}>Tahrirlash</button>
            </div>
          )) : null}
              <div className="modal" tabIndex="-1" id="governmentModal">
              <div className="modal-dialog modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Tahrir</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={GovernmentEdit} className='border border-1 border-dark bg-white rounded p-5'>
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
                                  <input name="photo" type="file" id="editpartnerlogo" className="form-control" disabled={editFile}/>
                                </div>
                              )
                          }
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nomi</label>
                        <input name="name" type="text" className="form-control" id="name" onChange={(e)=> setEdit(prSt => ({...prSt, name: e?.target?.value}))} value={edit?.name || ""}/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="partnerlink" className="form-label">Link</label>
                        <input name="linkWebsite" type="text" className="form-control" id="partnerlink" onChange={(e)=> setEdit(prSt => ({...prSt, linkWebsite: e?.target?.value}))} value={edit?.linkWebsite || ""}/>
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
  );
};

export default Government;
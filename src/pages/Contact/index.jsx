import { useEffect, useState } from 'react';
import request from '../../request';


const General = () => {
  const [editor, setEditor] = useState();

  useEffect(()=>{
    request.get(`/general`).then(data => {
      if(data?.status === 200 && data?.data?.data?.length) {
        setEditor(data?.data?.data[0])
        console.log(data?.data?.data[0]);
      }
    })
  },[])

  function EditForm(evt) {
    evt.preventDefault();   
    
    request.patch("/general", editor).then(data => {      
      if(data.status === 200) {
        
        // alert("Success")
        // setEditor(data?.data?.data)
      }
    })
    .catch((err) => {
      alert(err?.message)
      console.log(err);
    })
  
  }  

  return (
    <>
      <div className="row h-100">
        <div className="col-12">
          <form onSubmit={EditForm} className='border border-1 border-dark bg-white rounded p-5'>
            <div className='row'>
              <div className='col'>
                <div className="mb-3">
                  <label htmlFor="generalPhone" className="form-label">Phone</label>
                  <input type="tel" className="form-control" id="generalPhone" value={editor?.phone || ""} onChange={(e) => setEditor(prSt => ({...prSt, phone: e?.target?.value}))}/>
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="generalFax" className="form-label">Fax</label>
                  <input type="text" className="form-control" id="generalFax" value={editor?.fax || ""} onChange={(e) => setEditor(prSt => ({...prSt, fax: e?.target?.value}))}/>
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="generalEmail" className="form-label">Email</label>
                  <input type="email" className="form-control" id="generalEmail" value={editor?.email || ""} onChange={(e) => setEditor(prSt => ({...prSt, email: e?.target?.value}))}/>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="generalAdditional" className="form-label">Maktab video URL</label>
              <input type="url" className="form-control" id="generalAdditional" value={editor?.additional || ""} onChange={(e) => setEditor(prSt => ({...prSt, additional: e?.target?.value}))}/>
            </div>
            <div className="mb-3">
              <label htmlFor="generalTarget" className="form-label">Mo'ljal</label>
              <textarea className="form-control" id="generalTarget" rows="3" value={editor?.target || ""} onChange={(e) => setEditor(prSt => ({...prSt, target: e?.target?.value}))}></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="generalLocation" className="form-label">Manzil</label>
              <textarea className="form-control" id="generalLocation" rows="3" value={editor?.location || ""} onChange={(e) => setEditor(prSt => ({...prSt, location: e?.target?.value}))}></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="generalDirection" className="form-label">Yo'nalishlar</label>
              <textarea className="form-control" id="generalDirection" rows="2" value={editor?.direction || ""} onChange={(e) => setEditor(prSt => ({...prSt, direction: e?.target?.value}))}></textarea>
            </div>                      
            <button type='submit' className='btn btn-outline-dark mt-3'>Submit</button>
          </form>
        </div>      
      </div>
    </>
  );
};

export default General;
import { useEffect, useState, useContext } from 'react';
import request from '../../request';
import { Context } from '../../LoginContext';

const Statistics = () => {
  const [editor, setEditor] = useState();
  const [login] = useContext(Context)
  useEffect(()=>{
    request.get(`/statistic`).then(data => {
      if(data?.status === 200 && data?.data?.data?.length) {
        setEditor(data?.data?.data[0])
      }
    })
  },[])

  function EditForm(evt) {
    evt.preventDefault();   
    
    request.patch("/statistic", editor, {
      headers: {
        "Authorization": `Bearer ${login}`
      }
    }).then(data => {      
      if(data.status === 200) {
        alert("Success")
        setEditor(data?.data?.data)
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
                  <label htmlFor="statistc1" className="form-label">Statistika - 1</label>
                  <input type="text" className="form-control" id="statistc1" value={editor?.title1 || ""} onChange={(e) => setEditor(prSt => ({...prSt, title1: e?.target?.value}))}/>
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="statistic_1" className="form-label">Statistila - 1</label>
                  <input type="text" className="form-control" id="statistic_1" value={editor?.number1 || ""} onChange={(e) => setEditor(prSt => ({...prSt, number1: e?.target?.value}))}/>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <div className="mb-3">
                  <label htmlFor="statistic2" className="form-label">Statistika - 2</label>
                  <input type="text" className="form-control" id="statistic2" value={editor?.title2 || ""} onChange={(e) => setEditor(prSt => ({...prSt, title2: e?.target?.value}))}/>
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="statistic_2" className="form-label">Statistika - 2</label>
                  <input type="text" className="form-control" id="statistic_2" value={editor?.number2 || ""} onChange={(e) => setEditor(prSt => ({...prSt, number2: e?.target?.value}))}/>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <div className="mb-3">
                  <label htmlFor="statistic3" className="form-label">Statistika - 3</label>
                  <input type="text" className="form-control" id="statistic3" value={editor?.title3 || ""} onChange={(e) => setEditor(prSt => ({...prSt, title3: e?.target?.value}))}/>
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="statistic_3" className="form-label">Statistika - 3</label>
                  <input type="text" className="form-control" id="statistic_3" value={editor?.number3 || ""} onChange={(e) => setEditor(prSt => ({...prSt, number3: e?.target?.value}))}/>
                </div>
              </div>
            </div>  
            <button type='submit' className='btn btn-outline-dark mt-3'>Submit</button>
          </form>
        </div>      
      </div>
    </>
  );
};

export default Statistics;
import { useContext, useEffect, useState } from 'react';
import { Context  } from "../../LoginContext";
import SunEditor from 'suneditor-react';
import request from '../../request';


const Direction = () => {
  const [editor, setEditor] = useState()
  const [edit, setEdit] = useState()
  const [all, setAll] = useState([])
  const [department, setDepartment] = useState([])
  const [login] = useContext(Context)
  useEffect(()=>{
    request.get(`/department/getAll`).then(data => {
      if(data?.status === 200) {
        setDepartment(data?.data?.data)
      }
    })
  },[])

  function SubmitForm (evt) {
    evt.preventDefault();
    const form = evt.target.elements;
    const obj = [...Array(3)].reduce((acc, _, id) => {    
      return form[id]?.name === "department" ? {...acc, department: {id: form[id]?.value}} : {...acc, [form[id]?.name]: form[id]?.value}
    },{})
    
    request.post(`/direction`, {...obj, history: editor}, {
      headers: {
         "Authorization": `Bearer ${login}`
      }
    })
    .then(data => {
      if(data.status === 200) {
        evt.target.reset()
        setEditor("")
        alert("Success")
        DirectionSelect(obj?.department?.id)
      }
    })
    .catch((err) => {
      alert(err?.message)
      console.log(err);
    })

  }
  function DirectionId(evt) {
    evt.preventDefault();
    request.patch("/direction", edit, {
      headers: {
         "Authorization": `Bearer ${login}`
      }
    }).then(data => {      
      if(data.status === 200) {
        const mydata = data?.data?.data
        setAll((prevState) => prevState.map(nws => nws?.id === mydata?.id ? mydata : nws))
        alert("Success")
      }
    })
    .catch((err) => {
      alert(err?.message)
      console.log(err);
    })
  
  }  
  function Delete (deleteItem) {
    request.delete(`/direction/${deleteItem}`, {
      headers: {
         "Authorization": `Bearer ${login}`
      }
    }).then(data => {
      if (data?.status === 200) {
        setAll(prevState => prevState.filter(val => val.id != deleteItem))
        alert("Success")
      }
    })
  }
  function DirectionSelect(id) {
    request.get(`/direction/department/${id}`).then(data => {
      if(data?.status === 200) {
        setAll(data?.data?.data)
      }
    })
  }
  return (
    <>
      <div className="row h-100">
        <div className="col-5">
          <form onSubmit={SubmitForm} className='border border-1 border-dark bg-white rounded p-5'>       
           
            <div className='row'>
              <div className="col-6">
                <label className="form-label">Bo'lim nomi</label>
                <select className="form-select form-select" name='department' defaultValue={"Open this select menu"}>
                  <option disabled>Bo'limni tanlang</option>
                  {department?.length ? department.map((dep) => (
                    <option key={dep?.id} value={dep?.id}>{dep?.name}</option>
                  )) : null}
                </select>
              </div>
              <div className="col-6">
                <label htmlFor="level_direction" className="form-label">Tartib</label>
                <input name='level' type="number" className="form-control" id="level_direction"/>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="direction_name" className="form-label">Yo'naish nomi</label>
              <input name='name' type="text" className="form-control" id="direction_name"/>
            </div>
            <SunEditor
              setContents={editor}                
              setOptions={{
                font: ['LagunaC', 'Monserrat', 'Arial', 'Verdana', 'Roboto', 'Georgia', 'sans-serif'],
                placeholder: 'Enter content here...',
                buttonList: [
                    ['undo', 'redo'],
                    ['font', 'fontSize', 'formatBlock', 'lineHeight'],
                    ['paragraphStyle', 'blockquote'],
                    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                    ['fontColor', 'hiliteColor', 'textStyle'],
                    ['outdent', 'indent'],
                    ['align', 'horizontalRule', 'list'],
                    ['table', 'link', 'image', 'video', 'audio'],
                    ['fullScreen', 'showBlocks', 'codeView'],
                    ['preview', 'print', 'save'],
                  ],
              }}
              onChange={(evt) => setEditor(evt)}
            />
            <button type='submit' className='btn btn-outline-dark mt-3'>Submit</button>
          </form>
        </div>
        <div className="col-7">
          <div className='h-100 border border-1 border-dark bg-white rounded p-5'>
            <select className="form-select form-select" defaultValue={0} onChange={(evt) => {
              DirectionSelect(evt.target.value)
            }}>
              <option disabled value={0}>Bo'limni tanlang</option>
                {department?.length ? department.map((dep) => (
              <option key={dep?.id} value={dep?.id}>{dep?.name}</option>
              )) : null}
            </select>
            {
              all?.length 
              ? all.map(value => (
                <div key={value.id} className="border my-3 p-2 d-flex align-items-center">
                  <span className='me-3 bg-info text-white px-2'>ID: {value?.id}</span> {value?.name} 
                  <button type='button' className='ms-auto btn btn-danger' onClick={Delete.bind(null, value?.id)}>O'chirish</button>
                  <button type='button' className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#directionModal" onClick={()=> setEdit(value)}>Tahrirlash</button>
                </div>
              )) : null
            }
            <div className="modal" tabIndex="-1" id="directionModal">
                <div className="modal-dialog modal-xl">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Tahrir</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={DirectionId} className='border border-1 border-dark bg-white rounded p-5'>
                        <div className="row">
                          <div className='col-6'>
                            <label className="form-label">Bo'limni tanlang</label>
                            <select className="form-select form-select" value={edit?.department?.id}  onChange={(evt)=> setEdit(prSt => ({...prSt, department: {id: evt.target.value}}))}>
                              <option disabled>Bo'limni tanlang</option>
                              {department?.length ? department.map((dep) => (
                                <option key={dep?.id} value={dep?.id}>{dep?.name}</option>
                              )) : null}
                            </select>
                          </div>
                          <div className="col-6">
                            <label htmlFor="level_direction" className="form-label">Tartib</label>
                            <input name='level' type="number" className="form-control" id="level_direction" value={edit?.level || ""} onChange={(evt) => setEdit(prState => ({...prState, level: evt.target.value}))}/>
                          </div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="direction_name_edit" className="form-label">Yo'naish nomi</label>
                          <input type="text" className="form-control" id="direction_name_edit" value={edit?.name || ""} onChange={(evt)=> setEdit(prSt => ({...prSt, name: evt.target.value}))}/>
                        </div>
                        <SunEditor
                          setContents={edit?.history}                         
                          setOptions={{ height: "400px",
                            font: ['LagunaC', 'Monserrat', 'Arial', 'Verdana', 'Roboto', 'Georgia', 'sans-serif'],
                            placeholder: 'Enter content here...',
                            buttonList: [
                              ['undo', 'redo'],
                              ['font', 'fontSize', 'formatBlock', 'lineHeight'],
                              ['paragraphStyle', 'blockquote'],
                              ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                              ['fontColor', 'hiliteColor', 'textStyle'],
                              ['outdent', 'indent'],
                              ['align', 'horizontalRule', 'list'],
                              ['table', 'link', 'image', 'video', 'audio'],
                              ['fullScreen', 'showBlocks', 'codeView'],
                              ['preview', 'print', 'save'],
                            ],
                          }}
                          onChange={(evt) => setEdit(prState => ({...prState, history: evt}))}
                        />
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

export default Direction;
import { useContext, useEffect, useState } from 'react';
import { Context as LoginContext } from "../../LoginContext";
import request from '../../request';
import 'suneditor/dist/css/suneditor.min.css';
import SunEditor from 'suneditor-react';

const Employee = () => {
  const [postion, setPosition] = useState()
  const [direction, setDirection] = useState()
  const [login] = useContext(LoginContext)
  const [output, setOutput] = useState()
  const [editor, setEditor] = useState()
  const [edit, setEdit] = useState()
  
  const [employee, setEmployee] = useState()
  

  useEffect(() => {
    request.get("/employee/getAll").then(data => {
      if(data.status === 200) {
        setOutput(data?.data?.data)
        console.log(data?.data?.data);
      }
    })
    request.get("/position/getAll").then(data => {
      if(data.status === 200) {
        setPosition(data?.data?.data)
      }
    })
    request.get("/direction/getAll").then(data => {
      if(data.status === 200) {
        setDirection(data?.data?.data)
      }
    })
  },[])

  function SubmitForm (evt) {
    evt.preventDefault(); 
    const form = evt.target.elements;
    const obj = [...Array(5)].reduce((acc, _, id) => {    
      return form[id]?.name === "file" || form[id]?.name === "position" ? {...acc, [form[id].name]: {id: form[id]?.value}} : {...acc, [form[id]?.name]: form[id]?.value}
    },{})
    const employeeImg = form[5]?.files[0]
    const fileList = form[6]?.files
    
    console.log(obj, editor, fileList);
    // request.post(`${process.env.REACT_APP_API_ROOT}/employee`, obj)
    // .then(data => {
    //   if(data.status === 200) {
    //     setOutput(prevState => ([...prevState, data?.data?.data]))
    //     evt.target.reset()
    //     alert("Success")
    //   }
    // })
    // .catch((err) => {
    //   alert(err?.message)
    //   console.log(err);
    // })

  }
  function Delete (deleteItem) {
    request.delete(`/employee/${deleteItem}`).then(data => {
      if(data.status === 200) {
        setOutput(prevState => prevState.filter(val => val.id != deleteItem))
      }      
    })
    .catch((err) => {
      alert(err?.message)
      console.log(err);
    })
  }
  function Edit() {
    fetch(`${process.env.REACT_APP_API_ROOT}/employee`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + login
      },
      body: JSON.stringify({full_name: edit.full_name, about: edit.about, id: edit.id, file: {id: edit.file}, position: {id: edit.position}})
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.status === "success") {
        setOutput(prevState => prevState.map(val => val.id != data?.data.id ? val : data?.data))

      }
    })
    .catch((err) => {
      alert(err?.message)
      console.log(err);
    })
  }
  function Change(evt) {
    const name = evt.target.name
    const value = evt.target.value
    setEdit(prevState => ({...prevState, [name]: value}))
  }
  return (
    <>
      <div className="row h-100">
        <div className="col-4">
          <form onSubmit={SubmitForm} className='border border-1 border-dark bg-white rounded p-5'>       
           
            <div className="mb-3">
              <label>F.I.O</label>
              <input name='fullName' type="text" className="form-control" required />
            </div>            
            <div className="mb-3">
              <label className="form-label">Qisqacha</label>
              <input name='about' type="text" className="form-control"/>
            </div>
            <div className="mb-3">
              <label className="form-label">Type</label>
              <input name='type' type="number" className="form-control"/>
            </div>
            <div className="mb-3">
              <label className="form-label">Position</label>
              <select name='position_id' className="form-select">
                {postion?.length ? postion.map((value) => (
                  <option key={value.id} value={value.id}>{value.name}</option>
                )) : null}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Yo'nalish</label>
              <select name='direction_id' className="form-select">
                {direction?.length ? direction.map((value) => (
                  <option key={value.id} value={value.id}>{value.name}</option>
                )) : null}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Image</label>
              <input name='photo_file' type="file" className="form-control"/>
            </div>
            <div className="mb-3">
              <label className="form-label">Document Yuklash</label>
              <input name='list_files' type="file" className="form-control" multiple/>
            </div>
            <SunEditor
              setContents={editor}                
              setOptions={{                
                height: "900px",
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
        <div className="col-8 h-100">
          <div className=' border border-1 border-dark bg-white rounded p-5'>
            <div className="row">
              {
                output?.length
                ? output.map(value => (
                  <div key={value.id} className="col-6">
                    <div><img src={value.photoLink} alt="---" width={"100%"}/></div>
                    <div className='border my-3 p-2'>
                      <div className="d-flex align-items-center justify-content-between">
                        <span className='bg-info text-white p-2 rounded'>ID: {value.id}</span>
                        <button type="button" className="btn btn-primary" onClick={() => setEdit({full_name: value.full_name, about: value.about, id: value.id, file: value.file.id, position: value.position.id})} data-bs-toggle="modal" data-bs-target="#exampleModal">Tahrirlash</button>
                        <button type='button' className='btn btn-danger' onClick={Delete.bind(null, value.id)}>O'chirish</button>
                      </div>
                      <div className='pt-2'>{value.full_name}</div>
                      <div className='pt-2'>{value.about}</div>
                      <div className='pt-2'>{value.position.name}</div>
                    </div>
                  </div>
                )) : null
              }
            </div>
          </div>
        </div>
      </div>
      

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label>F.I.O</label>
                <input type="text" className="form-control" name='full_name' onChange={Change} value={edit?.full_name || ""}/>
              </div>
              <div className="mb-3">
                <label className="form-label">Qisqacha</label>
                <input type="text" className="form-control" name='about' onChange={Change} value={edit?.about || ""}/>
              </div>
              <div className="mb-3">
                <label className="form-label">File ID</label>
                <input type="text" className="form-control" name='file' onChange={Change} value={edit?.file || ""}/>
              </div>
              <div className="mb-3">
                <label className="form-label">Lavozim</label>
                <select className="form-select" onChange={Change} name="position" value={edit?.position || 2}>
                  {postion?.length ? postion.map((value) => (
                    <option key={value.id} value={value.id}>{value.name}</option>
                  )) : null}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={Edit}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Employee;
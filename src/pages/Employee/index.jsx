import { useContext, useEffect, useState } from 'react';
import { Context as LoginContext } from "../../LoginContext";
import request from '../../request';
// import 'suneditor/dist/css/suneditor.min.css';
import SunEditor from 'suneditor-react';

const Employee = () => {
  const [postion, setPosition] = useState()
  const [direction, setDirection] = useState()
  const [login] = useContext(LoginContext)
  const [output, setOutput] = useState()
  const [editor, setEditor] = useState()
  const [edit, setEdit] = useState()
  
  const [all, setAll] = useState([])
  const [imageEmployee, setImageEmployee] = useState(false)
  const [listFile, setListFile] = useState(0)

  useEffect(() => {
    // request.get("/employee/getAll").then(data => {
    //   if(data.status === 200) {
    //     setAll(data?.data?.data)
    //     console.log(data?.data?.data);
    //   }
    // })
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
    const formData = new FormData(evt.target)
    formData.append("editor", editor?.editor)
    formData.append("about", editor?.about)
    formData.append("type", 1);
    if(evt?.target?.list_files?.files?.length == 0) {
      formData.delete("list_files")
      formData.append("list_files", [])
    }

    request.post(`/employee`, formData)
    .then(data => {
      if(data.status === 200) {
        setAll(prevState => ([...prevState, data?.data?.data]))
        evt.target.reset()
        setEditor({about: "", editor:""})
        alert("Success")
      }
    })
    .catch((err) => {
      alert(err?.message)
      console.log(err);
    })

  }
  function Delete (deleteItem) {
    request.delete(`/employee/${deleteItem}`).then(data => {
      if(data.status === 200) {
        setAll(prevState => prevState.filter(val => val.id != deleteItem))
      }      
    })
    .catch((err) => {
      alert(err?.message)
      console.log(err);
    })
  }
  function Edit(evt) {
    evt.preventDefault(); 

    const formData = new FormData(evt.target);

    formData.append("id", edit?.id)
    formData.append("editor", edit?.editor)
    formData.append("about", edit?.about)
    formData.append("type", 1)

    if(listFile === 0) {
      formData.append("list_id", 0)
    } else {
      formData.append("list_id", 1)
    } 

    if(!imageEmployee) {
      formData.append("photo_file", 0)
    }
    request.patch(`/employee`, formData).then(data => {
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
  function DirectionSelect(id) {
    console.log(id);
    request.get(`/employee/direction/${id}`).then(data => {
      if(data?.status === 200) {
        setAll(data?.data?.data)
      }
    })
  }
  return (
    <>

      <div className="row h-100">
        <div className="col-12 h-100">
          <div className=' border border-1 border-dark bg-white rounded p-5'>
          <button 
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal" data-bs-target="#submit_modal">Qo'shish</button>
            <select className="form-select form-select mb-4" defaultValue={0} onChange={(evt) => {
              DirectionSelect(evt.target.value)
            }}>
              <option disabled value={0}>Tanlang</option>
                {direction?.length ? direction.map((dir) => (
              <option key={dir?.id} value={dir?.id} disabled={dir?.name === 'additional' ? true : false}>{dir?.name}</option>
              )) : null}
            </select>
            <div className="row">
              {
                all?.length
                ? all.map(value => (
                  <div key={value.id} className="col-4">
                    <div className="h-100 border">
                      <div><img src={value.photoLink} alt="---" width={"100%"}/></div>
                      <div className='mb-3 p-2'>
                        <div className='pt-2 fw-bold'>{value?.fullName}</div>
                        <div className='pt-2 text-info fw-bold'>{value?.position_name}</div>
                        <div className="d-flex align-items-center justify-content-between">
                          <span className='bg-info text-white px-2 rounded'>ID: {value.id}</span>
                          <button
                            type="button"
                            className="btn btn-primary py-0"
                            onClick={() => {
                              setEdit(value)
                              setImageEmployee(false)
                              setListFile(0)
                            }}
                            data-bs-toggle="modal" data-bs-target="#edit_modal">Tahrirlash</button>
                          <button type='button' className='btn btn-danger py-0' onClick={Delete.bind(null, value.id)}>O'chirish</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )) : null
              }
            </div>
          </div>
        </div>
      </div>
      {/* submit modal */}
      <div className="modal fade" id="submit_modal" tabIndex="-1" aria-labelledby="submit_modal" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form onSubmit={SubmitForm} className='border border-1 border-dark bg-white rounded p-5'>           
              <div className="mb-3">
                <label>F.I.O</label>
                <input name='fullName' type="text" className="form-control" required />
              </div>            
              <div className="mb-3">
                <label className="form-label">Qisqacha</label>
                <SunEditor
                  setContents={editor?.about}                
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
                  onChange={(evt) => setEditor(prState => ({...prState, about: evt}))}
                />
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
                setContents={editor?.editor}
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
                onChange={(evt) => setEditor(prState => ({...prState, editor: evt}))}
              />
              <button type='submit' className='btn btn-outline-dark mt-3'>Submit</button>
            </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={Edit}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      {/* edit modal */}
      <div className="modal fade" id="edit_modal" tabIndex="-1" aria-labelledby="edit_modal_label" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="edit_modal_label">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form onSubmit={Edit} className='border border-1 border-dark bg-white rounded p-5'>
              {
                imageEmployee
                 ? 
                  (
                    <div className="mb-3">
                      <label className="form-label">Image</label>
                      <input name='photo_file' type="file" className="form-control"/>
                    </div>
                  )
                  : 
                  (
                    <div className='my-3'>
                      <img src={edit?.photoLink} alt=""  width={"200px"}/> <br />
                      <button type='button' className='mt-3 btn btn-danger' onClick={()=> setImageEmployee(true)}>Yangi rasm Tanlash</button>
                    </div>
                  )
              }
              <div className="input-group mb-3">
                <input type="file" name='list_files' className="form-control" disabled={listFile !== 2}/>
                <button className="btn btn-outline-success" type="button" onClick={()=> setListFile(2)}>Yangi tanlash</button>
                <button className="btn btn-outline-danger" type="button" onClick={()=> setListFile(1)}>O'chirish</button>
              </div>           
              <div className="mb-3">
                <label>F.I.O</label>
                <input name='fullName' type="text" value={edit?.fullName || ""} onChange={(evt)=> setEdit(prState => ({...prState, fullName: evt?.target?.value}))} className="form-control" required />
              </div>            
              <div className="mb-3">
                <label className="form-label">Qisqacha</label>
                <SunEditor
                  setContents={edit?.about}
                  height='200px'
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
                  onChange={(evt) => setEdit(prState => ({...prState, about: evt}))}
                />
              </div>
              <div className='d-flex justify-content-between'>
                <div className="mb-3">
                  <label className="form-label">Type</label>
                  <input name='type' type="number" value={edit?.type || ""} className="form-control" onChange={(evt)=> setEdit(prState => ({...prState, type: evt?.target?.value}))}/>
                </div>
                <div className="mb-3">
                  <label className="form-label">Position</label>
                  <select name='position_id' className="form-select" value={edit?.position_id || ""} onChange={(evt)=> setEdit(prState => ({...prState, position_id: evt?.target?.value}))}>
                    {postion?.length ? postion.map((value) => (
                      <option key={value.id} value={value.id}>{value.name}</option>
                    )) : null}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Yo'nalish</label>
                  <select name='direction_id' className="form-select" value={edit?.direction_id || ""} onChange={(evt)=> setEdit(prState => ({...prState, direction_id: evt?.target?.value}))}>
                    {direction?.length ? direction.map((value) => (
                      <option key={value.id} value={value.id}>{value.name}</option>
                    )) : null}
                  </select>
                </div>           
              </div>            
              <SunEditor
                setContents={edit?.editor}                
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
                onChange={(evt) => setEdit(prState => ({...prState, editor: evt}))}
              />
              <button type='submit' className='btn btn-outline-dark mt-3'>Submit</button>
            </form>
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
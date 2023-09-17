import { useEffect, useRef, useState } from 'react';
import request from '../../request';
import 'suneditor/dist/css/suneditor.min.css';
import SunEditor from 'suneditor-react';

const Science = () => {
  const [postion, setPosition] = useState()
  const [direction, setDirection] = useState()  
  const [editor, setEditor] = useState()
  const [edit, setEdit] = useState()
  const submitCose = useRef()
  
  const [all, setAll] = useState()
  const [imageEmployee, setImageEmployee] = useState(false)
  const [listFile, setListFile] = useState(0)

  useEffect(() => {
    request.get("/employee/type/7").then(data => {
      if(data.status === 200) {
        setAll(data?.data?.data)
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
    const formData = new FormData(evt.target)
    formData.append("editor", editor)
    formData.append("type", 7)
    if(evt?.target?.list_files?.files?.length == 0) {
      formData.delete("list_files")
      formData.append("list_files", [])
    }

    request.post(`/employee`, formData)
    .then(data => {
      if(data.status === 200) {
        setAll(prevState => ([...prevState, data?.data?.data]))
        evt.target.reset()
        alert("Success")
        submitCose?.current?.click()
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
    formData.append("type", 7)

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
        evt.target.reset()
        setAll(prevState => prevState.map(val => val.id === data?.data?.data?.id ? data?.data?.data : val))
        alert("Success")
      }
    })
    .catch((err) => {
      alert(err?.message)
      console.log(err);
    })
  }
  
  return (
    <>
      
      <div className="h-100">
        <button type='button' className='btn w-100 btn-success' data-bs-toggle="modal" data-bs-target="#science_submit_modal" onClick={()=> setEditor("")}>Qo'shish</button>
        <div className='border border-1 border-dark bg-white rounded p-5'>         
          <div className="row">
            {
              all?.length
              ? all.map(value => (
                <div key={value.id} className="col-4">
                  <div className="border h-100">
                    <div><img src={value.photoLink} alt="---" width={"100%"}/></div>
                    <div className='p-2'>
                      <div className='pt-2 fw-bold'>{value?.fullName}</div>
                      <div className='pt-2 truncate-2 fst-italic'>{value?.about}</div>
                      <div className='pt-2 text-info fw-bold'>{value?.position_name}</div>
                      <div className="d-flex align-items-center justify-content-between pt-2">
                        <span className='bg-info text-white px-1 rounded'>ID: {value.id}</span>
                        <button
                          type="button"
                          className="btn btn-primary py-0"
                          onClick={() => {
                            setEdit(value)
                            setImageEmployee(false)
                            setListFile(0)
                          }}
                          data-bs-toggle="modal" data-bs-target="#exampleModal">Tahrirlash</button>
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
      
      {/* submit modal */}
      <div className="modal fade" id="science_submit_modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Modal title</h1>
              <button ref={submitCose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={SubmitForm} className='border border-1 border-dark bg-white rounded p-5'>           
                <div className="mb-3">
                  <label>F.I.O</label>
                  <input name='fullName' type="text" className="form-control" required />
                </div>            
                <div className="mb-3">
                  <label className="form-label">Ilmiy ish nomi</label>
                  <input name='about' type="text" className="form-control" required/>
                </div>
                <div className="mb-3">
                  <label className="form-label">Lavozim</label>
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
                  <label className="form-label">Rasm</label>
                  <input name='photo_file' type="file" className="form-control" required/>
                </div>
                <div className="mb-3">
                  <label className="form-label">Pdf yuklash</label>
                  <input name='list_files' type="file" className="form-control" multiple/>
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
          </div>
        </div>
      </div>
      {/* edit modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
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
              <div className='row'>
                <div className='col-8'>
                  <div className="mb-3">
                    <label className="form-label">F.I.O</label>
                    <input name='fullName' type="text" value={edit?.fullName || ""} onChange={(evt)=> setEdit(prState => ({...prState, fullName: evt?.target?.value}))} className="form-control" required />
                  </div>            
                </div>
                <div className="col-4">
                  <div className="mb-3">
                    <label className="form-label">Position</label>
                    <select name='position_id' className="form-select" value={edit?.position_id || ""} onChange={(evt)=> setEdit(prState => ({...prState, position_id: evt?.target?.value}))}>
                      {postion?.length ? postion.map((value) => (
                        <option key={value.id} value={value.id}>{value.name}</option>
                      )) : null}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-7">
                  <div className="mb-3">
                    <label className="form-label">Qisqacha</label>
                    <textarea name="about" className="form-control" cols="30" rows="2" value={edit?.about || ""} onChange={(evt)=> setEdit(prState => ({...prState, about: evt?.target?.value}))}></textarea>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Yo'nalish</label>
                    <select name='direction_id' className="form-select" value={edit?.direction_id || ""} onChange={(evt)=> setEdit(prState => ({...prState, direction_id: evt?.target?.value}))}>
                      {direction?.length ? direction.map((value) => (
                        <option key={value.id} value={value.id}>{value.name}</option>
                      )) : null}
                    </select>
                  </div>           
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
              <div class="btn-group" role="group" aria-label="Basic example">
                <button type='submit' className='btn btn-primary'>Tayyor</button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Yopish</button>                
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Science;
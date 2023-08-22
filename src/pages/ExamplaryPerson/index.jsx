import { useContext, useEffect, useState } from 'react';
import { Context as LoginContext } from "../../LoginContext";
import SunEditor from 'suneditor-react';
import request from '../../request';

const ExamplaryPerson = () => {
  const [login] = useContext(LoginContext)
  const [output, setOutput] = useState()
  const [postion, setPosition] = useState()
  const [edit, setEdit] = useState()

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ROOT}/aspirant/all`)
    .then(res => res.json())
    .then(data => {
      if(data.status === "success") {
        setOutput(data?.data)
      }
    })

    fetch(`${process.env.REACT_APP_API_ROOT}/position`)
    .then(res => res.json())
    .then(data => {
      if(data.status === "success") {
        setPosition(data?.data)
      }
    })
  },[])

  function SubmitForm (evt) {
    evt.preventDefault();
    const form = evt.target.elements
    const name = form[0];
    const about = form[1];
    const id = form[2];
    const select = form[3];

    fetch(`${process.env.REACT_APP_API_ROOT}/aspirant`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + login
      },
      body: JSON.stringify({full_name: name.value, about: about.value, file: {id:id.value}, position: {id: select.value}})
    })
    .then(res => res.json())
    .then(data => {
      if(data.status === "success") {
        setOutput(prevState => ([...prevState, data?.data]))
      }
    })
    .catch((err) => {
      alert(err?.message)
      console.log(err);
    })

  }
  function Delete (deleteItem) {
    console.log(deleteItem);
    fetch(`${process.env.REACT_APP_API_ROOT}/aspirant/${deleteItem}`, {
      method: "Delete",
      headers: {
        "Authorization": "Bearer " + login
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.status === "success") {
        setOutput(prevState => prevState.filter(val => val.id != deleteItem))
      }
      
    })
    .catch((err) => {
      alert(err?.message)
      console.log(err);
    })

  }
  console.log(edit);
  function Edit() {
    console.log(edit);
    request.patch("/aspirant", edit).then(data => {
      console.log(data);
      if(data.status === 200) {
        const mydata = data?.data?.data
        setOutput(prevState => prevState.map(val => val.id != mydata?.id ? val : mydata))

      }
    })
    .catch((err) => {
      alert(err?.message)
      console.log(err);
    })
    // fetch(`${process.env.REACT_APP_API_ROOT}/aspirant`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-type": "application/json",
    //     "Authorization": "Bearer " + login
    //   },
    //   body: JSON.stringify({full_name: edit.full_name, about: edit.about, id: edit.id, file: {id: edit.file}, position: {id: edit.position}})
    // })
    // .then(res => res.json())
    // .then(data => {
    //   console.log(data);
    //   if(data.status === "success") {
    //     setOutput(prevState => prevState.map(val => val.id != data?.data.id ? val : data?.data))

    //   }
    // })
    // .catch((err) => {
    //   alert(err?.message)
    //   console.log(err);
    // })
  }
  function Change(evt) {
    const name = evt.target.name
    const value = evt.target.value
    if(name === "file" || name === "position") {
      setEdit(prevState => ({...prevState, [name]: {id: value}}))
    } else {
      setEdit(prevState => ({...prevState, [name]: value}))
    }
  }
  return (
    <>
      <div className="row h-100">
        <div className="col-4">
          <form onSubmit={SubmitForm} className='border border-1 border-dark bg-white rounded p-5'>       
            <div className="mb-3">
              <label>F.I.O</label>
              <input type="text" className="form-control" required/>
            </div>
            <div className="mb-3">
              <label className="form-label">Qisqacha</label>
              <input type="text" className="form-control"/>
            </div>
            <div className="mb-3">
              <label className="form-label">File ID</label>
              <input type="text" className="form-control"/>
            </div>
            <div className="mb-3">
              <label className="form-label">Position</label>
              <select className="form-select">
                {postion?.length ? postion.map((value) => (
                  <option key={value.id} value={value.id}>{value.name}</option>
                )) : null}
              </select>
            </div>
            <SunEditor
                // setContents={editor}
                
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
                // onChange={(evt) => setEditor(evt)}
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
                    <div><img src={value.file.link} alt="---" width={"100%"}/></div>
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
        <div className="modal-dialog modal-xl">
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
                <select className="form-select" onChange={Change} name="position" value={edit?.position || ""}>
                  {postion?.length ? postion.map((value) => (
                    <option key={value.id} value={value.id}>{value.name}</option>
                  )) : null}
                </select>
              </div>
              <SunEditor
                // setContents={editor}
                
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
                // onChange={(evt) => setEditor(evt)}
              />
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

export default ExamplaryPerson;
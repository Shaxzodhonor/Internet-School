import { useEffect, useState, useContext } from 'react';
import SunEditor from 'suneditor-react';
import request from '../../request';
import { Context } from '../../LoginContext';

const Acceptance = () => {
  const [editor, setEditor] = useState();
  const [login] = useContext(Context)
  useEffect(()=>{
    request.get(`/acceptance`).then(data => {
      if(data?.status === 200 && data?.data?.data?.length) {
        setEditor(data?.data?.data[0])
      }
    })
  },[])

  function EditForm(evt) {
    evt.preventDefault();   
    
    request.patch("/acceptance", editor, {
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
            <div className='mb-3'>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="acceptanceCheck" onChange={(check)=> setEditor(prState => ({...prState, string1: check?.target.checked ? "1" : '0'}))}/>
                <label className="form-check-label" htmlFor="acceptanceCheck">Qabul bo'limini yoqish/o'chirish</label>
              </div>
            </div>
            <SunEditor
              setContents={editor?.string2 || ""}
              height='300'              
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
              onChange={(evt) => setEditor(prState => ({...prState, string2: evt}))}
            />            
            <button type='submit' className='btn btn-outline-dark mt-3'>Submit</button>
          </form>
        </div>      
      </div>
    </>
  );
};

export default Acceptance;
// import 'suneditor/dist/css/suneditor.min.css';
import SunEditor from 'suneditor-react';
import React, { useEffect, useState, } from 'react';
import request from '../../request';
import dayjs from 'dayjs';

const News = () => {
  const [editor, setEditor] = useState()
  const [edit, setEdit] = useState()
  const [all, setAll] = useState([])

  const [editNewsImage, setEditNewsImage] = useState()

  useEffect(() => {
    request.get("/news").then(data => {
      if (data.status === 200) {
        console.log(data?.data?.data?.content);
        setAll(data?.data?.data?.content)
      }
    })
  },[])
  function SubmitForm (evt) {
    evt.preventDefault();

    const Form = evt.target;
    const formData = new FormData(Form);
    formData.append("about", editor || "")

    formData.delete("date")
    formData.append("date", dayjs(Form?.elements[1]?.value).format("DD/MM/YYYY"))

    request.post("/news", formData).then(data => {      
      if(data.status === 200) {
        alert("Success")
        setAll((prevState) => ([data?.data?.data, ...prevState]))
        Form?.reset()
        setEditor("")
      }
    })
    .catch((err) => {
      alert(err?.message)
      console.log(err);
    })
  }
  function NewsEdit(evt) {
    evt.preventDefault();
    
    const MyForm = evt?.target
    const formData = new FormData(MyForm)

    if (!editNewsImage && !MyForm?.elements["editNewsImageID"]?.files[0]) {
      formData.delete("file")
      formData.append("file", 1)
    } else if(!editNewsImage && MyForm?.elements["editNewsImageID"]?.files[0]) {
      formData.delete("file")
      formData.append("file", MyForm?.elements["editNewsImageID"]?.files[0])
    }

    formData.delete("date")
    formData.append("date", dayjs(MyForm?.elements["date"]?.value).format("DD/MM/YYYY"))
    formData.append("about", edit?.about)
    formData.append("id", edit?.id)
    

    request.patch("/news", formData).then(data => {      
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
  function TestContent() {
    const output = document.getElementById('output-content')
    output.innerHTML = ""
    output.insertAdjacentHTML('afterbegin', editor)
    document.getElementById("output_test").click()
  }
  function Delete(id) {
    request.delete(`/news/${id}`).then(data => {
      if (data?.status === 200) {
        setAll(prevState => prevState.filter(val => val.id != id))
      }
    })
  }

  console.log(edit);
return (
    <>
     <div>
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">          
            <button className="nav-link active" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#news-tab-1" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Yangiliklar</button>
            <button className="nav-link" id="output_test" data-bs-toggle="tab" data-bs-target="#news-tab-2" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Natijani ko'rish</button>
            <button className="nav-link" id="nav-disabled-tab" data-bs-toggle="tab" data-bs-target="#news-tab-3" type="button" role="tab" aria-controls="nav-disabled" aria-selected="false" >Barchasi</button>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active" id="news-tab-1" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">
            <form onSubmit={SubmitForm} className='border border-1 border-dark bg-white rounded p-5'>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="newsSubmitImageID" className="form-label">Yangi xabar rasmi</label>
                    <input name='file' className="form-control" type="file" id="newsSubmitImageID"/>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="news_date" className="form-label">Sana</label>
                    <input type="date" name='date' className="form-control" id="news_date" required/>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="news_title" className="form-label">Yangi xabar nomi</label>
                <input name='title' type="text" className="form-control" id="news_title" required/>
              </div>
              <div className="mb-3">
                <label htmlFor="news_who_from" className="form-label">Yangi xabar kimlarga taaluqli</label>
                <input name='who_from' type="text" className="form-control" id="news_who_from" placeholder="masalan: ustozlar / o'quvchilar / boshqalar"/>
              </div>
              <div className="mb-3">
                <label htmlFor="news_shortly_submit" className="form-label">Qisqacha</label>
                <textarea name="shortly" className="form-control" id="news_shortly_submit" cols="30" rows="5"></textarea>
              </div>
              <SunEditor
                setContents={editor}                
                setOptions={{
                  font: ['Monserrat', 'Arial', 'Verdana', 'Roboto', 'Georgia', 'sans-serif'],
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
              <button type='button' className='btn btn-warning text-light mt-4' onClick={TestContent}>Test</button>
              <button type='submit' className='btn btn-outline-dark mt-4 ms-5'>Tayyor</button>
            </form>
          </div>
          <div className="tab-pane fade" id="news-tab-2" role="tabpanel" aria-labelledby="output_test" tabIndex="0">
              <div id='output-content' className="sun-editor-editable py-5 border-success border"></div>
          </div>
          <div className="tab-pane fade" id="news-tab-3" role="tabpanel" aria-labelledby="nav-disabled-tab" tabIndex="0">
            <div className="bg-white rounded border p-4">
                {all?.length ? all.map((news,id) => (
                  <div key={id} className="border my-3 p-3 rounded">
                    <img src={news?.file} alt={news?.title} height={"200px"}/>
                    <div>{news?.title}</div>
                    <button type='button' className='btn btn-danger' onClick={Delete.bind(null,news?.id)}>O'chirish</button>
                    <button type='button' className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#newsModal" onClick={()=> {
                      setEdit(news)
                      setEditNewsImage(news?.file ? true : false)
                    }}>Tahrirlash</button>
                  </div>
                )) : null}
              <div className="modal" tabIndex="-1" id="newsModal">
                <div className="modal-dialog modal-xl">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Tahrir</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={NewsEdit} className='border border-1 border-dark bg-white rounded p-5'>
                        <div className="row">
                          <div className="col">
                            {
                              editNewsImage
                                ?
                                  (
                                    <div>
                                      <img src={edit?.file} alt="" width={"100%"}/>
                                      <button type='button' className='btn btn-danger p-1 my-2' onClick={()=> setEditNewsImage(false)}>O'chirish</button>
                                    </div>
                                  )
                                :
                                    (
                                      <div className="mb-3">
                                        <label htmlFor="editNewsImageID" className="form-label">Yangi xabar rasm ID</label>
                                        <input name='file' type='file' className="form-control" id="editNewsImageID"/>
                                      </div>
                                    )
                            }
                          </div>
                          <div className="col">
                            <div className="mb-3">
                              <label className="form-label">Sana</label>
                              <input name='date' type="date" className="form-control" onChange={(date)=> setEdit(prst => ({...prst, date: date.target.value}))} value={edit?.date?.slice(0,10) || ""}/>
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Yangi xabar kimlarga taaluqli</label>
                              <input name='who_from' type="text" className="form-control" placeholder="masalan: ustozlar / o'quvchilar / boshqalar" onChange={(evt)=> setEdit(prst => ({...prst, who_from: evt.target.value}))} value={edit?.who_from || ""}/>
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Yangi xabar nomi</label>
                          <input name='title' type="text" className="form-control" onChange={(evt)=> setEdit(prst => ({...prst, title: evt.target.value}))} value={edit?.title || ""}/>
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Qisqacha</label>
                          <textarea className='form-control' name="shortly" cols="30" rows="4" onChange={(evt)=> setEdit(prst => ({...prst, shortly: evt.target.value}))} value={edit?.shortly || ""}></textarea>
                        </div>
                        <SunEditor
                          setContents={edit?.about}                         
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
                        <button type='submit' className='btn btn-outline-dark mt-4'>Tayyor</button>
                      </form>
                    </div>
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

export default News;
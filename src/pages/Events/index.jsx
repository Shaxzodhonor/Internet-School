// import 'suneditor/dist/css/suneditor.min.css';
import SunEditor from 'suneditor-react';
import React, { useEffect, useState, } from 'react';
import request from '../../request';
import dayjs from 'dayjs';

const Event = () => {
  const [edit, setEdit] = useState()
  const [all, setAll] = useState([])

  const [editEventImage, setEditEventImage] = useState()

  useEffect(() => {
    request.get("/event?page=0&size=50&direction=desc").then(data => {
      if (data.status === 200) {
        setAll(data?.data?.data?.content)
      }
    })
  },[]);
  
  function SubmitForm (evt) {
    evt.preventDefault();
    const Form = evt.target;
    const formData = new FormData(Form);
    formData.delete("date")
    formData.append("date", dayjs(Form?.elements[4]?.value).format("DD-MM-YYYY"))

    request.post("/event", formData).then(data => {      
      if(data.status === 200) {
        alert("Success")
        setAll((prevState) => ([data?.data?.data, ...prevState]))
        Form?.reset()
      }
    })
    .catch((err) => {
      alert(err?.message)
      console.log(err);
    })
  }
  function EventEdit(evt) {
    evt.preventDefault();
    
    const MyForm = evt?.target
    const formData = new FormData(MyForm)

    if (!editEventImage && !MyForm?.elements["editEventImageID"]?.files[0]) {
      formData.delete("file")
      formData.append("file", 1)
    } else if(!editEventImage && MyForm?.elements["editEventImageID"]?.files[0]) {
      formData.delete("file")
      formData.append("file", MyForm?.elements["editEventImageID"]?.files[0])
    }

    formData.delete("date")
    formData.append("date", dayjs(MyForm?.elements["date"]?.value).format("DD-MM-YYYY"))
    formData.append("id", edit?.id)
    
    formData.append("end_time", "horizontal")
    request.patch("/event", formData).then(data => {      
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

  function Delete(id) {
    request.delete(`/event/${id}`).then(data => {
      if (data?.status === 200) {
        setAll(prevState => prevState.filter(val => val.id != id))
      }
    })
  }

return (
    <>
     <div>
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">          
            <button className="nav-link active" id="nav-disabled-tab" data-bs-toggle="tab" data-bs-target="#event-tab-3" type="button" role="tab" aria-controls="nav-disabled" aria-selected="false" >Barchasi</button>
            <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#event-tab-1" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Qo'shish</button>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade" id="event-tab-1" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">
            <form onSubmit={SubmitForm} className='border border-1 border-dark bg-white rounded p-5'>
              <div className="row">
                <div className="col-6">
                  <div className="mb-3">
                    <label htmlFor="event_title" className="form-label">Nomlang</label>
                    <input name='title' type="text" className="form-control" id="event_title" required/>
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label htmlFor="event_location" className="form-label">Manzil</label>
                    <input name='location' type="text" className="form-control" id="event_location" placeholder="Manzil"/>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label htmlFor="event_about" className="form-label">Qisqacha</label>
                    <textarea name="about" className="form-control" id="event_about" cols="30" rows="2"></textarea>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="eventSubmitImageID" className="form-label">Yangi xabar rasmi</label>
                    <input name='photo' className="form-control" type="file" id="eventSubmitImageID"/>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="event_date" className="form-label">Sana</label>
                    <input type="date" name='date' className="form-control" id="event_date" required/>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="event_start_time" className="form-label">Start (ixtiyoriy)</label>
                    <input type="time" name='start_time' className="form-control" id="event_start_time"/>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Tugash soati</label>
                    <input name='end_time' type="time" className="form-control"/>
                  </div>
                </div>
              </div>              
              <button type='submit' className='btn btn-success w-100'>Tayyor</button>
            </form>
          </div>
          <div className="tab-pane fade show active" id="event-tab-3" role="tabpanel" aria-labelledby="nav-disabled-tab" tabIndex="0">
            <div className="bg-white rounded border p-4">
              <div className="row">
                {all?.length ? all.map((event,id) => (
                  <div key={id} className="d-flex flex-column col-3">
                    <img src={event?.photo_link} alt={event?.title} height={"200px"} style={{objectFit: "contain"}}/>
                    <div className="btn-group mt-3" role="group" aria-label="Basic mixed styles example">
                      <button type="button" className="btn btn-danger" onClick={Delete.bind(null,event?.id)}>O'chirish</button>
                      <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#eventModal" onClick={()=> {
                      setEdit(event)
                      setEditEventImage(event?.photo_link ? true : false)
                    }}>Tahrirlash</button>
                    </div>
                  </div>
                )) : null}
              </div>
              <div className="modal" tabIndex="-1" id="eventModal">
                <div className="modal-dialog modal-xl">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Tahrir</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body bg-light">
                      <form onSubmit={EventEdit}>
                        <div className="row">
                          <div className="col-4">
                            {
                              editEventImage
                                ?
                                  (
                                    <div>
                                      <div style={{height:"340px"}}>
                                        <img src={edit?.photo_link} alt={edit?.title || "image"} className='h-100 w-100' style={{objectFit:"contain"}}/>
                                      </div>
                                      <button type='button' className='btn btn-danger p-1 my-2 w-100' onClick={()=> setEditEventImage(false)}>O'chirish</button>
                                    </div>
                                  )
                                :
                                  (
                                    <div className="mb-3">
                                      <label htmlFor="editEventImageID" className="form-label">Rasm tanlang</label>
                                      <input name='photo' type='file' className="form-control" id="editEventImageID"/>
                                    </div>
                                  )
                            }
                          </div>
                          <div className="col-8">
                            <div className="mb-3">
                              <label className="form-label">Nomlang</label>
                              <textarea className='form-control' name="title" cols="30" rows="2" onChange={(evt)=> setEdit(prst => ({...prst, title: evt.target.value}))} value={edit?.title || ""}></textarea>
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Qisqacha</label>
                              <textarea className='form-control' name="about" cols="30" rows="4" onChange={(evt)=> setEdit(prst => ({...prst, about: evt.target.value}))} value={edit?.about || ""}></textarea>
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Manzil</label>
                              <input className='form-control' name="location" onChange={(evt)=> setEdit(prst => ({...prst, location: evt.target.value}))} value={edit?.location || ""}></input>
                            </div>
                            <div className="row">
                              <div className="col-4">
                                <div className="mb-3">
                                  <label className="form-label">Sana</label>
                                  <input name='date' type="date" className="form-control" onChange={(date)=> setEdit(prst => ({...prst, date: date.target.value}))} value={edit?.date?.slice(0,10) || ""}/>
                                </div>
                              </div>
                              <div className='col-4'>
                                <div className="mb-3">
                                  <label className="form-label">Boshlanish soati</label>
                                  <input name='start_time' type="time" className="form-control" onChange={(time)=> setEdit(prst => ({...prst, start_time: time.target.value}))} value={edit?.start_time || ""}/>
                                </div>
                              </div>
                              <div className="col-4">
                                <div className="mb-3">
                                  <label className="form-label">Tugash soati</label>
                                  <input name='end_time' type="time" className="form-control" onChange={(time)=> setEdit(prst => ({...prst, end_time: time.target.value}))} value={edit?.end_time || ""}/>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button type='submit' className='btn btn-success mt-4 w-100'>Tayyor</button>
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

export default Event;
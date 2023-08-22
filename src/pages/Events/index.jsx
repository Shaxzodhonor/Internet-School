import React, { useEffect, useState, useContext } from 'react';
import { Context as LoginContext } from "../../LoginContext";
import request from '../../request';

const Events = () => {
  const [login] = useContext(LoginContext)
  const [edit, setEdit] = useState()
  const [all, setAll] = useState([])

  useEffect(() => {
    request.get("/event").then(data => {
      if (data.status === 200) {
        setAll(data?.data.data)
      }
    })
  },[])

  function SubmitForm (evt) {
    evt.preventDefault();
    const form = evt.target.elements;
    const obj = [...Array(7)].reduce((acc, _, id) => {    
      return form[id]?.name === "file" ? {...acc, file: {id: form[id]?.value}} : {...acc, [form[id]?.name]: form[id]?.value}
    },{})

    request.post(`/event`, obj)
    .then(data => {
      if(data.status === 200) {
        setAll((prevState) => ([data?.data?.data, ...prevState]))
        alert("Success")
      }
    })
    .catch((err) => {
      alert(err?.message)
      console.log(err);
    })
  }
  function EditEvent(evt) {
    evt.preventDefault();
    
    request.patch(`/event`, edit)
    .then(data => {
      if(data.status === 200) {
        const mydata = data?.data?.data
        setAll((prevState) => prevState.map(event => event?.id === mydata?.id ? mydata : event))
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
        alert("Success")
        setAll(prevState => prevState.filter(val => val.id != id))
      }
    })
  }
  function InputChange(evt) {
    const name = evt.target.name
    const value = evt.target.value
    setEdit(prevState => ({...prevState, [name]: value}))
  }
return (
    <>
     <div>
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">          
            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#event-tab-1" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Voqea qo'shish</button>
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#event-tab-3" type="button" role="tab" aria-controls="nav-disabled" aria-selected="false" >Barchasi</button>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active" id="event-tab-1" role="tabpanel" tabIndex="0">
            <form onSubmit={SubmitForm} className='border border-1 border-dark bg-white rounded p-5'>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="eventSubmitImageID" className="form-label">Voqea rasmi</label>
                    <input className="form-control" name='file' type="number" id="eventSubmitImageID"/>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="eventdate" className="form-label">Voqea kuni</label>
                    <input name='date' type="date" className="form-control" id="eventdate" />
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="eventstarttime" className="form-label">Boshlanish vaqti</label>
                    <input name='start_time' type="time" className="form-control" id="eventstarttime" />
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="evententtime" className="form-label">Tugash vaqti</label>
                    <input name='end_time' type="time" className="form-control" id="evententtime"/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                  <label htmlFor="event_title" className="form-label">Voqea nomi</label>
                  <input name='title' type="text" className="form-control" id="event_title" required/>
                </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="event_location" className="form-label">Manzil</label>
                    <input name='location' type="text" className="form-control" id="event_location" placeholder="Manzil"/>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="event_text" className="form-label">Matn</label>
                <textarea name='body' className='form-control' id="event_text" cols="30" rows="5"></textarea>
              </div>
              
              
              {/* <button type='button' className='btn btn-warning text-light mt-4' onClick={TestContent}>Test</button> */}
              <button type='submit' className='btn btn-outline-dark mt-4 ms-5'>Tayyor</button>
            </form>
          </div>
          <div className="tab-pane fade" id="event-tab-3" role="tabpanel" tabIndex="0">
            <div className="bg-white rounded border p-4">
                {all?.length ? all.map((event,id) => (
                  <div key={id} className="border my-3 p-3 rounded">
                    <div><img src={event?.file?.link} alt={event?.title} height={"200px"}/></div>
                    <div>{event?.title}</div>
                    <button type='button' className='btn btn-danger' onClick={Delete.bind(null,event?.id)}>O'chirish</button>
                    <button type='button' className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#eventModal" onClick={()=> setEdit(event)}>Tahrirlash</button>
                  </div>
                )) : null}
              <div className="modal" tabIndex="-1" id="eventModal">
                <div className="modal-dialog modal-xl">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Tahrir</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <form onSubmit={EditEvent} className='border border-1 border-dark bg-white rounded p-5'>
                      <div className="row">
                        <div className="col">
                          <div className="mb-3">
                            <label htmlFor="eventSubmitImageID" className="form-label">Voqea rasmi</label>
                            <input className="form-control" name='file' type="number" id="eventSubmitImageID" onChange={InputChange} value={edit?.file?.id || ""}/>
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label htmlFor="eventdate" className="form-label">Voqea kuni</label>
                            <input name='date' type="date" className="form-control" id="eventdate" onChange={InputChange} value={edit?.date?.slice(0,10) || " "}/>
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label htmlFor="eventstarttime" className="form-label">Boshlanish vaqti</label>
                            <input name='start_time' type="time" className="form-control" id="eventstarttime" onChange={InputChange} value={edit?.start_time || ""}/>
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label htmlFor="evententtime" className="form-label">Tugash vaqti</label>
                            <input name='end_time' type="time" className="form-control" id="evententtime" onChange={InputChange} value={edit?.end_time || ""}/>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="mb-3">
                          <label htmlFor="event_title" className="form-label">Voqea nomi</label>
                          <input name='title' type="text" className="form-control" id="event_title" onChange={InputChange} value={edit?.title || ""} required/>
                        </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <label htmlFor="event_location" className="form-label">Manzil</label>
                            <input name='location' type="text" className="form-control" id="event_location" placeholder="Manzil" onChange={InputChange} value={edit?.location || ""}/>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="event_text" className="form-label">Matn</label>
                        <textarea name='body' className='form-control' id="event_text" cols="30" rows="5" onChange={InputChange} value={edit?.body || ""}></textarea>
                      </div>
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

export default Events;
import { useContext, useEffect, useState } from 'react';
import { Context as LoginContext } from "../../LoginContext";
import request from '../../request';

const Subjects = () => {
  const [directions, setDirection] = useState()
  const [output, setOutput] = useState()

  useEffect(() => {    
    request.get("/department/getAllDepartmentDirection").then(data => {
      if(data.status === 200) {
        setDirection(data?.data?.data)
      }
    })
  },[])
  useEffect(()=>{
    if(directions?.length) {
      request.get(`/subject/direction/${directions[0]?.direction_id}`).then(data => {
        if(data.status === 200) {
          setOutput(data?.data?.data)
        }
      })
    }
  },[directions])

  function SubmitForm (evt) {
    evt.preventDefault();
    const dirId = evt.target.elements[0]?.value;
    const Name = evt.target.elements[1]?.value;

    request.post(`/subject`,{name: Name, direction: {id: dirId}}).then(data => {
      if(data.status === 200) {
        setOutput(prevState => ([...prevState, data?.data?.data]))
        evt.target.elements[1].value = ""
      }
    })
    .catch((err) => {
      alert(err?.message)
      console.log(err);
    })
  }
  function Delete (deleteItem) {
    request.delete(`/subject/${deleteItem}`).then(data => {
      if(data.status === 200) {
        setOutput(prevState => prevState.filter(val => val.id != deleteItem))
      }      
    })
    .catch((err) => {
      alert(err?.message)
      console.log(err);
    })
  }
  function SelectedSubjects(id) {
    request.get(`/subject/direction/${id}`).then(data => {
      if(data.status === 200) {
        setOutput(data?.data?.data)
      }
    })
  }
  return (
    <>
      <div className="row h-100">
        <div className="col-5">
          <form onSubmit={SubmitForm} className='border border-1 border-dark bg-white rounded p-5'>       
            <div className='mb-3'>
              <label className="form-label">Yo'nalishni tanlang</label>
              <select className="form-select form-select" name='direction' defaultValue={"Open this select menu"}>
                <option disabled>Bo'limni tanlang</option>
                {directions?.length ? directions.map((dir, id) => (
                  <option key={id} value={dir?.direction_id}>{dir?.direction_name}</option>
                )) : null}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="direction_name" className="form-label">Nomini kiriting</label>
              <input name='name' type="text" className="form-control" id="direction_name"/>
            </div>
            <button type='submit' className='btn btn-outline-dark mt-3'>Submit</button>
          </form>
        </div>
        <div className="col-7 h-100">
          <div className='mb-3'>
            <label className="form-label">Yo'nalishni tanlang</label>
            <select className="form-select form-select"  defaultValue={"Open this select menu"} onChange={(evt) => SelectedSubjects(evt?.target?.value)}>
              <option disabled>Bo'limni tanlang</option>
              {directions?.length ? directions.map((dir, id) => (
                <option key={id} value={dir?.direction_id}>{dir?.direction_name}</option>
              )) : null}
            </select>
          </div>
          <div className='h-100 border border-1 border-dark bg-white rounded p-5'>
            {
              output?.length 
              ? output.map(value => (
                <div key={value.id} className="border my-3 p-2 d-flex align-items-center">
                  <span className='me-3 bg-info text-white px-2'>ID: {value.id}</span> {value.name} <button type='button' className='ms-auto btn btn-danger' onClick={Delete.bind(null, value.id)}>O'chirish</button>
                </div>
              )) : null
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Subjects;
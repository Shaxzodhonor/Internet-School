import { useContext, useEffect, useState } from 'react';
import { Context as LoginContext } from "../../LoginContext";
import request from '../../request';

const Position = () => {
  const [login] = useContext(LoginContext)
  const [output, setOutput] = useState()

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ROOT}/position/getAll`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.status === "success") {
        setOutput(data?.data)
      }
    })
  },[])

  function SubmitForm (evt) {
    evt.preventDefault();
    const input = evt.target.elements[0];
    request.post("/position",{name: input.value})
    .then(data => {
      if(data.status === 200) {
        setOutput(prevState => ([...prevState, data?.data?.data]))
        evt?.target.reset()
      }
    })
    .catch((err) => {
      alert(err?.message)
      console.log(err);
    })
  }
  function Delete (deleteItem) {
    request.delete(`/position/${deleteItem}`).then(data => {
      if(data.status === 200) {
        setOutput(prevState => prevState.filter(val => val.id != deleteItem))
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
        <div className="col-5">
          <form onSubmit={SubmitForm} className='border border-1 border-dark bg-white rounded p-5'>       
            <div className="form-floating mb-3">
              <input type="text" className="form-control" required/>
              <label>Lavozimi</label>
            </div>
            <button type='submit' className='btn btn-outline-dark mt-3'>Submit</button>
          </form>
        </div>
        <div className="col-7 h-100">
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

export default Position;
import { useEffect, useState } from "react";
import request from "../../request";

const Statistics = () => {
  const [all, setAll] = useState()

  useEffect(() => {
    request.get("/government").then(data => {
      if (data.status === 200) {
        console.log(data?.data?.data);
        setAll(data?.data.data)
      }
    })
  },[])

  function SubmitForm (evt) {
    evt.preventDefault();
    // const form = evt.target.elements;
    // const obj = [...Array(4)].reduce((acc, _, id) => {    
    //   return form[id]?.name === "file" ? {...acc, file: {id: form[id]?.value}} : {...acc, [form[id]?.name]: form[id]?.value}
    // },{})
    request.post("/government", {name: "Salom", file: {id: 19}, link: "salom.uz"}).then(data => {      
      if(data.status === 200) {
        console.log(data?.data);
        setAll((prevState) => ([data?.data?.data, ...prevState]))
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
      <div className="row">
        <div className="col-7">
          <form onSubmit={SubmitForm} className='border border-1 border-dark bg-white rounded p-5'>
            <div className="form-floating mb-3">
              <input type="text" className="form-control"/>
              <label>Statistasadaika qiymati</label>
            </div>
            <div className="form-floating">
              <input type="text" name='title' className="form-control"/>
              <label>Statistika matni</label>
            </div>
            <button type='submit' className='btn btn-outline-dark mt-3'>Submit</button>
          </form>
        </div>
        <div className="col-5">
          <div className='h-100 border border-1 border-dark bg-white rounded p-5'></div>
        </div>
      </div>
    </>
  );
};

export default Statistics;
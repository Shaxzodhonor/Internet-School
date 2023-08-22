const System = () => {
  return (
    <>
      <div className="row h-100">
        <div className="col-5">
          <form action="" className='border border-1 border-dark bg-white rounded p-5'>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">Hamkor logosini tanlang</label>
                  <input className="form-control" type="file" id="formFile" required/>
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">Hamkor logosini tanlang</label>
                  <input className="form-control" type="file" id="formFile" required/>
                </div>
              </div>
            </div>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" required/>
              <label>Hamkor nomi</label>
            </div>
            <button type='submit' className='btn btn-outline-dark mt-3'>Submit</button>
          </form>
        </div>
        <div className="col-7 h-100">
          <div className='h-100 border border-1 border-dark bg-white rounded p-5'></div>
        </div>
      </div>
    </>
  );
};

export default System;
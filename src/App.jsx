import axios from "axios"
import { useEffect, useState } from "react"


function App() {
  const [data, setData] = useState([])
  const [id, setID] = useState("658dfe1c1cc179965d8d1339")
  const [btn, setBtn] = useState("Add Produce")

  const [produces, setProduces] = useState({
    name: "",
    price: "",
    desc: ""
  })

  function getProduceData(e) {
    let mydata = { ...produces };
    mydata[e.target.name] = e.target.value;
    setProduces(mydata)

  }

  //get AllData
  async function getALlProduces() {
    try {
      const { data } = await axios.get("http://localhost:3000/products")

      setData(data.data)
    } catch (err) {
      console.log(err)
    }

  }
  //  Send Data
  async function sendProduces() {
    try {
      const { data } = await axios.post("http://localhost:3000/products", produces)

    } catch (err) {
      console.log(err)
    }

  }

  //clear values
  function clearForm() {
    setProduces({
      name: "",
      price: "",
      desc: ""
    })

  }

  //delete produce
  async function deleteProduces(_id) {

    try {
      const { data } = await axios.delete(`http://localhost:3000/products/${_id}`)
    } catch (err) {
      console.log(err)
    }
  }
  //delete produce
  async function updateProduces(_id, update) {

    try {
      const { data } = await axios.put(`http://localhost:3000/products`, { ...update, _id })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getALlProduces()
  }, [])

  useEffect(() => {
    deleteProduces(id)
    updateProduces(id, produces)
    getALlProduces()

  }, [id, produces])

  function sendData(e) {
    e.preventDefault();
    sendProduces();
    clearForm();
    setBtn("Add Produce")
    getALlProduces()
  }

  return (
    <div className='parent'>
      <div className='text-crud'>CRUD Operations With Node.js API</div>
      <div className='produce-main w-75 m-auto'>
        <form onSubmit={sendData}>

          <div className="form-group">
            <label htmlFor="productName">Name</label>
            <input type="text" className="form-control" name="name" onChange={getProduceData} value={produces.name} required />
          </div>

          <div className="form-group">
            <label htmlFor="productName">Price</label>
            <input type="number" className="form-control" name="price" onChange={getProduceData} value={produces.price} required />
          </div>

          <div className="form-group">
            <label htmlFor="productDesc">Description</label>
            <textarea id="productDesc" className="form-control" name="desc" onChange={getProduceData} value={produces.desc} required rows="5" cols="50" >
            </textarea>
          </div>

          <button className="btn btn-outline-info my-3 text-capitalize"> {btn}</button>
        </form>
      </div>

      <div className='w-75 m-auto main-table'>
        <table className="table my-3 text-center">
          <thead >
            <tr>
              <th className="text-capitalize pb-2">ID</th>
              <th className="text-capitalize pb-2">Name</th>
              <th className="text-capitalize pb-2">Price</th>
              <th className=" text-capitalize pb-2">Description</th>
              {/* <th className="desc-mobile text-capitalize pb-2">Desc</th> */}
              <th className="text-capitalize pb-2">Action</th>
              {/* <th className="text-capitalize pb-2">Delete</th> */}
            </tr>
          </thead>
          <tbody id="tbody">
            {
              data.map(({ _id, name, price, discription }, i) =>
                <tr key={i}>
                  <td className="text-capitalize">{i}</td>
                  <td className="text-capitalize">{name}</td>
                  <td className="text-capitalize">{price}</td>
                  <td className="text-capitalize">{discription}</td>
                  <td className="mobile2" >
                    <button className=" btn btn-warning text-capitalize mx-2 btn-lsrg" onClick={() => {
                      setID(_id);
                      setProduces({
                        name: name,
                        price: price,
                        desc: discription
                      })
                      setBtn("Update")
                      getALlProduces()
                    }} >update</button>

                    <i className="fa-regular fa-pen-to-square mobile d-none" onClick={() => {
                      setID(_id);
                      setProduces({
                        name: name,
                        price: price,
                        desc: discription
                      })
                      setBtn("Update")
                      getALlProduces()
                    }}></i>

                    <button className=" btn btn-danger text-capitalize btn-lsrg" onClick={() => { setID(_id) }}>delete</button>

                    <i className=" fa-solid fa-trash mobile d-none" onClick={() => { setID(_id) }}></i></td>

                </tr>)
            }






          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
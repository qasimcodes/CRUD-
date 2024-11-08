import React, { useEffect , useState} from 'react';
import './App.css';
import { EmployeeData } from './employeedata';



function App() {

  // setting data

  const [data , setData] = useState ([]);

  //setting state

  const [firstName , setFirstName] = useState('')
  const [lastName , setLastName] = useState('')
  const [age , setAge] = useState(0)
  const [id, setId] = useState(0)
  const [isUpdate, setIsUpdate] = useState(false) 



  //use effect for data
    useEffect (() => {
      setData(EmployeeData);

    },[]);

    // event handelers for edit and delete purpose
     const handleEdit = (id) => {
        const dt = data.filter(item => item.id === id)
        if (dt !== undefined){
          setIsUpdate(true);
          setId(id);
          setFirstName(dt[0].firstName = dt.firstName);
          setLastName(dt[0].lastName = dt.lastName);
          setAge(dt[0].firstName = dt.age);
        }
      }
      const handleDelete = (id) => {

         if(id > 0 ) {
          if(window.confirm("Are you sure you want to delete employee data?")){
          const dt = data.filter( item => item.id !== id ); //filter out data and returns  data 
          setData(dt); // update data
         }
      }
      }

      //handle save and update

      const handleSave = (e) => {

        //validation
        let error = ''
        if (firstName === "")
          error += 'First name is required,';

      
        if (lastName === "")
          error += 'Last name is required,';

       
        if (age <= 0)
          error += 'Age name is required.';

        if(error!== ''){
        
       e.preventDefault(); //restricts other events 

       const dt = [...data];
       const newObject = {
        id :EmployeeData.length + 1,
        firstName : firstName,
        lastName : lastName,
        age : age
       }

       dt.push(newObject); //to push data into object
       setData(dt); //update data
      }
      else {
        alert(error)
      }
      }

      const handleUpdate = () => {
      
       const index = data.map((item) => {
        return item.id 
       }).indexOf(id);
       
       const dt = [...data];  // left hand array properties right hand side is states 
       dt[index].firstName = firstName;
       dt[index].lastName = lastName;
       dt[index].age = age;

       setData(dt);
       handleClear();
       

      }

      const handleClear= () => {
        setId(0);
        setFirstName('');
        setLastName('');
        setAge('');
        setIsUpdate(false);
        
      }

  return (

  <div className="App">

<div style={{display:'flex', justifyContent:'center', marginTop:"10px", marginBottom:"10px"}}>
  <div>
    <label>
      First Name:
      <input 
         type='text' placeholder='Enter your first name' onChange={(e) => setFirstName(e.target.value) } value={firstName} />
    </label>
    
  </div>

  <div>
    <label>
      Last Name:
      <input 
         type='text' placeholder='Enter your last name' onChange={(e) => setLastName(e.target.value) } value={lastName} />
    </label>
    
  </div>

  <div>
    <label>
      Age:
      <input 
         type='text' placeholder='Enter your age' onChange={(e) => setAge(e.target.value) } value={age} />
    </label>
    
  </div>
  <div>
    {
      !isUpdate ?
      <button classname="btn btn-primary" onClick={(e) => handleSave(e)}>Save</button>
      :

      <button classname="btn btn-primary" onClick={() => handleUpdate()}>Update</button>
    }

  

  <button classname="btn btn-primary" onClick={() => handleClear()}>Clear</button>&nbsp;


  </div>
</div>


<table className="table table-hover">
  <thead>
    <tr>
      <td>
        Sr.No:
      </td>
      <td>Id</td>
      <td>First Name</td>
      <td>Last Name</td>
      <td>age</td>
      <td>actions</td>

    </tr>
  </thead>
  <tbody>
    {
      data.map((item, index) => 
        <tr key =  {index}>
          <td>{index +1}</td>
          <td>{item.id}</td>
          <td>{item.firstName}</td>
          <td>{item.lastName}</td>
          <td>{item.age}</td>
          <td>
            <button classname="btn btn-primary" onClick={() => handleEdit(item.id)}>Edit</button>&nbsp;
            <button classname="btn btn-danger" onClick={()=> handleDelete(item.id)}>Delete</button>
            
          </td>
        </tr>
      )
    }
  </tbody>
</table>



  </div>




  );
}

export default App;

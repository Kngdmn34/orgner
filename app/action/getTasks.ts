import axios from 'axios';




export const  revalidate= 60;

const getTasks = async  () => {

    try { 
      const response =   await axios.get('/api/tasks');
      console.log(response.data.tasks)
        
      return response.data.tasks

    }
    catch(error) { 
console.log(error, 'fetching tasks error')
throw error;
    }
  
}

export default getTasks
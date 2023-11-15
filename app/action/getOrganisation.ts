import axios from 'axios';


interface OrganisationStatus {
  value: string;
  employees: string;
  phase: string;
  age: string

  // Add any other properties if needed
}

const getOrganisationStatus = async (): Promise<string> => {
  try {
    const res = await axios.get('/api/organisation');
    if (res.data && res.data.organisation.value) {
      const status: OrganisationStatus = res.data.organisation;

      
      let result = '';

      // Case one
      if (
        (status.value === 'freelancer' || status.value === 'ecomms') &&
        status.employees > '10' && status.phase === 'launch' || status.phase === 'growth'  && status.age > '2'  
      ) {
        result = 'Not Good';
      } else if (
        (status.value === 'freelancer' || status.value === 'ecomms') &&
        status.employees < '10' && status.phase === 'launch' && status.age < '2'
      ) {
        result = 'Good';
      }

      // Case two
      if (status.value === 'startup' && status.employees < '50' && status.age < '4' && status.phase === 'launch' || status.phase === 'growth') {
        result = 'Good';
      } else {
        result = 'Not Good';
      }

      //case three 
      if (status.value === 'bigfirm' && status.employees < '500' && status.phase === 'maturity' || status.phase === 'growth') { 
        result = 'Good'
      } else { 
        result = 'Not Good '
      }

      return result;
    }

    
    throw new Error('Invalid data received from the API');
  } catch (error) {
    console.error(error);
    
    throw new Error('Error fetching organisation data');
  }
};

export default getOrganisationStatus;

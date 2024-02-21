// controllers/childcare-facilities-controller.js

const axios = require('axios');
const { childcareFacilitiesApi } = require('../config/api-config');

async function fetchChildcareFacilities(page, pageSize, sortOrder) {
  try {
    const offset = (page - 1) * pageSize;

    // Set the default order to COALESCE(program_name, 'AAAAAAA') for ascending
    const ascOrder = "COALESCE(program_name, 'AAAAAAA')";

    // Set the order based on sortOrder or use the defaultOrder
    let order = '';
    let defaultOrder = '';

    if (sortOrder === 'asc') {
      order = ascOrder;
    } else if (sortOrder === 'desc') {
      // Set the descending order
      order = `${ascOrder} DESC`;
    } else {
      defaultOrder;
    }

    console.log('Fetching data with parameters:', {
      limit: pageSize,
      offset,
      order,
    });

    // Include the $order parameter only if sortOrder is provided
    const response = await axios.get(
      `${childcareFacilitiesApi}&$limit=${pageSize}&$offset=${offset}${
        order ? `&$order=${order}` : ''
      }`
    );

    console.log('Received response:', response.data);

    const childcareData = response.data;

    // Transform the data
    const transformedData = childcareData.map((item) => {
      const formattedDate = new Date(item.inspection_date).toLocaleDateString(
        'en-Gb',
        {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }
      );

      const formattedRemedyDate =
        item.remedy_date &&
        new Date(item.remedy_date).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });

      return {
        facility_name: item.program_name || 'Facility name not available',
        type_of_program:
          item.type_of_program || 'Type of program not available',
        facility_address: `${item.program_address}, ${item.program_city}, ${item.postal_code}`,
        phone_number: item.phone_number || 'Phone number not available',
        capacity: item.capacity || 'Capacity not available',
        inspection_date: formattedDate,
        inspection_reason: item.inspection_reason,
        non_compliance: item.non_compliance,
        enforcement_action: item.enforcement_action,
        remedy_date: formattedRemedyDate,
      };
    });

    console.log('Transformed data:', transformedData);

    return transformedData;
  } catch (error) {
    console.error('Error fetching childcare facilities:', error);
    throw error; // This error should be handled in the route
  }
}

module.exports = fetchChildcareFacilities;

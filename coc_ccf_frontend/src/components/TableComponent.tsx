import { useState, useEffect } from 'react';
import MapComponent from './MapComponent';

interface FacilityDataItem {
  facility_name: string;
  facility_address: string;
  phone_number: string;
  serialNumber: number;

  capacity: number;
  inspection_date: string;
  inspection_reason: string;
  non_compliance: string;
  enforcement_action: string;
  remedy_date: string;

  // Add any other properties if needed
}

export default function TableComponent() {
  const [facilityData, setFacilityData] = useState<FacilityDataItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>('');
  const [selectedFacility, setSelectedFacility] =
    useState<FacilityDataItem | null>(null);

  useEffect(() => {
    const apiEndpoint = `http://localhost:3000/api/childcare-facilities?page=${currentPage}&pageSize=`;
    const apiRequest =
      sortOrder === 'asc' || sortOrder === 'desc'
        ? `${apiEndpoint}&sortOrder=${sortOrder}`
        : apiEndpoint;

    fetch(apiRequest)
      .then((response) => response.json())
      .then((data: FacilityDataItem[]) => {
        const dataWithSerialNumbers = data.map((item, index) => ({
          ...item,
          serialNumber: (currentPage - 1) * 10 + index + 1,
        }));
        setFacilityData(dataWithSerialNumbers);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [currentPage, sortOrder]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSortChange = () => {
    setSortOrder((prevOrder) => {
      if (prevOrder === 'asc') {
        return 'desc';
      } else if (prevOrder === 'desc') {
        return '';
      } else {
        return 'asc';
      }
    });
  };

  const openModal = (facility: FacilityDataItem) => {
    const modalElement = document.getElementById(
      'my_modal_5'
    ) as HTMLDialogElement | null;
    if (modalElement) {
      setSelectedFacility(facility);
      modalElement.showModal();
    }
  };

  const closeModal = () => {
    const modalElement = document.getElementById(
      'my_modal_5'
    ) as HTMLDialogElement | null;
    if (modalElement) {
      setSelectedFacility(null);
      modalElement.close();
    }
  };

  return (
    <>
      <div className='mt-10'>
        <div className='overflow-x-auto'>
          <table className='table'>
            {/* head */}
            <thead className='text-xl'>
              <tr>
                <th>Sr.</th>
                <th className='cursor-pointer' onClick={handleSortChange}>
                  Facility Name
                </th>
                <th>Facility Address</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {facilityData.map((dataItem, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0
                      ? 'bg-base-200 cursor-pointer'
                      : 'cursor-pointer'
                  }
                  onClick={() => openModal(dataItem)}
                >
                  <td>{dataItem.serialNumber}</td>
                  <td>{dataItem.facility_name}</td>
                  <td>{dataItem.facility_address}</td>
                  <td>{dataItem.phone_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='join grid grid-cols-2 mt-5'>
          <button
            className='join-item btn btn-outline'
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous Page
          </button>
          <button
            className='join-item btn btn-outline'
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next Page
          </button>
        </div>
      </div>

      {/* Modal */}
      <dialog
        id='my_modal_5'
        className='modal modal-bottom sm:modal-middle relative'
      >
        <div className='modal-box'>
          <button
            className='btn bg-slate-200 text-black btn-circle btn-sm absolute top-0 right-0 m-3'
            onClick={closeModal}
          >
            X
          </button>
          <h3 className='font-bold text-lg'>Facility Details</h3>
          <MapComponent />
          <div className='modal-action just'>
            <form method='dialog'>
              {selectedFacility && (
                <div>
                  {/* Display additional details about the facility */}
                  <p className='font-bold'>
                    Facility Name:{' '}
                    <span className=' font-normal'>
                      {selectedFacility.facility_name}
                    </span>{' '}
                  </p>
                  <p className='font-bold'>
                    Phone Number:{' '}
                    <span className=' font-normal'>
                      {selectedFacility.phone_number}
                    </span>{' '}
                  </p>
                  <p className='font-bold'>
                    Capacity:{' '}
                    <span className=' font-normal'>
                      {selectedFacility.capacity}
                    </span>{' '}
                  </p>
                  <p className='underline font-bold mt-5'>Inspection Details</p>
                  {selectedFacility.inspection_date && (
                    <p className='font-bold'>
                      Inspection Date:{' '}
                      <span className=' font-normal'>
                        {selectedFacility.inspection_date}
                      </span>{' '}
                    </p>
                  )}
                  {selectedFacility.inspection_reason && (
                    <p className='font-bold'>
                      Inspection Reason:{' '}
                      <span className=' font-normal'>
                        {selectedFacility.inspection_reason}
                      </span>
                    </p>
                  )}
                  {selectedFacility.non_compliance && (
                    <p className='font-bold'>
                      Non-Compliance(if any):{' '}
                      <span className=' font-normal'>
                        {selectedFacility.non_compliance}
                      </span>
                    </p>
                  )}
                  {selectedFacility.enforcement_action && (
                    <p className='font-bold'>
                      Enforcement Action(if any):{' '}
                      <span className=' font-normal'>
                        {selectedFacility.enforcement_action}
                      </span>
                    </p>
                  )}
                  {selectedFacility.remedy_date && (
                    <p className='font-bold'>
                      Remedy Date(if needed):{' '}
                      <span className=' font-normal'>
                        {selectedFacility.remedy_date}
                      </span>
                    </p>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

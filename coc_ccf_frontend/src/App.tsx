// import MapComponent from './components/MapComponent';
import TableComponent from './components/TableComponent';

function App() {
  return (
    <>
      <h1 className='text-2xl md:text-4xl font-bold text-center mt-10 content-center'>
        City of Calgary Childcare Facilities
      </h1>
      <div className='flex justify-center self-center mt-10'>
        <div className='flex flex-col'>
          <h3 className='mt-2 self-center font-extrabold'>
            Click on a facility to see more details about the facility.
          </h3>
          {/* <div className='flex self-center justify-center mx-auto'>
            {' '}
            <MapComponent />
          </div> */}

          <div>
            {' '}
            <TableComponent />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

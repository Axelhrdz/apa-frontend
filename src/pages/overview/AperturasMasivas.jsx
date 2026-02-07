import React from 'react'
import axios from 'axios';


const handleSubmit = async (e) => {
  e.preventDefault();
  

  //getting form data
  const formData = new FormData(e.target);
  const formValues = Object.fromEntries(formData);
  console.log(formValues);  //here getting the file value and the other values 


  try {
    const res = await axios.post(
      'http://localhost:3000/aperturas_masivas/apertura', formData,
      {
        responseType: 'blob',
      }
    );
    console.log(res.data);

    //create blob
    const blob = new Blob([res.data], { type: 'text/plain' });

    //create url from blob, to download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'test.txt');
    document.body.appendChild(link);
    link.click();


    //cleanup
    link.remove();
    window.URL.revokeObjectURL(url);


    // return res.data;
  } catch (error) {
    console.error('Error during fetching operation:', error);
  }
};


const AperturasMasivas = () => {
  return (
    <div>
      <h1>Aperturas Masivas</h1>
      <span className=''>This is the aperturas masivas page</span>
      <br />
      <br />
      <br />

      <form encType='multipart/form-data' action="" onSubmit={handleSubmit} className='flex flex-col gap-4 bg-stone-100 p-4 rounded-md text-black max-w-md mx-auto'>
        <div>
          <input type="file" name='file' id='file' className='border-2 border-stone-300 rounded-md p-1'/>
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor="test1">Test 1</label>
          <input required type="text" id="test1" name="test1" className='border-2 border-stone-300 rounded-md p-1'/>
        </div>

        {/* <div className='flex flex-col gap-2'>
          <label htmlFor="test2">Test 2</label>
          <input required type="text" id="test2" name="test2" className='border-2 border-stone-300 rounded-md p-1'/>
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor="test3">Test 3</label>
          <input required type="text" id="test3" name="test3" className='border-2 border-stone-300 rounded-md p-1'/>
        </div> */}

        <button type='submit' className='text-white bg-blue-500 px-4 py-2 rounded-md cursor-pointer'>Enviar</button>
      </form>
    </div>
  )
}

export default AperturasMasivas

import React from 'react'
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { DataGrid } from 'react-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faFile } from '@fortawesome/free-regular-svg-icons'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const AutosuficientesMasivas = () => {
  const timeoutRef = useRef(null);

  //Cleanup: cancel pending timeout on component unmount
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);


  const formRef = useRef(null);

  const [isloading, setidLoading] = useState(false);

  const [excelFile, setExcelFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  // console.log('excelFile', excelFile);

  const [excelFileData, setExcelFileData] = useState(null);
  // console.log('excelFileData', excelFileData);

  const [previewData, setPreviewData] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);

  const [feedback, setFeedback] = useState(null);

  //DATA GRID SECTION
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);



  const onFileSelected = (file) => {
    if(!file) return;
    console.log(file);

    setSelectedFile(file);
    setExcelFile(file.name);
  }


  const handleFileChange = (e) => {
    // console.log(e.target.files);
    onFileSelected(e.target.files?.[0]);
  }

  const handleDrop = (e) => {
    e.preventDefault();
    onFileSelected(e.dataTransfer.files?.[0]);
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  }
  
  const handlePreview = async (e) => {
    e.preventDefault();
    if(!selectedFile) return;
    console.log('desde handle preview');

    //get form data
    const formData = new FormData(formRef.current);
    formData.set('file', selectedFile);
    const formValues = Object.fromEntries(formData);
    // console.log(formValues);
    console.log(formData);


    //call preview endpoint
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/preview-excel/preview`, formData);
      console.log(res.data);
      const gridData = res.data.jsonData;
      setPreviewData(res.data);
      setExcelFileData(res.data);
      setPreviewVisible(true);


      const columns = Object.keys(gridData.jsonData[0]).map((key) => {
        return {key, name: key};
      });
      setColumns(columns);

      const rows = gridData.jsonData.map((item) => { return { id: item.id, ...item } });
      setRows(rows);
      
      return res.data;

    } catch (error) {
      console.log(error);
    } finally {
      setidLoading(false);
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('from handleSubmit');

    setidLoading(true);


    //getting form data
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData);
    // console.log(formValues);
    // console.log(excelFileData.jsonData);s

    let dataReturn = {
      folio: formValues.folio,
      observaciones: formValues.observaciones,
      excelData: excelFileData.jsonData,
    };
    // console.log('dataReturn', dataReturn);
    //pending to add return data, and build api endpoint to send data.....
    //pending to add return data, and build api endpoint to send data.....
    //pending to add return data, and build api endpoint to send data.....
    //pending to add return data, and build api endpoint to send data.....



    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/autosuficientes_masivas/autosuf`, dataReturn);


      clearTimeout(timeoutRef.current);
      setFeedback({
        type: 'success',
        message: 'Autosuficientes masivas enviadas correctamente',
        statusCode: res?.data?.status || null
      })
      timeoutRef.current = setTimeout(() => {
        setFeedback(null);
      }, 4000);



      console.log(res.data);
      return res.data;

    } catch (error) {
      console.log(error);

      if(error.response){
        clearTimeout(timeoutRef.current);
        setFeedback({
          type: 'error',
          message: 'Error al enviar los autosuficientes masivas',
          statusCode: error.response?.data?.status || null
        })
        timeoutRef.current = setTimeout(() => {
          setFeedback(null);
        }, 4000);
      } else {
        setFeedback({
          type: 'error',
          message: 'No se pudo conectar con el servidor',
          statusCode: null
        });
      }




      return error;
    }
    finally {
      setidLoading(false);
    }

  }

  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   const files = Array.from(e.dataTransfer.files);
  //   // setExcelFile(files[0].name);
  //   console.log(files);
  //   console.log(files[0].name);
  //   console.log(files[0].data);
  // }

  // const handleDragOver = (e) => {
  //   e.preventDefault();
  // }

  

  return (
    <div className='flex gap-4 w-full min-h-screen'>
      <div className='bg-[#fff] text-black h-screen w-full max-w-[20%] border-r-1 border-stone-300 hover:border-blue-500 hover:transition-all duration-200 ease-in-out'>


        {
          feedback?.type === 'success' ?
            <div className='text-center text-2xl font-thin py-5 bg-green-500 text-white'>
              {/* <h1>Status Code: {feedback.statusCode}</h1> */}
              <span>{feedback.message}</span>
              <span>Status Code: {feedback.statusCode}</span>
            </div>
          : null
        }
        {
          feedback?.type === 'error' ?
            <div className='text-center text-2xl font-thin py-5 bg-red-500 text-white'>
              {/* <h1>Status Code: {feedback.statusCode}</h1> */}
              <span>{feedback.message}</span>
              <span>Status Code: {feedback.statusCode}</span>
            </div>
          : null
        }

        <div className='h-full max-h-[10%] p-5 text-center border-b-1 border-stone-300'>
          <h1 className='text-2xl font-thin'>Autosuficientes Masivas</h1>
        </div>

        <form ref={formRef} encType='multipart/form-data' action="" >
          <div className='h-full max-h-[90%] flex flex-col gap-2 p-5'>
            <h1 className='text-2xl font-thin'>Subir Archivo</h1>
            <span className='text-sm text-stone-500'>Sube un archivo Excel o CSV para previsualizar</span>
            <hr className='border-stone-300 w-full border-b-0.5 my-4' />

            <div className='flex flex-col gap-2'>
              <span className='text-sm text-stone-500'>Seleccionar Archivo</span>
              <label onDrop={handleDrop} onDragOver={handleDragOver} htmlFor="file" className='text-sm text-stone-500 border-dashed border-1 border-stone-300 hover:border-green-500 hover:transition-all duration-200 ease-in-out rounded-md p-2 w-full h-[300px] text-center flex items-center justify-center cursor-pointer'>
                {
                  excelFile ?
                  <span className='text-sm text-stone-500'>Archivo seleccionado: <b>{excelFile}</b></span> :
                  'Arrastra, o seleccione el archivo Excel, XLSX'
                }
                <input type="file" id="file" name="file" className='hidden' onChange={handleFileChange} accept='.xlsx, .xls, .csv' />
              </label>
            </div>
            <hr className='border-stone-300 w-full border-b-0.5 my-4' />
            <button type='button' onClick={handlePreview} className='bg-stone-800 cursor-pointer text-white px-4 py-2 rounded-md flex items-center gap-2 justify-center'>
              <FontAwesomeIcon icon={faEye} /> 
              Ver previsualizacion
            </button>
          </div>
        </form>
        
      </div>

      <div className='w-full max-w-[80%] p-5 h-screen'>
        <div className='h-full max-h-[10%] text-center'>
          <h1 className='text-2xl font-thin'>Data Overview</h1>
        </div>

        <div className='h-full flex flex-col gap-4'>
          <div className='flex flex-col items-center border-1 border-stone-300 rounded-md p-1 h-full max-h-[70%]'>
            {
              previewData ? (
                <DataGrid className='flex-1 rdg-light w-full' columns={columns} rows={rows} />
              ) : (
                <div className='flex flex-col gap-2 items-center justify-center w-full h-full'>
                  <div className='flex flex-col gap-2 items-center justify-center w-full h-full'>
                    <FontAwesomeIcon className='text-stone-500 text-3xl' icon={faFile} />
                    <span className='text-sm text-stone-500'>Sin datos</span>
                    <span className='text-sm text-stone-500'>Sube un archivo Excel, y da click en "Ver previsualizacion" para ver el contenido del archivo</span>
                  </div>
                </div>
              )
            }
          </div>

          <div className='h-full max-h-[30%]'>
            <form onSubmit={handleSubmit} encType='multipart/form-data' className='flex flex-col gap-2 border-t-1 border-stone-300 p-4 h-full max-h-[30%]' action="">
              <div>
                <label htmlFor="folio" className='text-sm text-stone-500'>Folio / nombre del archivo</label>
                <input type="text" id="folio" name="folio" className='w-full p-2 border-1 border-stone-300 rounded-md' />
              </div>
              <div>
                <label htmlFor="observaciones" className='text-sm text-stone-500'>Observaciones</label>
                <input type="text" id="observaciones" name="observaciones" className='w-full p-2 border-1 border-stone-300 rounded-md' />
              </div>
              <div>
                <button 
                  type='submit' 
                  disabled={!previewData || isloading} 
                  className={
                    `${!previewData || isloading ? 
                      'bg-gray-500 cursor-not-allowed' 
                      : 
                      'bg-blue-500 cursor-pointer'} text-white px-4 py-2 rounded-md`
                  }
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                  { isloading ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </form>
          </div>

          
        </div>
      </div>

      

    </div>
  )
}

export default AutosuficientesMasivas

import React from 'react';
// image loader
import loader_logo from '../../img/Gimmick_MH_corail.png';
import '../PDFViewer/PdfViewer.css';

const Loader = ({isLoading}) => {
  if(!isLoading) return null;
  return (
    <div id="loader" className="d-flex justify-content-center align-items-center flex-column">
      <img src={loader_logo}  alt="loader" className="mb-5 logo-loader" />
      <p>Chargement...</p>
    </div>
  )
}

export default Loader

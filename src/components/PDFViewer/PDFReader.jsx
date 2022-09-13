import React, { useState } from 'react';
import Loader from './Loader';
import { Document, Page, pdfjs } from 'react-pdf';
import ControlPanel from './ControlPanel';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const PDFReader = () => {
  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  return (
    <div>
      <Loader isLoading={isLoading} />
      <section
        id="pdf-section"
        className="d-flex flex-column align-items-center w-100"
      >
       
        <Document
          file="/assets/docs/notice-information-sante.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
        > 
        
          <Page pageNumber={pageNumber} scale={scale} />
        </Document>
        <ControlPanel
        scale={scale}
        setScale={setScale}
        numPages={numPages}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        file="/assets/docs/notice-information-sante.pdf"
      />
      </section>
    </div>
  );
};

export default PDFReader;

import React, { useState } from 'react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { BadgeCheckIcon, ChipIcon } from "@heroicons/react/solid";
import { PDFDownloadLink} from '@react-pdf/renderer';
import pdfFile from './resume.pdf';
import { Document, Page , pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function Resume() {
    const [file, setFile] = useState(pdfFile);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onFileChange(event) {
        setFile(event.target.files[0]);
    }

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
      }
    
      function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
      }
    
      function previousPage() {
        changePage(-1);
      }
    
      function nextPage() {
        changePage(1);
      }
    
    const MyDoc = () => (
        <Document
        file={file}
    ><Page pageNumber={pageNumber} />
    </Document>
    );


    const DownloadPdf = () => (
        <div>
            <PDFDownloadLink document={<MyDoc />} fileName="Resume.pdf">
                {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : 'Download now!'
                }
            </PDFDownloadLink>
        </div>
    );

    return (
        <section id="resume">            
            <div className="container px-5 py-10 mx-auto">
                <div className="text-center mb-20">
                    <ChipIcon className="w-10 inline-block mb-4" />
                    <h1 className="sm:text-4xl text-3xl font-medium title-font text-white mb-4">
                        Resume
                    </h1>
                </div>
                <div className="flex flex-wrap lg:w-2/5 sm:mx-auto sm:mb-2 -mx-2">
                <Document
                        file={file}
                        onLoadSuccess={onDocumentLoadSuccess}
                        options={{
                            cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
                            cMapPacked: true,
                          }}
                    ><Page wrap="false" pageNumber={pageNumber} />
                    </Document>
                    <br/>
                    <div className="flex lg:w-1/5 sm:mx-auto sm:mb-2 -mx-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    disabled={pageNumber <= 1}
                    onClick={previousPage}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                    <p>Page {pageNumber || (numPages ? 1 : '--')}/{numPages || '--'}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                     disabled={pageNumber >= numPages}
                     onClick={nextPage}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                    </div>
                    <a href={pdfFile} download="Resume.pdf"> Download Here </a>  
                </div>
            </div>
            
        </section>
    );
}
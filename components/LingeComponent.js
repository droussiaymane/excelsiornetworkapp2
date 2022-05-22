import React, { useState } from 'react';
import Link from 'next/link';
import { QRCode } from 'react-qrcode-logo';
const LingeComponent = ({datatransaction}) => {
   
  const [showModal, setShowModal] = React.useState(false);
  const [paimentLink, setPaiementLink] = React.useState("");

  
   
  return  <tr>


  <td className="p-2 whitespace-nowrap">
      <div className="text-left font-medium text-500"> {datatransaction.date!=undefined && datatransaction.date.substring(0,10)} {datatransaction.date!=undefined && datatransaction.date.substring(11,19)}</div>
  </td>
  <td className="p-2 whitespace-nowrap">
  <div className="text-left font-medium text-500"> {datatransaction.typePaiement}</div>
  </td>
  <td className="p-2 whitespace-nowrap">
  <div className="text-left font-medium text-500"> {datatransaction.prixTotal} MAD</div>
  </td>
  <td className="p-2 whitespace-nowrap">
  <div className="text-left font-medium text-500"> {datatransaction.status=="payé" ? (<span class="spanGreen textBold">{datatransaction.status}</span>) : (<span class="spanRed textBold">{datatransaction.status}</span>)}</div>
  </td>
  <td className="p-2 whitespace-nowrap">
  <div className="text-left font-medium text-500"> {datatransaction.linkPaiment!=undefined ? datatransaction.linkPaiment :".........." }</div>
  </td>
  <td className="p-2 whitespace-nowrap">
  <div className="text-left font-medium text-500"> {datatransaction.linkPaiment!=undefined ? (  <button
        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => {
          setShowModal(true);
        setPaiementLink(datatransaction.linkPaiment)}}
      >
        QR CODE
      </button>) :".........." }</div>
  

  
     
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                   QR CODE
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <QRCode value={paimentLink} logoImage="/logo.png" logoOpacity={1} />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
          
                  <button
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}



  </td>
</tr>;
};

export default LingeComponent;

import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import CreateLingeButton from './CreateLingeButton';
import { useSession } from 'next-auth/react';
import LingeComponent from './LingeComponent';
import axios from 'axios';
import Link from 'next/link';
import Progress from './Progress';
import Message from './Message';
import 'nprogress/nprogress.css'
import Nprogress from 'nprogress'

const TableLinge = () => {
    const [showProgress,setProgress]=useState(false)
    const [dataTransactions,setData]=useState([]);
    const [invoices,setInvoices]=useState([]);
async function getAllOrders(){
    await axios.get(`/api/order/getall`,{
       headers: {
         'Access-Control-Allow-Origin':'*' //the token is a variable which holds the token
       }
      }).then(response => {
        setProgress(false);
        Nprogress.done();
        setData(response.data.orders);
     })
     
     ;

   }

const { data: session } = useSession();

const getYoucanToken=async ()=>{
    var token ="";
    const email_or_phone="adev.off@gmail.com";
    const password="Adev15423815..";
    const data={email_or_phone:email_or_phone,password:password}
    const api="https://youcanpay.com/api/login";
    const res = await fetch(api, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
  }).then(res => res.json()
  )
 .then(res => token=res.token).catch((error)=>console.log(error));
 console.log(token);
 return token;
}

const updateOrderStatus=async (id)=>{
    await axios.get(`/api/order/updatestatus/${id}`,{
        headers: {
          'Access-Control-Allow-Origin':'*' //the token is a variable which holds the token
        }
       }).then(response => {console.log("updated")
          
      });
}

const  getAllInvoices=async ()=>{
    
    var token =await getYoucanToken();
    const api="https://youcanpay.com/api/invoices";
    const res = await fetch(api,{
        method: 'GET',
        headers: { 'Accept': 'application/json',
        Authorization: `Bearer ${token}` }
    }).then(res => res.json()
    )
   .then(res => {
       setInvoices(res.data.filter(async (invoice)=>
       {
           if(invoice.status==1){
            await updateOrderStatus(invoice.id);
            return invoice
           }
           
       }));
       
    });
  
      
   
   
  }

   


useEffect( ()=>{
    async function init(){
     await getAllInvoices();
     await getAllOrders();
       
    }
    
    init();
    
},[])
        

  return (

    <div className="grid place-items-center h-screen">
            {showProgress && <Progress></Progress>}

    <div className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200 ">
  
        <header className="px-5 py-4 border-b border-gray-100">
        <div>

      <Link href="/addordre"><button className="loginButton px-6 py-4 leading-5 text-white transition-colors duration-200 transform bg-green-700 rounded hover:bg-green-600 focus:outline-none">Créer un ordre</button></Link>

</div> 
<br></br>
<br></br>
           <div><h2 className="font-semibold text-gray-800 titleLinge">Liste des ordres </h2>
          
        </div>
        </header>
        <div className="p-3">
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                        <tr>
                         
                            <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-left">Date de création </div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-left">    Type de paiement </div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-left">Prix Total </div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-left">Status</div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-left">Lien de paiement </div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-left">Qr code </div>
                            </th>
                       
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                    {dataTransactions.map((transaction)=>{
        return (<LingeComponent key={Math.random()} datatransaction={transaction}></LingeComponent>)
    })}
                      
                      

                    
                    </tbody>
                </table>
            </div>
        </div>
        
    </div>
    
    </div>
  
    );
};

export default TableLinge;

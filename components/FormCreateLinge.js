import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Select from 'react-select';
import axios from 'axios';
import Progress from './Progress';
import Message from './Message';
import 'nprogress/nprogress.css'
import Nprogress from 'nprogress'
import { useSession } from 'next-auth/react';
import Image from 'next/image'


const FormCreateLinge = ({dataProps}) => {
    const [error,setError]=useState(false)
    const [success,setSuccess]=useState(false)
     const [showProgress,setProgress]=useState(false)

    const [message,setMessage]=useState('');
    const [messageSuccess,setMessageSuccess]=useState("Le linge a été créé avec succès")

    const reformat=()=>{
      settypePaiement("espece");
      setsnikersQuantity(null);
      setpringlesQuantity(0);
      settwixQuantity(0);

    

    }
const prixSnikers=2;
const prixTwix=2;
const prixPringles=3;
const prixMilka=0;
const prixJus=0;
const prixPasta=0;


    const [typePaiement,settypePaiement]=useState("espece");
    const [snikersQuantity,setsnikersQuantity]=useState(0);
    const [prixTotalSnikers,setprixTotalSnikers]=useState(0);
    const [pringlesQuantity,setpringlesQuantity]=useState(0);
    const [prixTotalPringles,setprixTotalPringles]=useState(0);
    const [twixQuantity,settwixQuantity]=useState(0);
    const [prixTotalTwix,setprixTotalTwix]=useState(0);
    const [milkaQuantity,setmilkaQuantity]=useState(0);
    const [prixTotalMilka,setprixTotalMilka]=useState(0);
    const [jusquantity,setjusquantity]=useState(0);
    const [prixTotaljus,setprixTotaljus]=useState(0);
    const [pastaquantity,setpastaquantity]=useState(0);
    const [prixTotalPasta,setprixTotalPasta]=useState(0);
    const [prixTotal,setprixTotal]=useState(0);
   

      
      const addOrder=async (data)=>{

        const res = await fetch('/api/order/add', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()
        )
       .then(res => {
           if(res.error){
             setError(true);
             setSuccess(false)
             setMessage(res.error);
             setProgress(false);
             Nprogress.done();
           }else{
               
               if(res.status=="created"){
                 reformat();
                 setSuccess(true)
                 setError(false);
                 setProgress(false);
                 Nprogress.done();
               }
               else{
                 setError(true);
                 setSuccess(false)
                 setMessage("ERROR");
                 setProgress(false);
                 Nprogress.done();
               }
             }
      })}

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
       .then(res => token=res.token);
       return token;
      }
     

      const createInvoice= async (token,data)=>{
          const invoice = {};
        
          const api="https://youcanpay.com/api/invoices";
        const res = await fetch(api, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json',
            Authorization: `Bearer ${token}` }
        }).then(res => res.json()
        )
       .then(res => invoice=res.data);
       return invoice;
      }


      const createOrder=async(e)=>{
e.preventDefault();
var data={}
if(typePaiement=="espece"){
    data={prixTotal,typePaiement,status:"payé",date:new Date()}
}
else{
    data={name:"Nouveau Ordre",amount:prixTotal.toString(),currency:"MAD",contact_option:"2",description:"test",to:"+212636686670",active:"1",content:"Votre transaction a été validé avec succès"}
    var linkPaiment="";
    // youcan api
  var token =await getYoucanToken();
    var invoice=await createInvoice(token,data);
console.log(invoice);

    data={prixTotal,typePaiement,status:"en attente",linkPaiment:invoice.alias,invoiceid:invoice.id,date:new Date()}
}

addOrder(data);
      }

   

  return <div className='grid place-items-center h-screen'>
        {showProgress && <Progress></Progress>}
        {error && <Message message={message} color="red"></Message> }
    {success && <Message message={messageSuccess} color="green"></Message> }
<section className="w-full max-w-4xl px-6 py-4 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">Créer un nouveau ordre</h2>
       
  
        <form onSubmit={createOrder}>
          
        <div className="mt-6 ">
          
        <div className="items-center -mx-2 md:flex">
        <div className="w-full mx-2">
        <Image src="/pringles.png" alt="me" width="64" height="64" />
                </div>
      
         <div className="w-full mx-2">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">NOM DU PRODUIT</label>

                      <input disabled value="Pringles" name="service" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" type="text"/>
             
                </div>

                <div className="w-full mx-2 mt-4 md:mt-0">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">PRIX PAR UNITE</label>
                    <input disabled  value={prixPringles+" MAD"}   name="service" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" type="text"/>
                               </div>
       <div className="w-full mx-2 mt-4 md:mt-0">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">QUANTITE</label>
                    <input type="number" value={pringlesQuantity}  min="0" onChange={(e)=>{setprixTotalPringles(e.target.value * prixPringles);setpringlesQuantity(e.target.value);setprixTotal(prixTotaljus+prixTotalPasta+prixTotalMilka+prixTotalTwix+prixTotalSnikers+e.target.value*prixPringles)}}  name="service" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 redInput" />
                               </div>
                <div className="w-full mx-2 mt-4 md:mt-0">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">PRIX TOTAL</label>

                    <input disabled value={prixTotalPringles +" MAD"}    type="text" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>
            </div>
            <br></br>
            <div className="items-center -mx-2 md:flex">
            <div className="w-full mx-2">
        <Image src="/snikers.jpeg" alt="me" width="64" height="64" />
                </div>
         <div className="w-full mx-2">
           
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">NOM DU PRODUIT</label>

                    <input disabled value="Snickers"   name="service" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" type="text"/>
                </div>

                <div className="w-full mx-2 mt-4 md:mt-0">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">PRIX PAR UNITE</label>
                    <input disabled  value={prixSnikers+" MAD"}    name="service" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" type="text"/>
                               </div>
       <div className="w-full mx-2 mt-4 md:mt-0">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">QUANTITE</label>
                    <input type="number" value={snikersQuantity} onChange={(e)=>{setprixTotalSnikers(e.target.value * prixSnikers);setsnikersQuantity(e.target.value);setprixTotal(prixTotaljus+prixTotalPasta+prixTotalMilka+prixTotalTwix+e.target.value*prixSnikers+prixTotalPringles)}}  min="0"  name="service" className="redInput block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                               </div>
                <div className="w-full mx-2 mt-4 md:mt-0">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">PRIX TOTAL</label>

                    <input disabled value={prixTotalSnikers +" MAD"}    type="text" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>
            </div>
            <br></br>
            <div className="items-center -mx-2 md:flex">
            <div className="w-full mx-2">
        <Image src="/twix.png"  width="60" height="60" />
                </div>
         <div className="w-full mx-2">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">NOM DU PRODUIT</label>

                    <input disabled value="Twix"   name="service" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" type="text"/>
                </div>

                <div className="w-full mx-2 mt-4 md:mt-0">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">PRIX PAR UNITE</label>
                    <input disabled  value={prixTwix+" MAD"}  name="service" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" type="text"/>
                               </div>
       <div className="w-full mx-2 mt-4 md:mt-0">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">QUANTITE</label>
                    <input type="number" value={twixQuantity}  min="0"  onChange={(e)=>{setprixTotalTwix(e.target.value * prixTwix);settwixQuantity(e.target.value);setprixTotal(prixTotaljus+prixTotalPasta+prixTotalMilka+prixTotalSnikers+e.target.value*prixTwix+prixTotalPringles)}} name="service" className="redInput block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                               </div>
                <div className="w-full mx-2 mt-4 md:mt-0">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">PRIX TOTAL</label>

                    <input disabled value={prixTotalTwix +" MAD"}   type="text" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>
            </div>
            <br></br>
         
          
        
            <br></br>
                <div className="items-center -mx-2 md:flex">
         <div className="w-full mx-2">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Type de paiement</label>

                    <select  value={typePaiement}  onChange={(e)=>settypePaiement(e.target.value)} className=" block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" >
                                <option value="espece">Espece</option>
                                <option value="carte" >carte bancaire</option>
                            </select>     
                </div>

                <div className="w-full mx-2 mt-4 md:mt-0">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">PRIX TOTAL DE L'ORDRE</label>
                    <input disabled  value={prixTotal +" MAD"}    name="service" className=" block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" type="text"/>
                               </div>
       </div>
                
            <div className="flex justify-center mt-6">
                <button className="marginbuttons px-4 py-2 text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-blue-600" type="submit">Créer</button>
               <Link href="/dashboard"><button type="button" className="px-4 py-2 text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Retour</button></Link>
            </div>
            
        </div>
        </form>
    </section>
      
  </div>;
};

export default FormCreateLinge;

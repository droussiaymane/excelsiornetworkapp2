import React from 'react';
import FormCreateLinge from '../components/FormCreateLinge';
import { getSession } from 'next-auth/react';

const addLinge = ({data}) => {
  return <div>
     <FormCreateLinge dataProps={data}></FormCreateLinge>
  </div>;
};

export default addLinge;

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });
    let data=context.query;
    if (!session) {
       
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            },
        };
    }
    else if(session.user!=undefined){
       
       
            return {
                props: { session,data },
            }
    }
    
    }
    
  
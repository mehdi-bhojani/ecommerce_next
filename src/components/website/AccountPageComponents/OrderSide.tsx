import React, { useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator';
import Orders from '@/shared/json/orders.json'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
const OrderSide = () => {
 
  interface Order {
    id: string;
    status: string;
    item: string;
    quantity: number;
    price: number;
    date:string;
  }



  const [data, setdata] = useState<Order[]>(Orders);
 const [Flag,setFlag]=useState<Boolean>((Orders.length==0?false:true));

function GetData(){
  if(selectedTab!='all'){
    setdata(Orders.filter((item)=> item.status==selectedTab))
  }
  else{
    setdata(Orders)
  }
  
}







    const [selectedTab, setSelectedTab] = useState('all');

    useEffect(() => {
 
      GetData();
   
    }, [data,selectedTab]); 
 
 
    const tabs = [
      { name: 'All', id: 'all' },
      { name: 'Processing', id: 'processing' },
      { name: 'Failed', id: 'failed' },
      { name: 'Ontheway', id: 'ontheway' },
      { name: 'Delivered', id: 'delivered' },
    ];
  
    return (
      <div className=" pl-4">
        <div className="flex items-center mb-6">
        
          <h1 className="text-2xl font-semibold">Order</h1>
        </div>
  
        <div className="flex space-x-2 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { 
                setSelectedTab(tab.id);
                GetData();
            }}
              className={`py-2 px-4 rounded-full font-semibold ${
                selectedTab === tab.id
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <Separator />
    <Separator className='mb-2'/>
    {(Flag==false)? (<div className="bg-gray-100 p-6 text-center rounded-lg  ">
          <p className="text-gray-500">Not found</p>
        </div>):''}
       


       

   

        <Table>
    
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>item</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((Items) => (
          <TableRow key={Items.id}>
            <TableCell className="font-medium">{Items.id}</TableCell>
            <TableCell>{Items.status}</TableCell>
            <TableCell>{Items.item}</TableCell>
            <TableCell>{Items.quantity}</TableCell>
            <TableCell>{Items.price}</TableCell>
            <TableCell className="text-right">{Items.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
     
    </Table>








      </div>
    );
}

export default OrderSide
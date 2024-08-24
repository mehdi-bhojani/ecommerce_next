import { Separator } from '@/components/ui/separator';
import React, { useEffect, useState } from 'react'
import Complant from '@/shared/json/Complaints.json'
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
const RefundSide = () => {



 
    interface Complaint {
        complaint_id: string;
        status: string;
        description: string;
        submitted_by: string;
        submitted_date: string;
        resolved_date?: string; // Optional, since not all complaints will have it
        rejected_date?: string; // Optional, since not all complaints will have it
    }
    
    
    
      const [data, setdata] = useState<Complaint[]>(Complant.filter((item)=> item.status=='process'));


      function GetData(){
      
          setdata(Complant.filter((item)=> item.status==selectedTab))
     
        }
        
      
      








    const [selectedTab, setSelectedTab] = useState('process');

    const tabs = [
        { name: 'In Process', id: 'process' },
        { name: 'Resolve', id: 'resolved' },
        { name: 'Rejected', id: 'rejected' },
      
    ];



    useEffect(() => {
 
        GetData();
     
      }, [selectedTab]); 

    return (
        <div className="p-6">
            <div className="flex items-center mb-6">

                <h1 className="text-2xl font-semibold">Complaints</h1>
            </div>

            <div className="flex space-x-2 mb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() =>[ setSelectedTab(tab.id),GetData()]}
                        className={`py-2 px-4 rounded-full font-semibold ${selectedTab === tab.id
                                ? 'bg-black text-white'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>
         

            {/* "complaint_id": "CPLNT005",
        "status": "resolved",
        "description": "Issue with incorrect display of user profile.",
        "submitted_by": "user202",
        "submitted_date": "2024-07-20",

        "resolved_date": "2024-07-22" */}

         {/* "complaint_id": "CPLNT006",
        "status": "rejected",
        "description": "Suggestion to change the app color scheme.",
        "submitted_by": "user303",
        "submitted_date": "2024-08-05",

        "rejected_date": "2024-08-07" */}

         {/* "complaint_id": "CPLNT004",
        "status": "process",
        "description": "Login credentials are not recognized.",
        "submitted_by": "user101",
        "submitted_date": "2024-08-15" */}





         
            <Table>
    
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Complaint id</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Description</TableHead>
        <TableHead>Submitted by</TableHead>
        <TableHead>Submitted Date</TableHead>
     {(selectedTab==='resolved')?( <TableHead >Resolved Date</TableHead>):(selectedTab==='rejected')?( <TableHead >Rejected Date</TableHead>):''}  
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map((Items) => (
        <TableRow key={Items.complaint_id}>
          <TableCell className="font-medium">{Items.complaint_id}</TableCell>
          <TableCell>{Items.status}</TableCell>
          <TableCell>{Items.description}</TableCell>
          <TableCell>{Items.submitted_by}</TableCell>
          <TableCell>{Items.submitted_date}</TableCell>
          {(selectedTab==='resolved')?( <TableCell >{Items.resolved_date}</TableCell>):(selectedTab==='rejected')?( <TableCell >{Items.rejected_date}</TableCell>):''}  
        </TableRow>
      ))}
    </TableBody>
   
  </Table>
        </div>
    );
}

export default RefundSide
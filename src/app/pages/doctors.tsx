import { useEffect, useState } from 'react';

import { Breadcrumb, Button, Spin, Table, message } from 'antd';

import api from '@/shared/lib/axios';

export default function Page() {
   const [doctors, setDoctors] = useState([]);
   const [loading, setLoading] = useState(false);

   // Fetch pending-activation doctors
   const getDoctors = () => {
      setLoading(true);
      api.get('/api/Specialties/doctors/pending-activation')
         .then((res) => setDoctors(res.data.data))
         .catch(() => message.error('Failed to fetch doctors.'))
         .finally(() => setLoading(false));
   };

   // Activate doctor
   const handleActivate = (doctorId: any) => {
      setLoading(true);
      api.patch(`/api/Specialties/doctors/${doctorId}/role-activation`, {
         role_activation: 'true',
      })
         .then(() => {
            message.success('Doctor activated!');
            getDoctors();
         })
         .catch(() => message.error('Failed to activate doctor.'))
         .finally(() => setLoading(false));
   };

   // Table columns
   const columns = [
      {
         title: 'Name',
         dataIndex: 'name',
         key: 'name',
      },
      {
         title: 'Email',
         dataIndex: 'email',
         key: 'email',
      },
      {
         title: 'Phone',
         dataIndex: 'phone',
         key: 'phone',
      },
      {
         title: '',
         key: 'id',
         dataIndex: 'id',
         render: (_: any, record: any) => (
            <Button type='primary' onClick={() => handleActivate(record.id)}>
               Activate
            </Button>
         ),
      },
   ];

   useEffect(() => {
      getDoctors();
   }, []);

   return (
      <div>
         <Breadcrumb items={[{ title: 'Doctors' }]} />
         <div className='specialty_page'>
            {loading ? (
               <div
                  style={{
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                     minHeight: '60vh',
                  }}
               >
                  <Spin tip='Loading Doctors...' size='large' />
               </div>
            ) : (
               <Table
                  columns={columns}
                  dataSource={doctors}
                  rowKey='id'
                  scroll={{ x: 'max-content' }}
                  pagination={{ pageSize: 8 }}
               />
            )}
         </div>
      </div>
   );
}

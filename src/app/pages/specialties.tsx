import { useEffect, useState } from 'react';

import {
   Breadcrumb,
   Button,
   Form,
   Input,
   Modal,
   Spin,
   Table,
   message,
} from 'antd';

import api from '@/shared/lib/axios';

export default function Specialties() {
   // State
   const [specialties, setSpecialties] = useState([]);
   const [loading, setLoading] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [form] = Form.useForm();
   const [editId, setEditId] = useState(null);

   // Fetch specialties
   const getSpecialties = () => {
      setLoading(true);
      api.get('/api/Specialties/show')
         .then((res) => setSpecialties(res.data.data))
         .catch(() => message.error('Failed to fetch specialties.'))
         .finally(() => setLoading(false));
   };

   // Add or update specialty
   const handleSubmitSpecialty = () => {
      form
         .validateFields()
         .then((values) => {
            setLoading(true);
            const request = editId
               ? api.put(`/api/Specialties/updateSpecialty/${editId}`, {
                    name: values.name,
                 })
               : api.post('/api/Specialties/storeSpecialty', {
                    name: values.name,
                 });
            request
               .then(() => {
                  message.success(
                     editId ? 'Specialty updated!' : 'Specialty added!'
                  );
                  handleCancel();
                  getSpecialties();
               })
               .catch(() =>
                  message.error(
                     editId
                        ? 'Failed to update specialty.'
                        : 'Failed to add specialty.'
                  )
               )
               .finally(() => setLoading(false));
         })
         .catch(() => {});
   };

   // Delete specialty
   const handleDeleteSpecialty = (id: any) => {
      Modal.confirm({
         title: 'Are you sure you want to delete this specialty?',
         okText: 'Delete',
         okType: 'danger',
         cancelText: 'Cancel',
         onOk: () => {
            setLoading(true);
            api.delete(`/api/Specialties/deleteSpecialty/${id}`)
               .then(() => {
                  message.success('Specialty deleted successfully!');
                  getSpecialties();
               })
               .catch(() => message.error('Failed to delete specialty.'))
               .finally(() => setLoading(false));
         },
      });
   };

   // Modal helpers
   const showAddModal = () => {
      setEditId(null);
      form.resetFields();
      setIsModalOpen(true);
   };

   const openEditModal = (record: any) => {
      setEditId(record.id);
      form.setFieldsValue({ name: record.name });
      setIsModalOpen(true);
   };

   const handleCancel = () => {
      setIsModalOpen(false);
      setEditId(null);
      form.resetFields();
   };

   // Table columns
   const columns = [
      {
         title: 'Name',
         dataIndex: 'name',
         key: 'name',
      },
      {
         title: '',
         key: 'id',
         dataIndex: 'id',
         render: (_: any, record: any) => (
            <div
               style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  justifyContent: 'flex-end',
               }}
            >
               <Button
                  type='primary'
                  danger
                  onClick={() => handleDeleteSpecialty(record.id)}
               >
                  Delete
               </Button>
               <Button type='primary' onClick={() => openEditModal(record)}>
                  Update
               </Button>
            </div>
         ),
      },
   ];

   useEffect(() => {
      getSpecialties();
   }, []);

   return (
      <div>
         {/* Modal */}
         <Modal
            title={editId ? 'Update Specialty' : 'Add New Specialty'}
            open={isModalOpen}
            onOk={handleSubmitSpecialty}
            onCancel={handleCancel}
            confirmLoading={loading}
            okText='Ok'
         >
            <Form form={form} layout='vertical'>
               <Form.Item
                  label='Specialty Name'
                  name='name'
                  rules={[
                     { required: true, message: 'Please enter specialty name' },
                  ]}
               >
                  <Input placeholder='Enter specialty name' />
               </Form.Item>
            </Form>
         </Modal>

         {/* Breadcrumb */}
         <Breadcrumb items={[{ title: 'Specialty' }]} />

         {/* Page content */}
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
                  <Spin tip='Loading Specialties...' size='large' />
               </div>
            ) : (
               <>
                  <Button
                     type='primary'
                     onClick={showAddModal}
                     style={{ marginBottom: 20 }}
                  >
                     + Add Specialty
                  </Button>
                  <Table
                     columns={columns}
                     dataSource={specialties}
                     rowKey='id'
                     scroll={{ x: 'max-content' }}
                     pagination={{ pageSize: 8 }}
                  />
               </>
            )}
         </div>
      </div>
   );
}

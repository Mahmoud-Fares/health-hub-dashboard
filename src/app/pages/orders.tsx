import { useEffect, useState } from 'react';

import {
   Breadcrumb,
   Button,
   Modal,
   Select,
   Spin,
   Table,
   Tabs,
   Tag,
   message,
} from 'antd';

import api from '@/shared/lib/axios';

const { Option } = Select;

// Status colors for tags
const STATUS_COLORS: any = {
   pending: 'gold',
   completed: 'green',
   cancelled: 'red',
};

export default function Page() {
   // Orders
   const [orders, setOrders] = useState([]);
   // Loading state
   const [loading, setLoading] = useState(false);
   // Active tab state
   const [activeTab, setActiveTab] = useState('all');
   // Details Modal
   const [isModalOpen, setIsModalOpen] = useState(false);
   // Selected order for details
   const [selectedOrder, setSelectedOrder] = useState<any>(null);

   // Fetch orders based on status
   const getOrders = (status = '') => {
      setLoading(true);
      let url = '/api/e-commerce/orders/all';
      if (status && status !== 'all') {
         url += `?status=${status}`;
      }

      api.get(url)
         .then((res) => {
            setOrders(res.data.data);
            console.log(res.data.data);
         })
         .catch(() => message.error('Failed to fetch orders'))
         .finally(() => setLoading(false));
   };

   // Update order status
   const updateStatus = (id: any, newStatus: any) => {
      Modal.confirm({
         title: `Are you sure you want to change status to ${newStatus}?`,
         okText: 'Yes',
         cancelText: 'No',
         onOk: () => {
            setLoading(true);
            api.put(`/api/e-commerce/orders/update-status/${id}`, {
               status: newStatus,
            })
               .then(() => {
                  message.success('Order status updated');
                  getOrders(activeTab); // Refresh current tab data
               })
               .catch((err) =>
                  message.error(
                     err?.response?.data?.message || 'Failed to update status'
                  )
               )
               .finally(() => setLoading(false));
         },
      });
   };

   // Order Details
   const handleShowDetails = (order: any) => {
      setSelectedOrder(order);
      setIsModalOpen(true);
   };

   // Table columns configuration
   const columns = [
      {
         title: 'Total Price (EGP)',
         dataIndex: 'total_price',
         key: 'total_price',
      },
      {
         title: 'Status',
         dataIndex: 'status',
         key: 'status',
         render: (status: any, record: any) =>
            status === 'pending' ? (
               <Select
                  defaultValue={status}
                  onChange={(value) => updateStatus(record.id, value)}
                  style={{ width: 120 }}
               >
                  <Option value='pending'>Pending</Option>
                  <Option value='completed'>Completed</Option>
                  <Option value='cancelled'>Cancelled</Option>
               </Select>
            ) : (
               <Tag color={STATUS_COLORS[status]} style={{ fontWeight: 600 }}>
                  {status.toUpperCase()}
               </Tag>
            ),
      },
      {
         title: 'Address',
         dataIndex: 'address',
         key: 'address',
         width: 200,
      },
      {
         title: 'Phone Number',
         dataIndex: 'phone',
         key: 'phone',
      },
      {
         title: 'Date',
         dataIndex: 'created_at',
         key: 'created_at',
         render: (date: any) =>
            new Date(date).toLocaleString('en-GB', {
               day: 'numeric',
               month: 'short',
               year: 'numeric',
               hour: '2-digit',
               minute: '2-digit',
            }),
      },
      {
         title: '',
         key: 'actions',
         render: (_: any, record: any) => (
            <div
               style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  justifyContent: 'flex-end',
               }}
            >
               <Button danger onClick={() => handleDeleteOrder(record.id)}>
                  Delete
               </Button>

               <Button type='primary' onClick={() => handleShowDetails(record)}>
                  Details
               </Button>
            </div>
         ),
      },
   ];

   // Handle order deletion
   const handleDeleteOrder = (id: any) => {
      Modal.confirm({
         title: 'Are you sure you want to delete this order?',
         okText: 'Delete',
         okType: 'danger',
         cancelText: 'Cancel',
         onOk: () => {
            setLoading(true);
            api.delete(`/api/e-commerce/orders/destroy/${id}`)
               .then(() => {
                  message.success('Order deleted successfully');
                  getOrders(activeTab);
               })
               .catch(() => message.error('Failed to delete order'))
               .finally(() => setLoading(false));
         },
      });
   };

   // Handle tab change
   const handleTabChange = (key: any) => {
      setActiveTab(key);
      getOrders(key);
   };

   // Fetch orders on component mount
   useEffect(() => {
      getOrders();
   }, []);

   // Tab items configuration
   const tabItems = [
      { key: 'all', label: 'All' },
      { key: 'pending', label: 'Pending' },
      { key: 'completed', label: 'Completed' },
      { key: 'cancelled', label: 'Cancelled' },
   ];

   return (
      <div>
         <Breadcrumb items={[{ title: 'Orders' }]} />

         <div className='category_page'>
            {loading ? (
               <div
                  style={{
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                     minHeight: '60vh',
                  }}
               >
                  <Spin tip='Loading Orders...' size='large' />
               </div>
            ) : (
               <>
                  <Tabs
                     activeKey={activeTab}
                     onChange={handleTabChange}
                     items={tabItems.map((item) => ({
                        ...item,
                        children: (
                           <Table
                              columns={columns}
                              dataSource={orders}
                              rowKey='id'
                              scroll={{ x: 'max-content' }}
                              pagination={{ pageSize: 8 }}
                           />
                        ),
                     }))}
                  />
               </>
            )}
         </div>

         <Modal
            title={`Order #${selectedOrder?.id} Details`}
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
         >
            {selectedOrder ? (
               <div>
                  <p>
                     <strong>User ID:</strong> {selectedOrder.user_id}
                  </p>
                  <p>
                     <strong>Address:</strong> {selectedOrder.address}
                  </p>
                  <p>
                     <strong>Total Price:</strong> {selectedOrder.total_price}
                  </p>
                  <p>
                     <strong>Status:</strong>{' '}
                     <Tag color={STATUS_COLORS[selectedOrder.status]}>
                        {selectedOrder.status.toUpperCase()}
                     </Tag>
                  </p>
                  <p>
                     <strong>Products:</strong>
                  </p>
                  <Table
                     dataSource={selectedOrder.products}
                     rowKey='product_id'
                     pagination={false}
                     columns={[
                        {
                           title: 'Product ID',
                           dataIndex: 'product_id',
                        },
                        {
                           title: 'Name',
                           dataIndex: 'name',
                        },
                        {
                           title: 'Quantity',
                           dataIndex: 'quantity',
                        },
                        {
                           title: 'Price Per Unit',
                           dataIndex: 'price_per_unit',
                        },
                        {
                           title: 'Subtotal',
                           dataIndex: 'subtotal',
                        },
                     ]}
                     size='small'
                  />
               </div>
            ) : null}
         </Modal>
      </div>
   );
}

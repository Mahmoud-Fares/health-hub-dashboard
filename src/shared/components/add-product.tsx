import { useEffect, useState } from 'react';

import { Form, Input, Modal, Select, Upload, message } from 'antd';

import api from '@/shared/lib/axios';

type Props = {
   open: boolean;
   onClose: () => void;
   refreshProducts: () => void;
};

const AddProduct = ({ open, onClose, refreshProducts }: Props) => {
   const [form] = Form.useForm();
   const [categories, setCategories] = useState<any[]>([]);
   const [imageFile, setImageFile] = useState<any>(null);
   const [loading, setLoading] = useState<boolean>(false);
   const [fileList, setFileList] = useState<any[]>([]);

   // Get categories
   const getCategories = () => {
      api.get('/api/e-commerce/categories')
         .then((res) => setCategories(res.data.data))
         .catch((err) => console.log(err));
   };

   const categoryOptions = categories.map((cat) => ({
      label: cat.name,
      value: cat.id,
   }));

   useEffect(() => {
      if (open) getCategories();
   }, [open]);

   const handleSubmit = (values: any) => {
      if (!imageFile) {
         return message.warning('Please upload a product image.');
      }

      // Product Data
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('price', values.price);
      formData.append('description', values.description);
      formData.append('stock', values.stock);
      formData.append('category_id', values.category_id);
      formData.append('image', imageFile);

      setLoading(true);
      api.post('/api/e-commerce/products/store', formData)
         .then(() => {
            message.success('Product added successfully!');
            form.resetFields();
            setImageFile(null);
            onClose();
            refreshProducts();
         })
         .catch((err) => {
            console.error(err);
            message.error('Failed to add product.');
         })
         .finally(() => setLoading(false));
   };

   return (
      <Modal
         title='Add New Product'
         open={open}
         onCancel={onClose}
         onOk={() => form.submit()}
         okText='Add'
         confirmLoading={loading}
      >
         <Form form={form} layout='vertical' onFinish={handleSubmit}>
            <Form.Item
               name='name'
               label='Product Name'
               rules={[
                  { required: true, message: 'Please enter product name' },
               ]}
            >
               <Input placeholder='Product Name' />
            </Form.Item>

            <Form.Item
               name='price'
               label='Price'
               rules={[{ required: true, message: 'Please enter price' }]}
            >
               <Input placeholder='Price' />
            </Form.Item>

            <Form.Item
               name='description'
               label='Description'
               rules={[{ required: true, message: 'Please enter description' }]}
            >
               <Input.TextArea placeholder='Description' rows={4} />
            </Form.Item>

            <Form.Item
               name='stock'
               label='Stock'
               rules={[{ required: true, message: 'Please enter stock' }]}
            >
               <Input placeholder='Stock' />
            </Form.Item>
            {/* 
        <Form.Item
          name="category_id"
          label="Category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select placeholder="Select Category">
            {categories.map((cat) => (
              <Select.Option key={cat.id} value={cat.id}>
                {cat.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item> */}

            <Form.Item
               name='category_id'
               label='Category'
               rules={[{ required: true, message: 'Please select a category' }]}
            >
               <Select
                  placeholder='Select Category'
                  options={categoryOptions}
                  style={{ width: '100%' }}
               />
            </Form.Item>

            <Form.Item label='Product Image' required>
               <Upload
                  listType='picture-card'
                  fileList={fileList}
                  beforeUpload={(file) => {
                     const isLt2MB = file.size / 1024 <= 2048;
                     if (!isLt2MB) {
                        message.error(
                           'Image must be smaller than 2MB (2048 KB)!'
                        );
                        return Upload.LIST_IGNORE;
                     }
                     setImageFile(file);
                     setFileList([
                        {
                           uid: file.uid,
                           name: file.name,
                           status: 'done',
                           url: URL.createObjectURL(file),
                        },
                     ]);
                     return false;
                  }}
                  onRemove={() => {
                     setImageFile(null);
                     setFileList([]);
                  }}
                  maxCount={1}
               >
                  {fileList.length === 0 ? '+ Upload' : null}
               </Upload>
            </Form.Item>
         </Form>
      </Modal>
   );
};

export default AddProduct;

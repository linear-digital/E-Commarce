import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Image, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import { api } from '@/Components/instance/api';

const CategoryModal = ({ isOpen, onClose, brand, onSuccess }) =>
{
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(brand?.image || '');

  useEffect(() =>
  {
    if (brand) {
      form.setFieldsValue({ name: brand.name });
      setImage(brand.image);
    } else {
      form.resetFields();
      setImage('');
    }
  }, [brand, form]);

  const handleSubmit = async (values) =>
  {
    setLoading(true);

    const brandData = {
      name: values.name,
      image
    };

    try {
      if (brand) {
        await api.put(`/api/categories/${brand._id}`, brandData);
      } else {
        await api.post('/api/categories', brandData);
      }

      toast.success(brand ? 'Category updated successfully' : 'Category created successfully');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving Category:', error);
      toast.error('Failed to save Category');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async ({ file }) =>
  {
    const formData = new FormData();
    formData.append('product', file);

    try {
      const res = await api.post('/api/upload/single', formData);
      setImage(res.data.image);
      toast.success('Image uploaded');
    } catch (err) {
      console.error('Image upload error:', err);
      toast.error('Failed to upload image');
    }
  };

  return (
    <Modal
      title={brand ? 'Edit Category' : 'Add New Category'}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-4"
      >
        <Form.Item
          name="name"
          label="Category Name"
          rules={[{ required: true, message: 'Please enter category name' }]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>

        <Form.Item label="Upload Image">
          <Upload
            customRequest={handleImageUpload}
            showUploadList={false}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        {image && (
          <div className="mb-4">
            <Image
              src={image}
              width={100}
              height={100}
              alt="Category"
              className="rounded border"
            />
          </div>
        )}

        <div className="flex justify-end space-x-3 mt-4">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {brand ? 'Update Category' : 'Create Category'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CategoryModal;
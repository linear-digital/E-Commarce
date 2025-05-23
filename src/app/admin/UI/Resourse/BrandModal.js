import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import toast from 'react-hot-toast';
import { api } from '@/Components/instance/api';

const BrandModal = ({ isOpen, onClose, brand, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (brand) {
      form.setFieldsValue({ name: brand.name });
    } else {
      form.resetFields();
    }
  }, [brand, form]);

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const brandData = {
        name: values.name,
        created_at: brand?.created_at || new Date(),
        updated_at: new Date(),
      };

      if (brand) {
        await api.put(`/api/brands/${brand._id}`, brandData);
      } else {
        await api.post('/api/brands', brandData);
      }

      toast.success(brand ? 'Brand updated successfully' : 'Brand created successfully');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving brand:', error);
      toast.error('Failed to save brand');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={brand ? 'Edit Brand' : 'Add New Brand'}
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
          label="Brand Name"
          rules={[{ required: true, message: 'Please enter brand name' }]}
        >
          <Input placeholder="Enter brand name" />
        </Form.Item>

        <div className="flex justify-end space-x-3 mt-4">
          <Button onClick={onClose}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {brand ? 'Update Brand' : 'Create Brand'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default BrandModal;
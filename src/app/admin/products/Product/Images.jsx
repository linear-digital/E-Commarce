import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
const App = ({ images, setImages , product }) =>
{
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    // Clear fileList when productId changes
    setFileList([]);
  }, [product]);
  const handleChange = info =>
  {
    let newFileList = [...info.fileList];
    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = newFileList.slice(-2);
    // 2. Read from response and show file link
    newFileList = newFileList.map(file =>
    {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.image;
        if (images.every((img) => img.id !== file.uid)) {
          setImages((prev) => [...prev, {
            id: file.uid,
            ...file.response
          }]);
        }
      }
      return file;
    });
    setFileList(newFileList);
  };
  const props = {
    action: 'https://server.oftechgadget.com/api/upload/single',
    onChange: handleChange,
    name: 'product',
    multiple: true,
  };
  return (
    <Upload {...props} fileList={fileList}>
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
};
export default App;
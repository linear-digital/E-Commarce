import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Select, Space } from 'antd';
let index = 0;
const App = ({ data, setData, inputName }) =>
{

    const [name, setName] = useState('');
    const inputRef = useRef(null);
    const onNameChange = event =>
    {
        setName(event.target.value);
    };
    const addItem = e =>
    {
        e.preventDefault();
        setData([...data, name || `New item ${index++}`]);
        setName('');
        setTimeout(() =>
        {
            var _a;
            (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }, 0);
    };
    return (
        <Select
            mode='multiple'
            value={data}
            onChange={(data) => console.log(data)}
            placeholder={inputName || 'Please select'}
            dropdownRender={menu => (
                <>
                    {menu}
                    <Divider style={{ margin: '8px 0' }} />
                    <Space style={{ padding: '0 8px 4px' }}>
                        <Input
                            placeholder="Please enter item"
                            ref={inputRef}
                            value={name}
                            onChange={onNameChange}
                            onKeyDown={e => e.key === 'Enter' && addItem(e)}
                        />
                        <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                            Add item
                        </Button>
                    </Space>
                </>
            )}
            options={data?.map(item => ({ label: item, value: item }))}
        />
    );
};
export default App;
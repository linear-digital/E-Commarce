import React from 'react';
import { Select, Tag } from 'antd';
const options = [
    { value: 'black' },
    { value: 'white' },
    { value: 'red' },
    { value: 'yellow' },
    { value: 'gold' },
    { value: 'blue' },
    { value: 'green' },
    { value: 'geekblue' },
    { value: 'purple' },
    { value: 'magenta' },
    { value: 'volcano' },
    { value: 'orange' },
    { value: 'lime' },
    { value: 'cyan' },

    // Additional colors
    { value: 'gray' },
    { value: 'silver' },
    { value: 'brown' },
    { value: 'pink' },
    { value: 'teal' },
    { value: 'navy' },
    { value: 'maroon' },
    { value: 'olive' },
    { value: 'aqua' },
    { value: 'indigo' },
    { value: 'beige' },
    { value: 'coral' },
    { value: 'chocolate' },
    { value: 'tan' },
    { value: 'plum' }
];
const tagRender = props =>
{
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = event =>
    {
        event.preventDefault();
        event.stopPropagation();
    };
    return (
        <Tag
            color={(value !== "white") ? value : "black"}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{ marginInlineEnd: 4 }}
        >
            {label}
        </Tag>
    );
};
const Tags = ({ data, setData, normal }) => (
    <Select
        mode="multiple"
        tagRender={tagRender}
        defaultValue={data}
        onChange={setData}
        style={{ width: '100%' }}
        options={options}
    />
);
export default Tags;
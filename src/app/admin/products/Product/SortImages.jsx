import React from 'react';
import { Image } from 'antd';
import
{
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import
{
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const SortableImage = ({ image, index, id, setImages, images }) =>
{
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="relative"
        >
            <Image
                src={image.image}
                alt="Preview"
                width={100}
                height={100}
                preview={{
                    toolbarRender: (info) => (
                        <div className="flex  
                         w-[300px] py-3 items-center justify-center">
                            <button
                                onClick={() =>
                                    setImages(
                                        images.filter(
                                            (img) => img.id !== image.id
                                        )
                                    )
                                }
                                className='bg-red-500 flex items-center justify-center gap-2 h-[30px] rounded-lg px-3 text-white'
                            >
                                <FontAwesomeIcon
                                    icon={faX}
                                />
                                <span> Remove</span>
                            </button>
                        </div>
                    )
                }}
            />
        </div>
    );
};

const SortImages = ({ images, setImages }) =>
{
    console.log(images);
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 },
        })
    );
    const handleDragEnd = (event) =>
    {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = images.findIndex((img) => img.id === active.id);
            const newIndex = images.findIndex((img) => img.id === over.id);
            const reordered = arrayMove(images, oldIndex, newIndex);
            setImages(reordered);
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={images.map((img) => img.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="flex flex-wrap gap-2 mt-4">
                    {images.map((image, index) => (
                        <SortableImage key={image.id} image={image} index={index} id={image.id} images={images} setImages={setImages} />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
};

export default SortImages;
/*
 * Copyright (c) jan.24.Tamiz
 */
'use client'
import React from 'react'
import {api} from "@/Components/instance/api";
import toast from "react-hot-toast";
import Image from "next/image";

const ImagesUploader = ({ images , code , setImages, setCover}) => {
    const fileUpload = async (e) => {
            if (e.target.files) {
                const formData = new FormData()
                for (const file of e.target.files) {
                    formData.append('product', file);
                }
                try {
                    const response = await  fetch(`http://localhost:4000/upload-product`,{
                        method: "post",
                        headers: {
                            code: code,
                        },
                        body: formData
                    })
                    const data = await  response.json()
                    setImages([...images, ...data.images])
                }
                catch (error){
                    toast.error("Image Uploading faild")
                }
            }
    }
    return (
        <div className={"mt-5"}>
            <input
                className={"file-input file-input-bordered w-full"}
                multiple={true}
                type={"file"}
                onChange={fileUpload}
                placeholder='Choose Your Files'
            />
            <div className="flex flex-wrap gap-5 mt-5">
                {
                    images &&
                    images.map((img, index)=> (
                        <div key={index}>
                            <Image
                                onClick={()=> setCover(img.image)} src={'http://localhost:4000/'+img.image} alt={""}
                                   width={100}
                                   height={100}
                                   className={"rounded"}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default ImagesUploader

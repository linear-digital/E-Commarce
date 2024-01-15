"use client";
import React, {useEffect, useState} from "react";
import ImagesUploader from "@/app/dashboard/products/add/Images";
import Image from "next/image";
import { useSelector } from "react-redux";
import {api} from "@/Components/instance/api";

const page = () => {
  const { category } = useSelector((state) => state.Tools);
  const [images, setImages] = useState([]);
  const [cover, setCover] = useState("");
  const [descriptions, setDescriptions] = useState([]);
  const [keyFeature, setKeyFeature] = useState([]);
  const [spacificatin, setSpacification] = useState([]);
  const [showCategory, setShowCategory] = useState(false);
  const [values, setValues] = useState({
    name: "", //added
    code: "", //added
    price: 0, //added
    discount_percentage: 0, //added
    inStock: true, //added
    sold: 0, //
    available: 0, //added
    visit: 0, // added
    category: "", //added
    brand: "", //added
    productDescription: "", //added
    variant: [],
  });
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const formEventHandler = async (e) => {
    e.preventDefault();
    const newProduct = {
      ...values, spacificatin , descriptions,key_features
      :keyFeature,images, cover
    }
    try {
      const res = await  api.post("/api/products", newProduct)
      console.log(res)
    }
    catch (e) {
      console.log(e)
    }
    // console.log(values)

  };
  const addKey = () => {
    setDescriptions([...descriptions, { key: key, value: value }]);
    setKey("");
    setValue("");
  };
  const [feature_key , setFeatureKey] = useState("")
  const [feature_value , setFeatureValue] = useState("")
  const [specifc_key , setSpecificKey] = useState("")
  const [specifc_value , setSpecificValue] = useState("")
  const addKeyFeature = () => {
    setKeyFeature([...keyFeature , {key : feature_key , value : feature_value}])
    setFeatureKey("")
    setFeatureValue("")
  }
  const addSpecification = () => {
    setSpacification([...spacificatin , {key : specifc_key , value : specifc_value}])
    setSpecificKey("")
    setSpecificValue("")
   setValues({...values, spacification: spacificatin})
  }
  const addVariant = (value) => {
    const vari = value.split(",")
    setValues({ ...values, variant: vari });
  }
  return (
    <div>
      <h1 className={"text-3xl"}>Add Product</h1>
      {cover && (
        <Image
          src={"http://localhost:4000/" + cover}
          alt={""}
          width={200}
          height={200}
          className={"mt-5"}
        />
      )}
      <form action="" className={"mt-5"} onSubmit={formEventHandler}>
        <TextInput
            onchange={(e) => setValues({...values, name: e.target.value})}
            value={values.name}
            name={"name"}
            label={"Product Name"}
            placeHolder={"Product Name"}
        />
        <TextInput
            value={values.code}
            name={"code"}
            onchange={(e) => setValues({...values, code: e.target.value})}
            label={"Product Code"}
            placeHolder={"Product Code"}
        />
        <TextInput
            value={values.main_price}
            onchange={(e) => setValues({...values, price: Number(e.target.value)})}
            name={"main_price"}
            label={"Main Price"}
            placeHolder={"Main Price"}
            type={"number"}
        />
        <TextInput
            value={values.discount}
            onchange={(e) => setValues({...values, discount: Number(e.target.value)})}
            name={"discount"}
            label={"Discount %"}
            placeHolder={"Discount in %"}
            type={"number"}
        />
        <TextInput
            value={values.sold}
            onchange={(e) => {
              setValues({...values, sold: Number(e.target.value), available: Number(e.target.value)})

            }}
            name={"sold"}
            label={"Sold"}
            placeHolder={"Sold"}
            type={"number"}
        />
        <TextInput
            value={values.brand}
            onchange={(e) => setValues({...values, brand: e.target.value})}
            name={"brand"}
            label={"Brand"}
            placeHolder={"Brand Logo URL"}
        />
        <label className="form-control w-full mb-2">
          <div className="label">
            <span className="label-text text-sm">Category</span>
          </div>
          <input
              onClick={() => {
                setShowCategory(!showCategory);
              }}
              defaultValue={values.category}
              type="text"
              placeholder={"Category"}
              className="input input-sm input-bordered w-full "
          />
        </label>
        <TextInput
            value={values.productDescription}
            onchange={(e) =>
                setValues({...values, productDescription: e.target.value})
            }
            type={"text"}
            name={"productDescription"}
            label={"Product Description"}
            placeHolder={"Product Description"}
        />
        <ImagesUploader
            code={values.code}
            setImages={setImages}
            images={images}
            setCover={setCover}
        />
        <div className="form-control text-black w-[200px] mt-2 flex items-start justify-start">
          <label className="label cursor-pointer">
            <input
                checked={values.inStock}
                onChange={(e) =>
                    setValues({...values, inStock: e.target.checked})
                }
                type="checkbox"
                className="checkbox"
            />
            <span className="label-text text-base ml-5">In Stock</span>
          </label>
        </div>
        <div className="mt-2">
          <h1 className="text-xl font-semibold">Descriptions</h1>
          {descriptions.map((item, index) => (
              <div key={index}>
                <h5 className="text-xs font-semibold">{item.key}</h5>
                <p className="text-xs">{item.value}</p>
              </div>
          ))}
        </div>
        <div className="mt-5 w-[500px] ml-5">
          <TextInput
              value={key}
              onchange={(e) => setKey(e.target.value)}
              name={"Title"}
              label={"Title"}
              placeHolder={"Title"}
          />
          <TextInput
              value={value}
              onchange={(e) => setValue(e.target.value)}
              name={"key"}
              type={"text"}
              label={"Description"}
              placeHolder={"Description"}
          />
          <div onClick={addKey} className="btn btn-sm btn-primary">
            Add
          </div>
        </div>
        <div className="mt-5">
          <h1 className="text-xl font-semibold">Key Features</h1>
          {keyFeature.map((item, index) => (
              <div key={index} className="flex items-center">
                <h5 className="text-xs font-semibold mr-1">{item.key} : </h5>
                <p className="text-xs">{item.value}</p>
              </div>
          ))}
        </div>
        <div className="mt-5 w-[500px] ml-5">
          <TextInput
              value={feature_key}
              onchange={(e) => setFeatureKey(e.target.value)}
              name={"Title"}
              label={"Key"}
              placeHolder={"Title"}
          />
          <TextInput
              value={feature_value}
              onchange={(e) => setFeatureValue(e.target.value)}
              name={"key"}
              type={"text"}
              label={"Feature"}
              placeHolder={"Description"}
          />
          <div onClick={addKeyFeature} className="btn btn-sm btn-primary">
            Add
          </div>
        </div>
        <div className="mt-5">
          <h1 className="text-xl font-semibold">Spacification</h1>
          {spacificatin.map((item, index) => (
              <div key={index} className="flex items-center">
                <h5 className="text-xs font-semibold mr-1">{item.key} : </h5>
                <p className="text-xs">{item.value}</p>
              </div>
          ))}
        </div>
        <div className="mt-5 w-[500px] ml-5">
          <TextInput
              value={specifc_key}
              onchange={(e) => setSpecificKey(e.target.value)}
              name={"Title"}
              label={"Key"}
              placeHolder={"Title"}
          />
          <TextInput
              value={specifc_value}
              onchange={(e) => setSpecificValue(e.target.value)}
              name={"key"}
              type={"text"}
              label={"Feature"}
              placeHolder={"Description"}
          />
          <div onClick={addSpecification} className="btn btn-sm btn-primary">
            Add
          </div>
        </div>
        <label className="form-control w-full mt-5">
          <div className="label">
            <span className="label-text text-sm">Variants</span>
          </div>
          <input
              onChange={(e) => {
                addVariant(e.target.value)
              }}
              placeholder={"Variants"}
              className="input input-sm input-bordered w-full "
          />
        </label>
        <button className="mt-5 btn btn-primary">Add Product</button>
      </form>
      {showCategory && (
          <CategoryModal
              category={category}
              setValues={setValues}
              showCategory={showCategory}
              setShowCategory={setShowCategory}
          />
      )}
    </div>
  );
};
export default page;

const TextInput = ({name, label, placeHolder, type, onchange, value}) => {
  return (
      <label className="form-control w-full mb-2">
        <div className="label">
          <span className="label-text text-sm">{label}</span>
        </div>
        {type === "text" && (
            <textarea
                onChange={onchange}
                name={name}
                value={value}
                placeholder={placeHolder}
                className="textarea textarea-bordered w-full"
            />
        )}
        {type !== "text" && (
            <input
                onChange={onchange}
                name={name}
                value={value}
                min={0}

                type={type ? type : "text"}
                placeholder={placeHolder}
                className="input input-sm input-bordered w-full "
            />
      )}
    </label>
  );
};

const CategoryModal = ({
  category,
  setValues,
  showCategory,
  setShowCategory,
}) => {
  const setData = (val) => {
    setValues({ ...setValues, category: val });
    setShowCategory(!showCategory);
  };
  const [cat , setCat] = useState("")
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_2" className="modal modal-open">
        <div className="modal-box max-h-[500px] overflow-y-auto">
          <div className={"w-full flex"}>
            <input onChange={(e)=> setCat(e.target.value)} type="text" className={"input input-bordered input-sm w-full"}/>
            <button onClick={()=> setData(cat)} className={"btn btn-sm"}>Apply</button>
          </div>
          <ul>
            <li>
              <button
                onClick={() => setData("others")}
                className={`text-sm btn btn-sm btn-primary w-full my-1`}
              >
                Others
              </button>
            </li>
            {category.map((item, index) => (
              <li key={item.name}>
                {item.children ? (
                  <ul className="menu">
                    {item.children.map((child, index) => (
                      <li key={child.name}>
                        {child.children ? (
                          <details>
                            <summary
                              className={`text-sm btn btn-sm btn-priamry w-full my-1 ${
                                child.name === "All" && "hidden"
                              }`}
                            >
                              {item.name + " / " + child.name}
                            </summary>
                            <ul>
                              {child.children.map((nati) => {
                                return (
                                  <li key={nati.name}>
                                    {" "}
                                    <button
                                      onClick={() => setData(nati.param)}
                                      className={`text-sm btn btn-sm btn-primary w-full my-1 ${
                                        child.name === "All" && "hidden"
                                      }`}
                                    >
                                      {nati.name}
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                          </details>
                        ) : (
                          <button
                            onClick={() => setData(child.param)}
                            className={`text-sm btn btn-sm btn-primary w-full my-1 ${
                              child.name === "All" && "hidden"
                            }`}
                          >
                            {item.name + " / " + child.name}
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <button
                    onClick={() => setData(item.param)}
                    className={`text-sm btn btn-sm btn-primary w-full my-1 ${
                      item.name === "All" && "hidden"
                    }`}
                  >
                    {item.name}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

// onClick={() => setValues({ ...values, category: item })}

import React, { useEffect, useState } from "react";
import HeaderCompo from "../components/commonCompos/headerComponents";
import { Button, Popover, Table, Typography } from "antd";
import ProductsForm from "../components/commonCompos/productForm/productForm";
import { useForm } from "antd/es/form/Form";
import { useFormik } from "formik";
import { addProductsValidation, formValidtions } from "../utils/validations";
import DashbordHead from "../components/dashBoardCompos/dashboardHead/dashboardHead";
import { commonColors } from "../assests/colors/colors";
import {SignatureOutlined, DeleteFilled} from "@ant-design/icons"
import ProductDetail from "../components/commonCompos/productDetail/productDetail";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, fetchProducts, handleSelectedProduct, updateProducts } from "../store/productSlice";
import texts from "../assests/commonTexts/commonTexts.json"
import Cookies from "universal-cookie";
import { useNavigate } from "react-router";

export default function DashboardPage () {
  const columns = [
    {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        width: '15%',
        render: (text) => <img src={text} alt="image" width='50px'/>,
      },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '10%',
      responsive: ["sm"],
      render: (text) => <Typography  className="overflow-hidden !text-[14px] !text-neavyBlue w-[5vw] whitespace-nowrap text-ellipsis">{text}</Typography>,
    }, {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        width: '10%',
        render: (text) => <Typography  className="overflow-hidden !text-[14px] !text-neavyBlue w-[5vw] whitespace-nowrap text-ellipsis">{text}</Typography>,
      }, {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        width: '10%',
        render: (text) => <Typography className=" !text-[14px] !text-neavyBlue">{text}</Typography>,
      }, {
        title: 'DiscountedPrice',
        dataIndex: 'discountPrice',
        key: 'discountPrice',
        width: '10%',
        render: (text) => <Typography  className="overflow-hidden !text-[14px] !text-neavyBlue w-[5vw] whitespace-nowrap text-ellipsis">{text}</Typography>,
      }, 
      , {
        title: 'Discount(%)',
        dataIndex: 'DiscountePercentage',
        key: 'DiscountePercentage',
        width: '10%',
        render: (text, obj) => <Typography  className="overflow-hidden !text-[14px] !text-neavyBlue w-[5vw] whitespace-nowrap text-ellipsis">{getDiscountPercentage(obj)} %</Typography>,
      }, 
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        width:'5%',
        render: (text) => <Typography className="overflow-hidden !text-[14px] !text-neavyBlue w-[5vw] whitespace-nowrap text-ellipsis">{text}</Typography>,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text,obj) => <Popover content={<div className="!bg-goldenBrown w-full flex flex-col gap-2">
        <Button disabled={text} onClick={(e) => handleActiveDeactive(text, obj?.id, e)} style={{color:text ? commonColors?.greenColor : commonColors?.neavyBlue, borderColor:text ? commonColors?.greenColor : commonColors?.neavyBlue }}>
          {texts.commonTexts.activate}
        </Button>
        <Button onClick={(e) => handleActiveDeactive(text, obj?.id, e)} disabled={!text ? true:false} style={{color:text ? commonColors?.neavyBlue : commonColors?.redColor, borderColor:text ? commonColors?.neavyBlue : commonColors?.redColor }}>
          {texts.commonTexts.deactivate}
        </Button>
      </div>}><Button style={{color:text ? commonColors?.greenColor : commonColors?.redColor, borderColor:text ? commonColors?.greenColor : commonColors?.redColor }}>{text? 'Activated':'Deactivated'}</Button></Popover>,
      },
       {
        title: 'Edit',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <div className="flex items-center justify-center gap-2">
            <Button className=" !text-neavyBlue !border-none" onClick={(e)=>handleEdit(text,e)}><SignatureOutlined /></Button>
            <Button className=" !text-redColor !border-none" onClick={(e) => handleDeleteProducts(text,e)}><DeleteFilled /></Button>
        </div>,
      }]
      const cookies = new Cookies()
      const navigate = useNavigate()
    const [openForm, setOpenForm] = useState(false)
    const [openDetail, setOpenDetail] = useState(false)
    const [edit, setEdit] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState()
    const [tableData, setTableData] = useState([])
    const dispatch = useDispatch()
    const authData = useSelector( state => state.auth?.authUser )
    const products = useSelector(state => state?.products?.products)
    const [reload, setReload] = useState(false)
    const [initialObject, setInitialObject] = useState({
      id: Math.random() * 24,
      name: '',
      category: '',
      description: '',
      image:'',
      price: '',
      discountPrice: '',
      status: true
  })

    const idb = window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

    const handleInDbData = (updatedArray) => {
      const dbPromise = idb.open("smartCart", 1);
      dbPromise.onsuccess = () => {
          const db = dbPromise.result
          const tx = db.transaction('userData', 'readwrite')
          const userData = tx.objectStore('userData')
            const userDetails = {
              id: authData?.id ,
              products : updatedArray,
          }
          const users = userData.put(userDetails)
          users.onsuccess = () => {
              tx.oncomplete = () => {
                if (edit) {
                setEdit(false)
                }
                handleClose()
                  db.close()
              }
          }
          users.onerror = () => {
              console.log("error----")
          }
      }
    }
    const handleEditArray = (values) => {
      const updatedArray = tableData.map((item) => {
        if (item?.id === selectedProduct?.id) {
          let obj = {}
          for(let key in values) {
            obj[key] = values[key]
          }
          return obj
        } else {
          return item
        }
      })
      return updatedArray
    }
    const handleAddEditProducts = () => {
      if (edit) {
        dispatch(updateProducts(handleEditArray(values)))
        setTableData(handleEditArray(values))
      handleInDbData(handleEditArray(values))
      } else {
      dispatch(addProduct(values))
      setTableData([...tableData, values])
      handleInDbData(products)
      // const pushedArray = tableData.push(values)
    }
   setReload(!reload)
  }
    const getDiscountPercentage = (obj) => {
      const divided = parseInt((obj?.discountPrice / obj.price) * 100)
      return divided
    }
    const handleClose = () => {
      setOpenForm(false)
      resetForm()
  }
  const handleDetailClose = () => {
      setOpenDetail(false)
  }

  const handleDetails = (id) =>{
      const selected = tableData.find((item) => item?.id === id)
      setSelectedProduct(selected)
      dispatch(handleSelectedProduct(selected))
      setOpenDetail(true)
  }

  const handleEdit = (id, e) =>{
      e?.stopPropagation()
      const selected = tableData.find((item) => item?.id === id)
      setSelectedProduct(selected)
      dispatch(handleSelectedProduct(selected))
      setInitialObject(selected)
      setOpenForm(true)
      setEdit(true)
      setReload(!reload)
  }

  const handleImage = (e) => {
      const file = e?.target?.files[0]
      const url = URL.createObjectURL(file)
     values.image = url
     setReload(!reload)
  }

  const handleDeleteProducts = (id, e) => {
    e?.stopPropagation()
    const filtered = tableData.filter((item) => item?.id !== id)
    handleInDbData(filtered)
    setTableData(filtered)
    dispatch(updateProducts(filtered))
    
  }

  const handleAddProduct = () => {
    setOpenForm(true)
  }
  const handleActiveDeactive = (value, id, e) => {
    e?.stopPropagation()
     const updatedtArray = tableData.map((item) => { 
     if (item?.id === id ) {
     return {...item, status : !value}
     } else {
     return item
     }}
     )
     setTableData(updatedtArray)
     dispatch(updateProducts(updatedtArray))
     console.log("products---->",products)
     handleInDbData(updatedtArray)
  }

  const activeProducts = () => {
    const active = tableData?.filter((item) => item?.status === true)
    return active.length
  }

    const {handleChange, handleSubmit, values, errors, resetForm} = useFormik({
        initialValues: initialObject,
      enableReinitialize: true,
        validationSchema: addProductsValidation,
        onSubmit:(values, {resetForm}) => {
          handleAddEditProducts()
          resetForm()
        },
    })
          
          useEffect(() => {
            if (!cookies.get('user')){
              navigate("/login")
              window.location.reload()
            }else {
              dispatch(fetchProducts(authData?.products))
              setTableData(products)  
            }

          }, [tableData.length])

    return(
        <div className="w-full !h-full !min-h-max !bg-aquariumBlue flex flex-col gap-2">
        <HeaderCompo authData={authData}/>
        <div className="p-[3%] w-full !h-full !bg-aquariumBlue flex flex-col gap-2">
        <DashbordHead authData={authData} handleAddProduct={handleAddProduct} totalProducts={tableData.length > 0 ? tableData.length : texts.commonTexts.noProducts}  activeProducts={activeProducts() > 0 ? activeProducts() :  texts.commonTexts.noProducts}/>
        <div className=" max-[1000px]:overflow-x-scroll max-[1000px]:no-scrollbar">
            <Table onRow={( items, index) => { return { onClick:()=> items?.status === true? handleDetails(items?.id): null}}} columns={columns} dataSource={tableData} pagination={{ pageSize: 3}}/>
        </div>
        </div>
        <ProductsForm
        open={openForm}
        onCancle={handleClose}
        formData={values}
        onChangeImage={handleImage}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={errors}
        />
        <ProductDetail
        open={openDetail}
        handleClose={handleDetailClose}
        selectedProduct={selectedProduct}
        />
        </div>
    )
}
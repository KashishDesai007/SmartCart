import { Button, Input, Modal, Typography } from 'antd'
import React, { useRef } from 'react'
import {FileAddOutlined} from '@ant-design/icons'
import { useFormik } from 'formik'
import TextAreaField, { InputField } from '../fields'
import { commonColors } from '../../../assests/colors/colors'
import "./productForm.css"
import texts from "../../../assests/commonTexts/commonTexts.json"

export default function ProductsForm (props) {
    const ref = useRef()
    const ref1 = useRef()

return(
    <Modal
    open={props?.open}
    onCancel={props?.onCancle}
    footer={null}
    styles={{
        body: { backgroundColor: commonColors.yellowColor},
          }}
    >
    <div>
    <form onSubmit={props?.handleSubmit}>
        <div className='flex items-center justify-start w-[100%] gap-3'>
        <div className='flex items-center justify-center h-[150px] w-[150px] border-2 border-dashed !bg-whiteColor border-goldenBrown'>
           { props?.formData?.image ? null : <input accept="image/*" name='image' ref={ref} type='file' value={props?.formData?.image} onChange={props?.onChangeImage}  hidden/>}
            <div>
         {props?.formData?.image ? 
         <img src={props?.formData?.image} alt="" className='w-[150px] h-[148px] object-cover'/>
         : <Button onClick={() => ref.current?.click()} className='!text-neavyBlue !bg-whiteColor !border-0'>
            <FileAddOutlined size="large" />
            <br/>
            {texts.commonTexts.addImage}
            </Button>}
            </div>
        </div>
        <div>
      { props?.formData?.image ?<> <input accept="image/*" name='image' ref={ref1} type='file' value={''} onChange={props?.onChangeImage}  hidden/>
            <Button onClick={() => ref1.current?.click()} className=' !bg-neavyBlue !text-lightBlue '>{texts.commonTexts.updateImage}</Button> </>: null}
        </div>
        </div>
        <Typography className='!text-redColor'>{props?.errors?.image}</Typography>
        <div className='flex flex-col gap-[15px] items-center justify-center w-full mt-3'>
               <InputField
               type='text'
               value={props?.formData?.name}
               onChange={props?.handleChange}
               heading={texts.commonTexts.productName}
               placeHolder={texts.commonTexts.enterProductName}
               name='name'
               errors={props?.errors?.name}
               />
                  <InputField
               type='text'
               value={props?.formData?.category}
               onChange={props?.handleChange}
               name={'category'}
               heading={texts.commonTexts.productCategory}
               placeHolder={texts.commonTexts.enterProductCategory}
               errors={props?.errors?.category}
               />
                <InputField
               type='number'
               value={props?.formData?.price}
               onChange={props?.handleChange}
               name={'price'}
               heading={texts.commonTexts.productPrice}
               placeHolder={texts.commonTexts.enterProductPrice}
               errors={props?.errors?.price}
               />
                 <InputField
               type='number'
               value={props?.formData?.discountPrice}
               onChange={props?.handleChange}
               name={'discountPrice'}
               heading={texts.commonTexts.productDiscountPrice}
               placeHolder={texts.commonTexts.enterProductDiscountPrice}
               errors={props?.errors?.discountPrice}
               />
                <TextAreaField
                value={props?.formData?.description}
                onChange={props?.handleChange}
                name="description"
                heading={texts.commonTexts.productDiscription}
                placeHolder={texts.commonTexts.enterProductDiscription}
               errors={props?.errors?.description}
                />
                <div className=' w-full flex items-center justify-end gap-[10px]'>
                    <Button htmlType='submit' className=' !bg-neavyBlue !text-lightBrwone !border-none'>
                        {texts.commonTexts.save}
                    </Button>
                    <Button htmlType='reset' className=' !text-neavyBlue !bg-lightBrwone !border-none'
                    onClick={props?.onCancle}>
                        {texts.commonTexts.cancel}
                    </Button>
                </div>
        </div>
        </form>
    </div>
    </Modal>
)
}
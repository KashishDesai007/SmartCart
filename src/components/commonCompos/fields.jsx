import { Input, Typography } from "antd";
import React from "react";
import { EyeInvisibleOutlined , EyeOutlined} from '@ant-design/icons'


export function InputField (props) {
    return (
               <div className='w-full'>
                    <Typography className="text-[16px] !text-neavyBlue">{props?.heading}</Typography>
                <Input
                type={props?.type}
                size="large"
                value={props?.value}
                onChange={props?.onChange}
                placeholder={props?.placeHolder}
                name={props?.name}
                addonBefore={props?.showPassword && props?.addon ?<EyeOutlined onClick={props?.handleShowPssword} className=" cursor-pointer"/>: props?.addon ? <EyeInvisibleOutlined onClick={props?.handleShowPssword} className="cursor-pointer"/>: null}
                />
                <Typography className='!text-redColor'>{props?.errors}</Typography>
                </div>
    )
}

export default function TextAreaField (props) {
    const {TextArea} = Input
    return(
        <div className='w-full'>
        <Typography className="text-[16px] !text-neavyBlue ">{props?.heading}</Typography>
        <TextArea
    rows={4}
    size="large"
    value={props?.value}
    onChange={props?.onChange}
    name={props?.name}
    placeholder={props?.placeHolder}
    />
    <Typography className='!text-redColor'>{props?.errors}</Typography>
    </div>
    )
}
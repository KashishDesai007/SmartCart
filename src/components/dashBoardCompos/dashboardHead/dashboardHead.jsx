import { Button, Typography } from "antd";
import React from "react";
import texts from "../../../assests/commonTexts/commonTexts.json"

export default function DashbordHead (props){

    return(
        <div className=" flex flex-col gap-2 w-[100%]">
            <div className="flex items-center justify-between w-full !bg-whiteColor p-[7px] rounded-[5px] mt-[25px]">
            <Typography className="!text-neavyBlue !text-[24px] font-bold">{texts.commonTexts.dashboard}</Typography>
            <Button onClick={props?.handleAddProduct} className=" !h-[45px] !bg-neavyBlue !text-lightBrwone !text-[18px] !font-bold min-h-max max-h-max"> + {texts.commonTexts.addProduct}</Button>
            </div>
            <div className=" flex items-center justify-center gap-[10px] max-[800px]:flex-wrap">
                <div className=" w-full !bg-lightBrwone p-[10px] rounded-[8px] flex items-center justify-start gap-[10px]">
                    <div>
                        <Typography className="!text-whiteColor !text-[18px] font-semibold">{texts.commonTexts.totalProducts}</Typography>
                        <Typography className="!text-whiteColor !text-[18px] font-semibold" >{props?.totalProducts}</Typography>
                    </div>
                    <img src={require('../../../assests/images/icons/product.png')} alt="products" className=" w-[35px] ml-auto" />
                </div>
                <div className=" w-full !bg-goldenBrown p-[10px] rounded-[8px] flex items-center justify-start gap-[10px]">
                    <div>
                        <Typography className="!text-whiteColor !text-[18px] font-semibold">{texts.commonTexts.personalDetails}</Typography>
                        <Typography className="!text-whiteColor !text-[18px]"><b>{texts.commonTexts.emailid}</b> :- {props?.authData?.emailId}</Typography>
                    </div>
                    <img src={require('../../../assests/images/icons/person.png')} alt="products" className=" w-[35px] ml-auto" />
                </div>
                <div className=" w-full !bg-fadedBlackColor p-[10px] rounded-[8px] flex items-center justify-start gap-[10px]">
                    <div>
                        <Typography className="!text-whiteColor !text-[18px] font-semibold">{texts.commonTexts.activeProducts}</Typography>
                        <Typography className="!text-whiteColor !text-[18px] font-semibold" >{props?.activeProducts}</Typography>
                    </div>
                    <img src={require('../../../assests/images/icons/active.png')} alt="products" className=" w-[35px] ml-auto" />
                </div>
            </div>
        </div>
    )
} 
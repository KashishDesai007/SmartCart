import { Modal, Typography } from "antd";
import React from "react";
import { commonColors } from "../../../assests/colors/colors";
import "./productDetail.css";
import texts from "../../../assests/commonTexts/commonTexts.json"
export default function ProductDetail (props) {
    return(
        <Modal
        open={props?.open}
        onCancel={props?.handleClose}
        footer={null}
        styles={{
            body: { backgroundColor: commonColors.yellowColor},
              }}
        >
            <div>
                <img src={props?.selectedProduct?.image?.length > 0? props?.selectedProduct?.image: require("../../../assests/images/icons/product.avif")} alt="" className=" !bg-whiteColor m-auto max-w-[300px] min-h-[200px]  max-h-[300px] object-cover border-2 border-lightBrwone rounded-[7px]"/>
                <Typography className="!text-neavyBlue !text-[21px] mt-[8px]"><b>{texts.commonTexts.name} :-</b> {props?.selectedProduct?.name}</Typography>
                <Typography className="!text-neavyBlue !text-[21px]"><b>{texts.commonTexts.category} :-</b> {props?.selectedProduct?.category}</Typography>
                <Typography className="!text-neavyBlue !text-[21px]"><b>{texts.commonTexts.price} :-</b> {props?.selectedProduct?.price}</Typography>
                <Typography className="!text-neavyBlue !text-[21px]"><b>{texts.commonTexts.discountedPrice}:-</b> {props?.selectedProduct?.discountedPrice}</Typography>
                <Typography className="!text-neavyBlue !text-[21px]"><b>{texts.commonTexts.discription} :-</b> {props?.selectedProduct?.description}</Typography>
                <Typography className="!text-neavyBlue !text-[21px]"><b>{texts.commonTexts.status} :-</b> {props?.selectedProduct?.status? "Active" : "Diactivate"}</Typography>
            </div>
        </Modal>
    )
}
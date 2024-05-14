import React from "react";
import { Button } from "antd";
import { InputField } from "../../commonCompos/fields";
import texts from "../../../assests/commonTexts/commonTexts.json"

export default function SignInCompo ({values, handleChange, errors, showPassword, handleShowPssword, handleSignUp}) {
    return (
        <div className=" flex flex-col gap-[15px]">
                <InputField 
                    value={values?.emailId}
               onChange={handleChange}
               heading={texts.commonTexts.emailid}
               placeHolder={texts.commonTexts.enterYourEmailid}
               name='emailId'
               errors={errors?.emailId}
                    />
                <InputField
                 type={showPassword ? "text":"password"}
                 value={values.password}
                 onChange={handleChange}
                 addon={true}
                 name="password"
               heading={texts.commonTexts.password}
               placeHolder={texts.commonTexts.enterYourPassword}
               errors={errors?.password}
               showPassword={showPassword}
               handleShowPssword={handleShowPssword}
                    />
                        {/* <Typography className=" text-right !text-[14px] !text-neavyBlue">{texts.commonTexts.forgotPassword} ?</Typography> */}
                    <div className="flex items-center justify-center gap-[10px]">
                        <Button htmlType="submit" className=" !bg-neavyBlue !text-lightBrwone">
                            {texts.commonTexts.login}
                        </Button>
                        <Button onClick={handleSignUp} type="text" className="!bg-lightBrwone !text-neavyBlue !border-none">
                            {texts.commonTexts.signup}
                        </Button>
                    </div>
                </div>
    )
}
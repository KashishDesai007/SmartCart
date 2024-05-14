import React from "react";
import { InputField } from "../commonCompos/fields";
import texts from "../../assests/commonTexts/commonTexts.json";
import { Button } from "antd";

export default function SignupCompo ({values, handleChange, errors, showPassword, handleSignUp, handleShowPssword }) {
    return (
        <div className=" flex flex-col gap-[15px]">
                    <InputField 
                    type='text'
                    value={values?.fullName}
               onChange={handleChange}
               heading={texts.commonTexts.fullname}
               placeHolder={texts.commonTexts.enterYourFullname}
               name='fullName'
               errors={errors?.fullname}
                    />
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
                    <InputField
                 type="password"
                 value={values.confirmPassword}
                 onChange={handleChange}
                 name="confirmPassword"
               heading={texts.commonTexts.confirmPassword}
               placeHolder={texts.commonTexts.EnterConfirmPassword}
               errors={errors?.confirmPassword}
                    />
                      <div className="flex items-center justify-center gap-[10px]">
                        <Button htmlType="submit" className=" !bg-neavyBlue !text-lightBrwone">
                            {texts.commonTexts.submit}
                        </Button>
                        <Button onClick={handleSignUp} type="text" className="!bg-lightBrwone !text-neavyBlue !border-none">
                            {texts.commonTexts.login}
                        </Button>
                        </div>
                 </div>
    )
}
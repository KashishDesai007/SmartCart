import { Avatar, Button, Typography, Menu, Popover, Drawer } from "antd"
import React, {useState} from "react"
import {DownOutlined, LogoutOutlined, MenuOutlined, AppstoreOutlined, MailOutlined, SettingOutlined} from "@ant-design/icons"
import texts from "../../assests/commonTexts/commonTexts.json"
import Cookies from "universal-cookie"
import { useNavigate } from "react-router"

export default function HeaderCompo (props) {
  const cookies = new Cookies()
  const naviagte = useNavigate()

  const handleLogout = () => {
      cookies.remove('user')
      naviagte('/login')
  }
    const [openMenu, setOpenMenu] = useState(false)
    const [openDrawer, setOpenDrawer] = useState(false)
        const handleOpenMenu = () => {
          setOpenMenu(!openMenu)
        }
        const handleOpenDrawer = ( )=> {
          setOpenDrawer(!openDrawer)
        }

return(
    <div className="fixed flex items-center justify-center bg-neavyBlue w-full h-[55px] p-[10px] !z-[1000] ">
      <Button className=" !border-none !bg-neavyBlue !text-lightBrwone" onClick={handleOpenDrawer}>
      <MenuOutlined />
      </Button>
        <div className="flex items-center justify-between gap-[3px] mr-auto">
            <img src={require('../../assests/images/icons/cart.png')} alt="" className="w-[35px]"/>
            <Typography className="!text-goldenBrown font-bold">{texts.commonTexts.smartCart}</Typography>
        </div>
        <div className="flex items-center justify-between gap-[3px] cursor-pointer" onClick={handleOpenMenu}>
            <Avatar src={require('../../assests/images/icons/avatar.png')} alt="" className="w-[45px]"/>
            <Typography className="!text-goldenBrown font-bold" >{props?.authData?.fullName}</Typography>
        </div>
        <Drawer className="!bg-neavyBlue !h-[100%]" width='20%'  placement="left" onClose={handleOpenDrawer} open={openDrawer} closable={false}>
          <Typography className="!text-lightBrwone !text-[24px] font-bold mb-[5%]">{texts.commonTexts.smartCart}</Typography>
          <div className="!bg-lightBrwone p-[10px] rounded-[8px] cursor-pointer">
            <Typography className=" !text-[24px]">{texts.commonTexts.dashboard}</Typography>
          </div>
          <div onClick={handleLogout} className=" flex gap-3 !bg-lightBrwone p-[10px] rounded-[8px] !mt-[63vh] cursor-pointer">
            <LogoutOutlined/>
            <Typography>{texts.commonTexts.logout}</Typography>
          </div>
      </Drawer>
    </div>
)
}
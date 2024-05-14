import { Card, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { formValidtions, addUserValidation } from "../utils/validations";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, fetchUsers, handleAuthUser } from "../store/authSlice";
import texts from "../assests/commonTexts/commonTexts.json";
import SignInCompo from "../components/authCompos/siginCompo/siginCompo";
import SignupCompo from "../components/authCompos/signupCompo";
import Cookies from "universal-cookie";

export default function AuthPage () {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)
    const [createUser, setCreateUser] = useState(false);
    const users = useSelector(state => state.auth?.allUsers)
    const dispatch = useDispatch()
    const cookies = new Cookies()
    const signInData = {
        emailId:'',
        password:'',
    }

    const signUpData = {
        fullName: '',
        emailId:'',
        password:'',
        confirmPassword: '',
    }

    const idb =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

const insertDataInIndexedDb = () => {
  //check for support
  if (!idb) {
    console.log("This browser doesn't support IndexedDB");
    return;
  }

  const request = idb.open("smartCart", 1);

  request.onerror = function (event) {
    console.error("An error occurred with IndexedDB");
    console.error(event);
  };

  request.onupgradeneeded = function (event) {
    console.log(event);
    const db = request.result;

    if (!db.objectStoreNames.contains("userData")) {
      const objectStore = db.createObjectStore("userData", { keyPath: "id" });
    }
  };

  request.onsuccess = function () {
    console.log("Database opened successfully");

    const db = request.result;

    var tx = db.transaction("userData", "readwrite");
    var userData = tx.objectStore("userData");
    const users = userData.getAll()
            console.log("users----->", users)
             users.onsuccess = async (query) => {
                if(query.srcElement.result?.length < 1) {
                    dispatch(fetchUsers(query.srcElement.result))
                 setCreateUser(true)
                } else {
                // setUsersData(query.srcElement.result);
               dispatch(fetchUsers(query.srcElement.result))
                    setCreateUser(false)
                }
            };
            users.onerror = () => {
                console.log("error----")
            }
            tx.oncomplete = () => {
                db.close()
            }

    return tx.complete;
  };
};
    const handleDatainIndexDB = (values) => {
        console.log("values--->", values)
  const dbPromise = idb.open("smartCart", 1);

        dbPromise.onsuccess = () => {
            const db = dbPromise.result
            console.log('db--->', db)
            const tx = db.transaction('userData', 'readwrite')
            console.log('tx--->', tx)
            const userData = tx.objectStore('userData')
        if (createUser) {
            const userDetails = {
                id: Math.random() * 15,
                products : [],
                ...values
            }
            console.log("userData--->", userDetails)
            const users = userData.put(userDetails)
            users.onsuccess = () => {
                tx.oncomplete = () => {
                    dispatch(addUser(userDetails))
                    setCreateUser(false)
                    db.close()
                }
                alert("userAdded")
            }
            users.onerror = () => {
                console.log("error----")
            }
        } else {
            const user = users.find((usr, index) => usr?.emailId === values?.emailId)
            if(user?.emailId === values?.emailId && user?.password === values?.password) {
                dispatch(handleAuthUser(user))
                cookies.set('user', `${Math.random() + user?.id + 'prdctAbc'}`, {path :"/"})
                navigate('/')
            } else if(user === undefined){
                alert('No user found')
            } else {
                alert('Password does not matched with emailid.')
            }
            }
        }
        dbPromise.onerror = () => {
        console.log("error--->")
        }
    }

    const {handleSubmit,handleChange ,values, errors} = useFormik({
        initialValues: createUser ? signUpData : signInData,
        validationSchema: createUser ? addUserValidation: formValidtions,
        onSubmit:(values, {resetForm}) => {
            handleDatainIndexDB(values)
            resetForm()
        }
    })

    const handleSignUp = () => {
        setCreateUser(!createUser)
    }

   const handleShowPssword = () => {
        setShowPassword(!showPassword)
    }
  
  useEffect(() => {
    insertDataInIndexedDb()
    if (cookies.get('user')){
        navigate("/")
      }
  },[])

return (
    <div className="flex items-center justify-center h-[100%] !bg-neavyBlue">
        <Card className=" flex flex-col shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] !bg-lightBrwone text-goldenBrown w-[100%] max-w-[400px]" >
                <Typography className="text-center !text-[24px] font-bold">
                  {texts.commonTexts.signInPlaeas}
                </Typography>
                <form onSubmit={handleSubmit}>
                {!createUser ?
            <SignInCompo
            values={values}
            handleChange={handleChange}
            errors={errors}
            showPassword={showPassword}
            handleShowPssword={handleShowPssword}
            handleSignUp={handleSignUp}
            />
                 : 
                 <SignupCompo
                 values={values}
                 handleChange={handleChange}
                 errors={errors}
                 showPassword={showPassword}
                 handleSignUp={handleSignUp}
                 handleShowPssword={handleShowPssword}
                 />
                 }
                    </form>
        </Card>
    </div>
)
}
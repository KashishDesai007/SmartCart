import * as Yup from 'yup'

export const formValidtions = Yup.object({
    emailId : Yup.string().email('Your emailId is not correct').required('Please enter Your EmailId'),
    password: Yup.string().required('No password provided.') 
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, 'Password should have uppercase, lowercase and specialcharacter.'),
})

export const addUserValidation= Yup.object({
    fullName : Yup.string().required('Please enter Your fullname'),
    emailId : Yup.string().email('Your emailId is not correct').required('Please enter Your EmailId'),
    password: Yup.string().required('No password provided.') 
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, 'Password should have uppercase, lowercase and specialcharacter.'), 
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Please enter confirmpassword'),
})

export const addProductsValidation = Yup.object({
    name:Yup.string().required('Name is required.'),
    image: Yup.string().required('Image is required.'),
    category: Yup.string().required('Category is required.'),
    price: Yup.string().required('Price is required.'),
    discountPrice: Yup.string().required('Discounted price is required.'),
    description: Yup.string().min(7).required('Description is required'),
})
import * as yup from "yup";
export const loginValidationSchema = yup.object({
  phone: yup.string().required("Phone no is required !"),
  password: yup.string().required("plaese Enter A password !"),
  country_code: yup.string().required("please select Country code !"),
});
export const BankTransferValidationSchema = yup.object({
  bankname: yup.string().required("Bank Name is required"),
  accountnumber: yup.string().required("Account Number is required"),
  ifsccode: yup.string().required("IFSC is required"),
  accountholdername: yup.string().required("Account Holder Name is required"),
});
export const PaytmTransferValidationSchema = yup.object({
  name: yup.string().required("Name is required"),
  paytmnumber: yup.string().required("Paytm Number is required"),
});

export const GooglePayTransferValidationSchema = yup.object({
  name: yup.string().required("Name is required"),
  googlepaynumber: yup.string().required("Google Pay Number is required"),
});
export const PhonePayTransferValidationSchema = yup.object({
  name: yup.string().required("Name is required"),
  phonepenumber: yup.string().required("Phone Pe Number is required"),
});

export const UpiTransferValidationSchema = yup.object({
  name: yup.string().required("Name is required"),
  upiId: yup.string().required("UPI ID is required"),
});
export const HawalaTransferValidationSchema = yup.object({
  hawala_value: yup.string().required("Hawala Selection is required."),

  fullName: yup.string().required("Full name is required."),
  phoneNumber: yup.string().required("Phone number is required."),
  city: yup.string().required("City name is required."),
});

export const RegistationValidationSchema = yup.object({
  name: yup.string().required("Name is required !"),
  email: yup
    .string()
    .email("Invalid Email")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email address"
    )
    .required("Email is Required !"),
  country_code: yup.string().required("please select Country code"),

  phone: yup.string().required('Phone No is required !'),
  password: yup.string()
  .min(6, 'Password must be at least 6 characters')
  .max(24, 'Password can be maximum 24 characters')
  .required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords not match'),
})
export const DepositeAmountValidationSchema = yup.object({
  amount: yup
    .number()
    .required("Coins is Required")
    .max(10000000, "To big")
    .min(10, "To small")
    .min(0, "Not negative number"),
});
export const withdraweAmountValidationSchema = yup.object({
  withdraw_amount: yup
    .number()
    .required("Coins is Required")
    .max(10000000, "To big")
    .min(10, "To small")
    .min(0, "Not negative number"),
});

export const ForgotPasswordValidationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid Email")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email address"
    )
    .required("Email is required !"),

  password: yup.string().min(8, "Password must be 8 character").required("Password is Required"),

  confirm_password: yup.string().required("please add confrim password"),
});

export const ThridPartyValidation = yup.object({
  id: yup.string().required("Id is Required"),

  amount: yup
    .number()
    .required("Amount is Required")
    .max(10000000, "To big")
    .min(10, "To small")
    .min(0, "Not negative number"),
});
export const ChangePasswordValidationSchema = yup.object({
  password: yup.string().required("please Enter password!"),
  confirm_password: yup.string().required("please Enter confrim password"),
});

import type { E164Number } from "libphonenumber-js/core";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { nodeApi } from "@/services/api";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import RegisterImage from "/images/register.svg";
import { nodeURL, postData } from "@/Utility/apiFuntion";
import CustomButton from "@/components/Buttons/CustomButton";
import PasswordStrength, {
  type Rule,
  type StrengthLevel,
} from "@/components/common/PasswordStrength";

const formSchema = z
  .object({
    username: z
      .string()
      .min(2, "Type at least 2 character")
      .max(50, "Too long"),
    firstname: z.string().min(2, "Type at least 2 character"),
    lastname: z.string().min(2, "Type at least 2 character"),
    email: z.email("Type valid email"),
    phone_number: z.string().min(11, "Please enter at least 11 digits"),
    password: z
      .string()
      .min(8)
      .regex(/[A-Z]/)
      .regex(/[a-z]/)
      .regex(/[0-9]/)
      .regex(/[^A-Za-z0-9]/),
    confirm: z.string().min(8, "Type at least 8 character"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [strength, setStrength] = useState<StrengthLevel>(0);
  const [rules, setRules] = useState<Rule>({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });
  /** Define form */
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      phone_number: "",
      password: "",
      confirm: "",
    },
  });

  /** SignUp function */
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const isAllRulesTrue = Object.values(rules).every((r) => r === true);
    if (isAllRulesTrue) setStrength(0);

    const info = {
      user_type: "person",
      user_name: values.username,
      email_address: values.email,
      first_name: values.firstname,
      last_name: values.lastname,
      password: values.password,
      phone_number: values.phone_number,
    };
    const params = {
      baseURL: nodeURL,
      url: nodeApi.User + "/register",
      setLoading: setIsLoading,
      payload: info,
      isToast: true,
      isConsole: true,
    };
    const res = await postData(params);
    if (res?.status === 201) {
      navigate("/login");
    }
    form.reset();
  };

  /** Check Password Strength */
  const checkStrength = (value: string) => {
    let score = 0;

    const rules = {
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /[0-9]/.test(value),
      specialChar: /[^A-Za-z0-9]/.test(value),
    };

    Object.values(rules).forEach((rule) => {
      if (rule) score++;
    });

    setStrength(score as StrengthLevel);
    setRules(rules);
  };

  const handleShowPassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };
  const handleShowConfirmPassword = () => {
    if (showConfirmPassword) {
      setShowConfirmPassword(false);
    } else {
      setShowConfirmPassword(true);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center p-4">
      <div className="w-[50%] h-full">
        <img src={RegisterImage} className="w-full h-full" />
      </div>

      <div className="flex flex-col gap-4 w-[50%] h-full justify-center items-center">
        <h3 className="font-bold text-lg">Create an account</h3>
        <div className="max-h-[80vh] overflow-y-auto px-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-3 justify-between">
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            className="w-full"
                            placeholder="first name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            className="w-full"
                            placeholder="last name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone number</FormLabel>
                      <FormControl>
                        <PhoneInput
                          international
                          defaultCountry="BD"
                          placeholder="Enter phone number"
                          {...field}
                          value={field.value as E164Number | undefined}
                          onChange={(value) => field.onChange(value)}
                          className="w-full border rounded-md p-2 focus:outline-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3 justify-between">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <button
                                type="button"
                                onClick={handleShowPassword}
                                className="absolute right-4 top-2 cursor-pointer"
                              >
                                {showPassword ? (
                                  <EyeOffIcon size={20} color="#6b7280" />
                                ) : (
                                  <EyeIcon size={20} color="#6b7280" />
                                )}
                              </button>
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="*********"
                                {...field}
                                onInput={(e) => {
                                  const input = e.target as HTMLInputElement;
                                  checkStrength(input.value);
                                }}
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirm"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <button
                                type="button"
                                onClick={handleShowConfirmPassword}
                                className="absolute right-4 top-2 cursor-pointer"
                              >
                                {showConfirmPassword ? (
                                  <EyeOffIcon size={20} color="#6b7280" />
                                ) : (
                                  <EyeIcon size={20} color="#6b7280" />
                                )}
                              </button>
                              <Input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="*********"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <PasswordStrength strength={strength} rules={rules} />
                </div>
              </div>
              <CustomButton
                type="submit"
                name="Register"
                styleType="full"
                disabled={isLoading}
                isLoading={isLoading}
              />
            </form>
          </Form>
        </div>
        <p>
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-blue-600 font-bold hover:cursor-pointer underline-offset-4 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
      {/* <Card className="w-full max-w-md mx-auto max-h-[90vh] overflow-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Registration</CardTitle>
        </CardHeader>
        <CardContent>
          
        </CardContent>
        <CardFooter className="flex-col">
          
        </CardFooter>
      </Card> */}
    </div>
  );
};
export default SignUp;

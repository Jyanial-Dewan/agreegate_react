import { Input } from "@/components/ui/input";
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
import { useAuthContext } from "@/context/AuthContext/useContext";
import { EyeIcon, EyeOffIcon, LockKeyhole } from "lucide-react";
import { nodeURL, postData } from "@/Utility/apiFuntion";
import CustomButton from "@/components/Buttons/CustomButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Rule, StrengthLevel } from "@/components/common/PasswordStrength";
import PasswordStrength from "@/components/common/PasswordStrength";

const formSchema = z
  .object({
    old_password: z.string().min(8, "Type at least 8 character"),
    new_password: z
      .string()
      .min(8)
      .regex(/[A-Z]/)
      .regex(/[a-z]/)
      .regex(/[0-9]/)
      .regex(/[^A-Za-z0-9]/),
    confirm: z.string().min(8, "Type at least 8 character"),
  })
  .refine((data) => data.new_password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });
const ChangePassword = () => {
  const { token } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
      old_password: "",
      new_password: "",
      confirm: "",
    },
  });
  /** Update function */
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const isAllRulesTrue = Object.values(rules).every((r) => r === true);
    if (isAllRulesTrue) setStrength(0);

    const info = {
      old_password: values.old_password,
      new_password: values.new_password,
    };

    const putParams = {
      baseURL: nodeURL,
      url: `${nodeApi.User}/change_password/${token?.user_id}`,
      setLoading: setIsLoading,
      payload: info,
      isToast: true,
    };
    const res = await postData(putParams);
    if (res?.status === 200) {
      form.reset();
    }
  };
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

  const handleShowOldPassword = () => {
    if (showOldPassword) {
      setShowOldPassword(false);
    } else {
      setShowOldPassword(true);
    }
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
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <div className="rounded-full p-2 bg-NAVY-100 flex justify-center items-center">
              <LockKeyhole size={24} color="blue" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-base font-semibold">Change Password</p>
              <p className="text-[13px] font-normal">
                Update your account password.
              </p>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="old_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-gray-500 font-normal">
                      Current Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={handleShowOldPassword}
                          className="absolute right-4 top-2 cursor-pointer"
                        >
                          {showOldPassword ? (
                            <EyeOffIcon size={20} color="#6b7280" />
                          ) : (
                            <EyeIcon size={20} color="#6b7280" />
                          )}
                        </button>
                        <Input
                          className="bg-[#F6F7FB]"
                          type={showOldPassword ? "text" : "password"}
                          placeholder="Enter your current password"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="new_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-gray-500 font-normal">
                      New Password
                    </FormLabel>
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
                          className="bg-[#F6F7FB]"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your new password"
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
              <PasswordStrength rules={rules} strength={strength} />
              {/* {strength > 0 && (
                <>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center font-semibold">
                      <h2>Password Strength</h2>
                      <p style={{ color: strengthColor[strength] }}>
                        {getStrengthLabel(strength)}
                      </p>
                    </div>
                    {strength > 0 && (
                      <div
                        style={{
                          backgroundColor: strengthColor[strength],
                          width: `${(strength / 5) * 100}%`,
                        }}
                        className="h-2 bg-red-400 rounded-full ${strength?"
                      />
                    )}
                  </div>
                  <div className="bg-[#F6F7FB] p-3 mt-3 rounded-xl">
                    <div>
                      <h2 className="font-semibold">Password Requirement</h2>
                      <div className="grid grid-cols-2">
                        <div className="flex gap-1 items-center mt-2">
                          {rules.length ? (
                            <Check color="green" size={20} />
                          ) : (
                            <X color="red" size={20} />
                          )}
                          <span
                            className={rules.length ? "text-green-800" : ""}
                          >
                            At least 8 Characters
                          </span>
                        </div>
                        <div className="flex gap-1 items-center mt-2">
                          {rules.lowercase ? (
                            <Check color="green" size={20} />
                          ) : (
                            <X color="red" size={20} />
                          )}
                          <span
                            className={rules.lowercase ? "text-green-800" : ""}
                          >
                            Contains lowercase letter
                          </span>
                        </div>
                        <div className="flex gap-1 items-center mt-2">
                          {rules.specialChar ? (
                            <Check color="green" size={20} />
                          ) : (
                            <X color="red" size={20} />
                          )}
                          <span
                            className={
                              rules.specialChar ? "text-green-800" : ""
                            }
                          >
                            Contains special character
                          </span>
                        </div>
                        <div className="flex gap-1 items-center mt-2">
                          {rules.uppercase ? (
                            <Check color="green" size={20} />
                          ) : (
                            <X color="red" size={20} />
                          )}
                          <span
                            className={rules.uppercase ? "text-green-800" : ""}
                          >
                            Contains uppercase letter
                          </span>
                        </div>
                        <div className="flex gap-1 items-center mt-2">
                          {rules.number ? (
                            <Check color="green" size={20} />
                          ) : (
                            <X color="red" size={20} />
                          )}
                          <span
                            className={rules.number ? "text-green-800" : ""}
                          >
                            Contains number
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )} */}
              <FormField
                control={form.control}
                name="confirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-gray-500 font-normal">
                      Confirm Password
                    </FormLabel>
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
                          className="bg-[#F6F7FB]"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Enter your confirm password"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end mt-11">
              <CustomButton
                styleType="rectangular"
                type="submit"
                name="update"
                disabled={isLoading}
                isLoading={isLoading}
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ChangePassword;

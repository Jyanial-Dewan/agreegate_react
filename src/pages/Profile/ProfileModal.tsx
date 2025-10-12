import type { E164Number } from "libphonenumber-js/core";
import { Button } from "@/components/ui/button";
import PhoneInput from "react-phone-number-input";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { useGlobalContext } from "@/context/GlobalContext/useGlobalContext";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { nodeURL, putData } from "@/Utility/apiFuntion";
import { nodeApi } from "@/services/api";
import { useAuthContext } from "@/context/AuthContext/useContext";
import Loader from "@/components/common/Loader";
import { DialogDescription } from "@radix-ui/react-dialog";

const formSchema = z.object({
  username: z.string().min(2, "Too short").max(50, "Too long"),
  firstname: z.string().min(2, "Too short"),
  lastname: z.string().min(2, "Too short"),
  email: z.email("Type valid email"),
  phone_number: z.string().min(11, "Please enter at least 11 digits"),
});

const ProfileModal = () => {
  const { token } = useAuthContext();
  const { user, setUser } = useGlobalContext();
  const [isUpdating, setIsUpdating] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      // password: "",
      // confirm: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        username: user?.user_name,
        firstname: user?.first_name,
        lastname: user?.last_name,
        email: user?.email_address,
        phone_number: user?.phone_number,
        // confirm: "",
      });
    }
  }, [user, form]);

  /** Update function */
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const info = {
      user_type: "person",
      user_name: values.username,
      email_address: values.email,
      first_name: values.firstname,
      last_name: values.lastname,
      phone_number: values.phone_number,
    };

    const putParams = {
      baseURL: nodeURL,
      url: nodeApi.User + "/" + token?.user_id,
      setLoading: setIsUpdating,
      payload: info,
      isToast: true,
    };
    const res = await putData(putParams);
    if (res?.status === 200) {
      form.reset({
        username: res.data.result.user_name,
        firstname: res.data.result.first_name,
        lastname: res.data.result.last_name,
        email: res.data.result.email_address,
        phone_number: res.data.result.phone_number,
      });
      console.log(res.data, "sdfds");
      setUser(res.data.result);
      setOpenModal(false);
    }
  };
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <button
          onClick={() => setOpenModal(true)}
          className="p-2 rounded-lg bg-client-primary cursor-pointer"
        >
          <Pencil size={15} color="white" />
        </button>
      </DialogTrigger>
      <DialogContent className="w-1/2">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="first name" {...field} />
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
                      <Input placeholder="last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        value={field.value as E164Number}
                        onChange={(value) => field.onChange(value)}
                        className="w-full border rounded-md p-2 focus:outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <div className="flex gap-3">
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
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
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
                </div> */}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                type="submit"
                className="cursor-pointer self-center"
                disabled={isUpdating}
              >
                {isUpdating ? <Loader color="white" /> : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;

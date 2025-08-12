import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import z from "zod";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import Password from "@/components/ui/password";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const loginValidationSchema = z
  .object({
    email: z.email("Input must be email type"),
    password: z
      .string()
      .min(2, { error: "Password must be at least 6 digit long" }),
    confirmPassword: z
      .string()
      .min(2, { error: "Password must be at least 6 digit long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    error: "Password do not matched",
  });

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [login] = useLoginMutation();
  const onsubmit = async (data: z.infer<typeof loginValidationSchema>) => {
    const loginInfo = {
      email: data.email,
      password: data.password,
    };
    try {
      const result = await login(loginInfo).unwrap();
      toast.success("User login successfully");

      console.log(result);
    } catch (error) {
      toast.error(error.data.message)
      console.log(error.data.message);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6 justify-center w-full lg:w-1/2 p-5",
        className
      )}
      {...props}
    >
      <Card className="overflow-hidden p-0 border-0 rounded-md">
        <CardContent className="grid p-0 md:grid-cols-2 ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onsubmit)}
              className="p-6 md:p-8 order-2"
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Login</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to Tour Management System
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Password {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Password {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Login
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Button variant="outline" type="button" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="sr-only">Login with Google</span>
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Have not account? <Link to={"/register"}>Register</Link>
                </div>
              </div>
            </form>
          </Form>
          <div className="bg-muted relative hidden md:block order-2">
            <img
              src="/src/assets/images/login_bg.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

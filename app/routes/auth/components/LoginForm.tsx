import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { useForm } from "react-hook-form";
import { authClient } from "~/lib/auth.client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  username: z.string().min(1, "Name is required"),
});

type AuthFormValues = z.infer<typeof authSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const formMethods = useForm<AuthFormValues>();

  async function onSubmit(data: AuthFormValues) {
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.username,
      },
      {
        onRequest: (ctx) => {
          console.log("Requesting sign up with data:", ctx);
        },
        onSuccess: (ctx) => {
          console.log("Sign up successful:", ctx);
        },
        onError: (ctx) => {
          alert(ctx.error);
        },
      }
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <FormField
                    name="username"
                    control={formMethods.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="username"
                            type="text"
                            placeholder="config developer"
                            required
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    name="email"
                    control={formMethods.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email">Username</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    name="password"
                    control={formMethods.control}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel htmlFor="email">Password</FormLabel>
                          <a
                            href="#"
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                          >
                            Forgot your password?
                          </a>
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            id="password"
                            type="password"
                            required
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
                {/*<Button variant="outline" className="w-full">
                Login with Google
              </Button>*/}
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

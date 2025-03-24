"use client";

import React, { useState } from "react";
import { Button, Input, Checkbox, Link, Form, Divider, addToast } from "@heroui/react";

import { Icon } from "@iconify/react";

export default function LoginComponent() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://zone01normandie.org/api/auth/signin",
        {
          method: "POST",
          headers: {
            Authorization: "Basic " + btoa(email + ":" + password),
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        document.cookie = `session=${data}; path=/;`;
        addToast({
          title: "Success",
          description: "Login successfully.",
          color: "success",
        });
        setTimeout(() => {
          window.location.href = "/dashboard";
        }
        , 1000);
      } else {
        const errorData = await response.json();
        console.log("Error:", errorData);
        addToast({
          title: "Error",
          description: errorData.error || "An error occurred during login.",
          color: "danger",
        });
      }
    } catch (error) {
      console.log("Network error:", error);
      addToast({
        title: "Network Error",
        description: (error as Error).message || "A network error occurred.",
        color: "danger",
      });
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center px-5">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <div className="flex flex-col items-center pb-6">
          <p className="text-xl font-medium">Welcome Back</p>
          <p className="text-small text-default-500">
            Log in to your account to continue
          </p>
        </div>
        <Form
          className="flex flex-col gap-3"
          validationBehavior="native"
          onSubmit={handleSubmit}
        >
          <Input
            isRequired
            label="Email or Username"
            name="email"
            placeholder="Enter your email or username"
            type="text"
            variant="bordered"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="Password"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex w-full items-center justify-between px-1 py-2">
            <Checkbox isDisabled name="remember" size="sm">
              Remember me
            </Checkbox>
            <Link isDisabled className="text-default-500" href="#" size="sm">
              Forgot password?
            </Link>
          </div>
          <Button className="w-full" color="primary" type="submit">
            Sign In
          </Button>
        </Form>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            isDisabled
            startContent={<Icon icon="flat-color-icons:google" width={24} />}
            variant="bordered"
          >
            Continue with Google
          </Button>
          <Button
            isDisabled
            startContent={
              <Icon className="text-default-500" icon="fe:github" width={24} />
            }
            variant="bordered"
          >
            Continue with Github
          </Button>
        </div>

        <p className="text-center text-small">
          Need to create an account?&nbsp;
          <Link isDisabled href="/register" size="sm">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

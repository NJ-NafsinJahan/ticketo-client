"use client";

import Link from "next/link";

import {
  Card,
  CardHeader,
  CardContent as CardBody,
  Input,
  Button,
  Label,
  Form,
  Select,
  SelectTrigger,
  SelectValue,
  SelectIndicator,
  SelectPopover,
  ListBox,
  ListBoxItem,
} from "@heroui/react";
import { FaUser, FaEnvelope, FaLock, FaImage, FaGoogle } from "react-icons/fa";
import Logo from "@/components/Logo";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors, "from register page");
  const onSubmit = (data) => {
    console.log(data, "from Register page");
  };
  return (
    <div className="">
      <Card className="w-full max-w-lg border border-white/5 bg-slate-950/70 backdrop-blur-xl shadow-2xl p-4 mx-auto ">
        <CardHeader className="flex flex-col gap-1 items-center pb-6 text-center">
          <Logo />
          <h1 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-white via-slate-100 to-pink-500 bg-clip-text text-transparent">
            Create an Account
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Join Ticketo to book premium events or host your own organization.
          </p>
        </CardHeader>
        <CardBody className="gap-4">
          <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
            <Label htmlFor="name">Full Name</Label>
            <Input
              {...register("name", { required: "Name is required" })}
              id="name"
              placeholder="John Doe"
              labelPlacement="outside"
              startContent={<FaUser className="text-slate-400 text-sm" />}
              className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500!"
            />
            <Label htmlFor="email">Email Address</Label>
            <Input
              {...register("email", { required: "Email is required" })}
              id="email"
              placeholder="john@example.com"
              type="email"
              labelPlacement="outside"
              startContent={<FaEnvelope className="text-slate-400 text-sm" />}
              className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500!"
            />

            {/* image */}
            <Label htmlFor="image">Profile Image URL</Label>
            <Input
              {...register("image", { required: "Image is required" })}
              id="image"
              placeholder="https://example.com/avatar.jpg"
              labelPlacement="outside"
              startContent={<FaImage className="text-slate-400 text-sm" />}
              className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500!"
            />

            {/* Password */}
            <Label htmlFor="password">Password</Label>
            <Input
              {...register("password", {
                required: "Password is required",
                maxLength: 12,
                minLength: 6,
              })}
              id="password"
              placeholder="••••••••"
              type="password"
              labelPlacement="outside"
              startContent={<FaLock className="text-slate-400 text-sm" />}
              className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500!"
            />

            <div className="flex flex-col gap-2 w-full">
              {/* Role */}
              <Label
                htmlFor="role"
                className="text-sm font-semibold text-slate-300"
              >
                Select Role
              </Label>
              <Select
                {...register("role", { required: "Role is required" })}
                id="role"
                aria-label="Select Role"
                placeholder="Select Role"
                className="w-full"
              >
                <SelectTrigger className="w-full flex items-center justify-between bg-slate-900/50 border border-white/10 rounded-xl px-3 h-11 text-white text-sm">
                  <SelectValue />
                  <SelectIndicator />
                </SelectTrigger>
                <SelectPopover className="bg-slate-950 border border-white/10 rounded-xl shadow-2xl p-1 min-w-50">
                  <ListBox className="outline-none">
                    <ListBoxItem
                      key="attendee"
                      id="attendee"
                      textValue="Attendee"
                      className="p-2 text-white hover:bg-pink-500/20 rounded-lg cursor-pointer"
                    >
                      Attendee (Browse & Book Tickets)
                    </ListBoxItem>
                    <ListBoxItem
                      key="organizer"
                      id="organizer"
                      textValue="Organizer"
                      className="p-2 text-white hover:bg-pink-500/20 rounded-lg cursor-pointer"
                    >
                      Organizer (Create & Host Events)
                    </ListBoxItem>
                  </ListBox>
                </SelectPopover>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-linear-to-r from-pink-500 to-indigo-600 text-white font-bold h-12 shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20"
              radius="lg"
            >
              Create Account
            </Button>
          </Form>

          <div className="flex items-center my-4">
            <div className="grow border-t border-white/5" />
            <span className="mx-4 text-xs text-slate-500 font-semibold uppercase">
              Or Sign Up With
            </span>
            <div className="grow border-t border-white/5" />
          </div>

          <Button
            variant="bordered"
            className="w-full border-white/10 hover:bg-white/5 hover:border-white/20 text-white font-semibold h-11"
            radius="lg"
            startContent={<FaGoogle className="text-pink-500" />}
          >
            Google OAuth
          </Button>

          <p className="text-center text-sm text-slate-400 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-pink-500 hover:text-pink-400 font-semibold hover:underline"
            >
              Log In
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}

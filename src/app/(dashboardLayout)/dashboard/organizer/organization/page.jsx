"use client";

import DashboardHeading from "@/components/DashboardHeading";
import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  CardHeader,
  Input,
  Form,
  TextArea,
  Label,
} from "@heroui/react";
import { FaImage } from "react-icons/fa";
import { uploadImage } from "@/utils/uploadImage";
import { useForm } from "react-hook-form";
import { useSession } from "@/lib/auth-client";
import {
  addOrganization,
  updateOrganization,
} from "@/lib/api/organizations/action";
import toast from "react-hot-toast";
import { myOrganization } from "@/lib/api/organizations/data";

const OrganizationPage = () => {
  const { data: session } = useSession();
  const [myOrg, setMyOrg] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const setOrgData = async () => {
      if (session?.user?.email) {
        const org = await myOrganization(session?.user?.email);
        setMyOrg(org);

        if (org) {
          reset({
            organizationName: org.organizationName,
            website: org.website,
            description: org.description,
          });
        }
      }
    };
    setOrgData();
  }, [session, reset]);
  //   console.log(myOrg, "myOrg data");

  // OnSubmit
  const onOrganizationSubmit = async (data) => {
    console.log(data, "data from organization page");

    // Upload image to imgBB
    try {
      let imageUrl = myOrg?.logo || "";

      if (data.logo && data.logo[0]) {
        const imageFile = data.logo[0];
        imageUrl = await uploadImage(imageFile);
      }

      const orgData = {
        organizationName: data?.organizationName,
        logo: imageUrl,
        website: data?.website,
        description: data?.description,
        organizerEmail: session?.user?.email,
      };

      if (!myOrg) {
        const resData = await addOrganization(orgData);
        if (resData?.insertedId) {
          toast.success("Organization Profile added successfully");

          setMyOrg({ _id: resData.insertedId, ...orgData });
        } else {
          toast.error("This Organization email exists!");
        }
      } else {
        const updatedRes = await updateOrganization(orgData, myOrg?._id);
        if (updatedRes?.modifiedCount > 0) {
          toast.success("Organization Profile Updated");
          setMyOrg((prev) => ({ ...prev, ...orgData }));
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div>
      <DashboardHeading
        title="My organization Profile"
        description="Update organization logo, profile, website and description"
      />

      {/* Form */}
      <div className="mt-6 space-y-6 max-w-3xl">
        <Card
          className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-2xl"
          radius="lg"
        >
          {/* Header */}
          <CardHeader className="flex flex-col gap-1 pb-4 border-b border-white/5 p-6">
            <h3 className="text-xl font-bold text-white">
              Organization Details
            </h3>
            <p className="text-slate-400 text-xs">
              Review and edit your organization credentials.
            </p>
          </CardHeader>

          {/* Form */}
          <div className="p-6">
            <Form
              onSubmit={handleSubmit(onOrganizationSubmit)}
              className="space-y-4 w-full"
            >
              {/* organization Name */}
              <Input
                defaultValue={myOrg?.organizationName}
                {...register("organizationName", {
                  required: "Organization Name is required",
                })}
                id="organizationName"
                label="Organization Name"
                labelPlacement="outside"
                placeholder="TechEvents Corp"
                required
                className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500!"
              />
              {errors.organizationName && (
                <p className="text-red-500">
                  {errors.organizationName.message}
                </p>
              )}

              {/* image */}

              <Label htmlFor="image">Profile Image URL</Label>
              <Input
                {...register("logo", {
                  required: "Logo is required",
                })}
                type="file"
                accept="image/*"
                id="logo"
                placeholder="https://example.com/avatar.jpg"
                labelPlacement="outside"
                startContent={<FaImage className="text-slate-400 text-sm" />}
                className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500!"
              />
              {errors.logo && (
                <p className="text-red-500">{errors.logo.message}</p>
              )}

              {/* organization website */}
              <Input
                defaultValue={myOrg?.website}
                {...register("website", {
                  required: "Organization Website is required",
                })}
                id="website"
                label="Organization Website"
                labelPlacement="outside"
                placeholder="techevents.corp"
                required
                className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:border-pink-500!"
              />
              {errors.website && (
                <p className="text-red-500">{errors.website.message}</p>
              )}

              {/* description */}
              <TextArea
                defaultValue={myOrg?.description}
                {...register("description", {
                  required: "Description is required",
                })}
                id="description"
                label="Description"
                labelPlacement="outside"
                placeholder="Hosting global developer conferences and software hacking marathons."
                required
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl focus:outline-none min-h-25 text-white text-sm"
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}

              {/* button */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-11 px-6 shadow-lg"
                  radius="lg"
                >
                  Save Changes
                </Button>
              </div>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrganizationPage;

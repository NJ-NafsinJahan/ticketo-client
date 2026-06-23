"use client";

import DashboardHeading from "@/components/DashboardHeading";
import React from "react";
import {
  Card,
  Button,
  CardHeader,
  Input,
  Form,
  TextArea,
  Select,
  SelectTrigger,
  SelectValue,
  SelectIndicator,
  SelectPopover,
  ListBox,
  ListBoxItem,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { uploadImage } from "@/utils/uploadImage";
import { FaImage } from "react-icons/fa";
import { useSession } from "@/lib/auth-client";
import { organization } from "better-auth/client";
import { addEvent } from "@/lib/api/events/action";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

const AddEventPage = () => {
  const { data: session } = useSession();

  // ১. রিয়্যাক্ট হুক ফর্ম থেকে setValue এবং trigger নিয়ে আসা হলো
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      banner: "",
      category: "",
      location: "",
      date: "",
      price: "",
      capacity: "",
      description: "",
    },
  });

  const CATEGORIES = [
    "Music",
    "Tech",
    "Sports",
    "Arts",
    "Business",
    "Food",
    "Other",
  ];
  const LOCATIONS = [
    "New York",
    "San Francisco",
    "London",
    "Dhaka",
    "Tokyo",
    "Berlin",
    "Online",
  ];

  const onSubmit = async (data) => {
    console.log("Submitted Data:", data);

    const imageFile = data.banner[0];
    const imageUrl = await uploadImage(imageFile);
    console.log(data?.banner, "data.banner");

    delete data?.banner;
    const updateDate = {
      ...data,
      banner: imageUrl,
      organizationEmail: session?.user?.email,
    };
    // api call
    const result = await addEvent(updateDate);
    console.log(result, " added event");
    if (result.insertedId) {
      toast.success("Event added Successfully");
      // redirect("/events");
      redirect("/dashboard/organizer/manage-events");
    } else {
      toast.error("Your free limit in over");
    }
  };

  return (
    <div>
      <DashboardHeading title="Add Event" description="Add new event" />

      <div className="mt-6 max-w-3xl pb-12">
        <Card
          className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-2xl"
          radius="lg"
        >
          <CardHeader className="flex flex-col gap-1 pb-4 border-b border-white/5 p-6">
            <h3 className="text-xl font-bold text-white">Host a New Event</h3>
            <p className="text-slate-400 text-xs">
              Fill out the detailed event information. Banners and dates are
              required.
            </p>
          </CardHeader>

          <div className="p-6">
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5 w-full"
            >
              {/* Event Title & Banner */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {/* Event Title */}
                <div className="w-full">
                  <Input
                    {...register("title", {
                      required: "Event Title is required",
                    })}
                    label="Event Title"
                    labelPlacement="outside"
                    placeholder="e.g. Rock Fest 2026"
                    className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs mt-1.5">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Upload Banner Image */}
                <div className="w-full">
                  <Input
                    {...register("banner", {
                      required: "Banner image is required",
                    })}
                    type="file"
                    accept="image/*"
                    id="banner"
                    label="Upload Banner Image" // 👈 আলাদা লেবেল বাদ দিয়ে সরাসরি HeroUI লেবেল ব্যবহার করা হলো
                    labelPlacement="outside"
                    className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                    classNames={{
                      // ইনপুটের ভেতরের বোরিং বাটনটিকে ডার্ক পিঙ্ক থিম দেওয়া হলো
                      input:
                        "text-slate-300 file:mr-4 file:py-1 file:px-3 file:rounded-xl file:border file:border-pink-500/20 file:text-xs file:font-semibold file:bg-pink-500/10 file:text-pink-400 hover:file:bg-pink-500/20 file:cursor-pointer cursor-pointer pt-1 h-full",
                      inputWrapper: "h-11 border border-white/10 rounded-xl",
                    }}
                  />
                  {errors.banner && (
                    <p className="text-red-500 text-xs mt-1.5">
                      {errors.banner.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Category & Location Dropdowns (Aria-safe method) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {/* Category Select */}
                <div className="w-full">
                  <label className="text-sm font-medium text-slate-200 block mb-1.5">
                    Category
                  </label>
                  {/* ম্যানুয়ালি ফর্ম রেজিস্টার করা হলো */}
                  <input
                    type="hidden"
                    {...register("category", {
                      required: "Please select a category",
                    })}
                  />

                  <Select
                    aria-label="Category"
                    placeholder="Select Category"
                    className="w-full"
                    onSelectionChange={(keys) => {
                      const value = Array.from(keys)[0];
                      setValue("category", value); // হুক ফর্মের ভ্যালু আপডেট
                      trigger("category"); // ভ্যালিডেশন চেক রান করা
                    }}
                  >
                    <SelectTrigger className="w-full flex items-center justify-between bg-slate-900/50 border border-white/10 rounded-xl px-3 h-11 text-white text-sm">
                      <SelectValue />
                      <SelectIndicator />
                    </SelectTrigger>
                    <SelectPopover className="bg-slate-950 border border-white/10 rounded-xl shadow-2xl p-1 min-w-[200px]">
                      <ListBox className="outline-none">
                        {CATEGORIES.map((cat) => (
                          <ListBoxItem
                            key={cat}
                            id={cat}
                            textValue={cat}
                            className="p-2 text-white hover:bg-pink-500/20 rounded-lg cursor-pointer"
                          >
                            {cat}
                          </ListBoxItem>
                        ))}
                      </ListBox>
                    </SelectPopover>
                  </Select>
                  {errors.category && (
                    <p className="text-red-500 text-xs mt-1.5">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                {/* Location Select */}
                <div className="w-full">
                  <label className="text-sm font-medium text-slate-200 block mb-1.5">
                    Location
                  </label>
                  {/* ম্যানুয়ালি ফর্ম রেজিস্টার করা হলো */}
                  <input
                    type="hidden"
                    {...register("location", {
                      required: "Please select a location",
                    })}
                  />

                  <Select
                    aria-label="Location"
                    placeholder="Select Location"
                    className="w-full"
                    onSelectionChange={(keys) => {
                      const value = Array.from(keys)[0];
                      setValue("location", value); // হুক ফর্মের ভ্যালু আপডেট
                      trigger("location"); // ভ্যালিডেশন চেক রান করা
                    }}
                  >
                    <SelectTrigger className="w-full flex items-center justify-between bg-slate-900/50 border border-white/10 rounded-xl px-3 h-11 text-white text-sm">
                      <SelectValue />
                      <SelectIndicator />
                    </SelectTrigger>
                    <SelectPopover className="bg-slate-950 border border-white/10 rounded-xl shadow-2xl p-1 min-w-[200px]">
                      <ListBox className="outline-none">
                        {LOCATIONS.map((loc) => (
                          <ListBoxItem
                            key={loc}
                            id={loc}
                            textValue={loc}
                            className="p-2 text-white hover:bg-pink-500/20 rounded-lg cursor-pointer"
                          >
                            {loc}
                          </ListBoxItem>
                        ))}
                      </ListBox>
                    </SelectPopover>
                  </Select>
                  {errors.location && (
                    <p className="text-red-500 text-xs mt-1.5">
                      {errors.location.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Date, Price, and Capacity */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <div className="w-full">
                  <Input
                    {...register("date", { required: "Date is required" })}
                    type="date"
                    label="Date"
                    labelPlacement="outside"
                    className="w-full bg-slate-900/50 border-white/10"
                  />
                  {errors.date && (
                    <p className="text-red-500 text-xs mt-1.5">
                      {errors.date.message}
                    </p>
                  )}
                </div>

                <div className="w-full">
                  <Input
                    {...register("price", {
                      required: "Ticket Price is required",
                    })}
                    type="number"
                    min={0}
                    step="any"
                    label="Ticket Price ($)"
                    labelPlacement="outside"
                    placeholder="0.00"
                    className="w-full bg-slate-900/50 border-white/10"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-xs mt-1.5">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div className="w-full">
                  <Input
                    {...register("capacity", {
                      required: "Capacity is required",
                    })}
                    type="number"
                    min={1}
                    label="Available Capacity"
                    labelPlacement="outside"
                    placeholder="100"
                    className="w-full bg-slate-900/50 border-white/10"
                  />
                  {errors.capacity && (
                    <p className="text-red-500 text-xs mt-1.5">
                      {errors.capacity.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="w-full">
                <TextArea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  label="Detailed Description"
                  labelPlacement="outside"
                  placeholder="Outline the detailed schedule, speaker list, and amenities..."
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl min-h-[120px] text-white text-sm"
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-11 px-6 shadow-lg"
                radius="lg"
              >
                Host Event Now
              </Button>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddEventPage;

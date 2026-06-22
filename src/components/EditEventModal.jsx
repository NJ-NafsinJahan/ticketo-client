import { updateEvent } from "@/lib/api/events/action";
import { Button, Form, Input, Label, Modal, TextArea } from "@heroui/react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaImage } from "react-icons/fa";
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
const EditEventModal = ({ isModalOpen, setIsModalOpen, editingEvent }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data?.banner, "data.banner");

    delete data?.banner;
    const updateData = {
      ...data,
    };
    if (data?.banner) {
      const imageFile = data.banner[0];
      const imageUrl = await uploadImage(imageFile);
      updateData.banner = imageUrl;
    }

    const result = await updateEvent(updateData, editingEvent?._id);
    console.log(result, "edit modal update");

    if (result.modifiedCount) {
      toast.success("Event Updated successfully...");
      redirect("/events");
    }
  };

  return (
    <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="dark text-white bg-slate-950 border border-white/10 p-6 rounded-2xl w-full max-w-lg mx-auto">
            <div className="p-6">
              <Form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 w-full"
              >
                {/* Title + Banner */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div className="w-full">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      defaultValue={editingEvent?.title}
                      label="Event Title"
                      className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3"
                      labelPlacement="outside"
                      placeholder="e.g. Rock Fest 2026"
                      {...register("title", {
                        required: "Event title is required",
                      })}
                    />
                    {errors.title && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full">
                    <Label htmlFor="image">Image</Label>
                    <Input
                      {...register("banner")}
                      type="file"
                      accept="image/*"
                      id="logo"
                      placeholder="https://example.com/avatar.jpg"
                      labelPlacement="outside"
                      startContent={
                        <FaImage className="text-slate-400 text-sm" />
                      }
                      className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                    />
                    {errors.banner && (
                      <p className="text-red-500">{errors.banner.message}</p>
                    )}
                    {errors.banner && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.banner.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Category + Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div className="w-full">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      {...register("category", {
                        required: "Category is required",
                      })}
                      className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>

                    <input
                      defaultValue={editingEvent?.category}
                      type="hidden"
                      {...register("category", {
                        required: "Category is required",
                      })}
                    />

                    {errors.category && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.category.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full">
                    <Label htmlFor="location">Location</Label>
                    <select
                      defaultValue={editingEvent?.location}
                      id="location"
                      {...register("location", {
                        required: "Location is required",
                      })}
                      className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3"
                    >
                      {LOCATIONS.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>

                    <input
                      type="hidden"
                      {...register("location", {
                        required: "Location is required",
                      })}
                    />

                    {errors.location && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.location.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Date + Price + Capacity */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      defaultValue={editingEvent?.date}
                      className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3"
                      type="date"
                      label="Date"
                      labelPlacement="outside"
                      {...register("date", {
                        required: "Date is required",
                      })}
                    />

                    {errors.date && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.date.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      defaultValue={editingEvent?.price}
                      className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3"
                      type="number"
                      label="Ticket Price ($)"
                      labelPlacement="outside"
                      placeholder="0.00"
                      {...register("price", {
                        required: "Price is required",
                        valueAsNumber: true,
                        min: {
                          value: 0,
                          message: "Price cannot be negative",
                        },
                      })}
                    />

                    {errors.price && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.price.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input
                      defaultValue={editingEvent?.capacity}
                      type="number"
                      label="Available Capacity"
                      labelPlacement="outside"
                      placeholder="100"
                      {...register("capacity", {
                        required: "Capacity is required",
                        valueAsNumber: true,
                        min: {
                          value: 1,
                          message: "Capacity must be at least 1",
                        },
                      })}
                    />

                    {errors.capacity && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.capacity.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="w-full">
                  <Label htmlFor="description">Description</Label>
                  <TextArea
                    defaultValue={editingEvent?.description}
                    className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3"
                    label="Detailed Description"
                    labelPlacement="outside"
                    placeholder="Outline the detailed schedule, speaker list, and amenities..."
                    {...register("description", {
                      required: "Description is required",
                      minLength: {
                        value: 20,
                        message:
                          "Description must be at least 20 characters long",
                      },
                    })}
                  />

                  {errors.description && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-11 px-6 shadow-lg shadow-pink-500/10"
                  radius="lg"
                >
                  Host Event Now
                </Button>
              </Form>
            </div>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default EditEventModal;

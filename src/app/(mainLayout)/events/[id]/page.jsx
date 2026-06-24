import Link from "next/link";
import { Card, Button } from "@heroui/react";
import Image from "next/image";
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowLeft } from "react-icons/fa";
import { baseURL } from "@/lib/api/baseUrl";
import BookingWidget from "@/components/BookingWidget";

const fetchEvent = async (id) => {
  const res = await fetch(`${baseURL}/api/single-events/${id}`);
  const data = await res.json();
  return data;
};

export default async function EventDetailsPage({ params }) {
  const { id } = await params;
  const event = await fetchEvent(id);

  return (
    <div className="min-h-screen py-16 px-6 max-w-6xl mx-auto w-full space-y-12">
      {/* Back Button */}
      <Link href="/events">
        <Button
          variant="light"
          className="text-slate-400 hover:text-white"
          startContent={<FaArrowLeft />}
        >
          Back to Browse
        </Button>
      </Link>

      {/* Banner */}
      <div className="relative h-[300px] md:h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl border border-white/5">
        <Image
          src={event?.banner}
          alt="Hello World"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-1" />

        <span className="absolute top-6 left-6 bg-pink-500 text-white font-extrabold text-xs uppercase tracking-wider px-4 py-2 rounded-full border border-pink-400/20 shadow-lg z-10">
          {event?.category}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Details & Description */}
        <div className="lg:col-span-2 space-y-10">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              {event?.title}
            </h1>

            <div className="flex flex-wrap gap-6 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-pink-500" />
                <span>{event?.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-pink-500" />
                <span>{event?.location}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Event Description</h2>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
              {event.description ||
                "No description provided for this event. Reach out to the organization for more details."}
            </p>
          </div>

          {/* Organizer Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              Organized by-{" "}
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/5 text-pink-400 text-xs font-semibold uppercase tracking-wider">
                {event?.organizationEmail}
              </span>{" "}
            </h2>
          </div>
        </div>

        {/* Right Column: Ticket Booking Widget */}
        <div className="space-y-6">
          {/* <BookingWidget /> */}
          <BookingWidget
            ticketPrice={event?.price}
            availableSeats={event?.capacity}
            eventId={event?._id}
            eventTitle={event?.title}
          />
        </div>
      </div>
    </div>
  );
}

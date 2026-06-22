"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
  TableContent,
  Button,
} from "@heroui/react";
import DashboardHeading from "@/components/DashboardHeading";
import { useSession } from "@/lib/auth-client";
import { myEvents } from "@/lib/api/events/data";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditEventModal from "@/components/EditEventModal";
import DeleteEventModal from "@/components/DeleteEventModal";
// import DeleteEventModal from "@/components/DeleteEventModal";

const manageEvent = () => {
  const { data: session } = useSession();
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(false);

  const [editingEvent, setEditingEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletedId, setDeletedId] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    const loadEvent = async () => {
      if (!session?.user?.email) return;
      setLoadingEvents(true);

      //   const eventData = await myEvents(session?.user?.email);
      //   setEvents(eventData);
      //   setLoadingEvents(false);
      try {
        const eventData = await myEvents(session.user.email);

        if (Array.isArray(eventData)) {
          setEvents(eventData);
        } else if (eventData && typeof eventData === "object") {
          setEvents([eventData]);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error("Error loading events:", error);
        setEvents([]);
      } finally {
        setLoadingEvents(false);
      }
    };
    loadEvent();
  }, [session]);
  console.log(events, "events");

  return (
    <div className="mt-6">
      <DashboardHeading
        title="Manage Event"
        description="Manage your all events"
      />
      <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl p-6 rounded-2xl">
        <div className="p-0 overflow-x-auto">
          {loadingEvents ? (
            <div className="py-20 flex items-center justify-center">
              {" "}
              Event data loading....
            </div>
          ) : (
            <Table aria-label="Manage Events Table">
              <TableContent>
                {/* table Header */}
                <TableHeader className="bg-slate-950/40 border-b border-white/5 rounded-t-xl">
                  <TableColumn
                    className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20"
                    isRowHeader
                  >
                    EVENT
                  </TableColumn>
                  <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                    CATEGORY
                  </TableColumn>
                  <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                    DATE
                  </TableColumn>
                  <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                    TICKET PRICE
                  </TableColumn>
                  <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                    AVAILABLE SEATS
                  </TableColumn>
                  <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                    STATUS
                  </TableColumn>

                  <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                    ACTION
                  </TableColumn>
                </TableHeader>

                {/* table Body */}
                <TableBody
                  emptyContent={
                    <p className="text-slate-500 py-10 text-center font-medium">
                      You haven not added any events yet.
                    </p>
                  }
                >
                  {events?.map((ev) => (
                    <TableRow
                      key={ev._id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors duration-150 last:border-b-0"
                    >
                      <TableCell className="py-4 px-6 align-middle font-bold text-white">
                        <span className="line-clamp-1 truncate max-w-[150px]">
                          {ev.title}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 px-6 align-middle text-slate-300 font-medium">
                        {ev.category}
                      </TableCell>
                      <TableCell className="py-4 px-6 align-middle text-slate-300 font-medium">
                        {ev.date}
                      </TableCell>

                      <TableCell className="py-4 px-6 align-middle font-semibold text-green-400">
                        ${Number(ev.price || 0).toFixed(2)}
                      </TableCell>

                      {/* <TableCell className="py-4 px-6 align-middle font-semibold text-green-400">
                        ${Number(ev.price || 0).toFixed(2)}
                      </TableCell> */}

                      {/* ***** */}

                      <TableCell className="py-4 px-6 align-middle text-slate-300 font-medium">
                        {ev.capacity} seats
                      </TableCell>
                      <TableCell className="py-4 px-6 align-middle">
                        <Chip
                          size="sm"
                          className={`font-bold uppercase text-[10px] tracking-wider border px-2.5 py-1 ${
                            ev.status === "approved"
                              ? "bg-green-500/10 text-green-400 border-green-500/20"
                              : ev.status === "rejected"
                                ? "bg-red-500/10 text-red-400 border-red-500/20"
                                : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                          }`}
                        >
                          {ev.status || "pending"}
                        </Chip>
                      </TableCell>
                      <TableCell className="py-4 px-6 align-middle">
                        <div className="flex gap-2">
                          <div className="group relative flex items-center justify-center w-fit">
                            <Button
                              isIconOnly
                              size="sm"
                              radius="full"
                              className="h-8 w-8 min-w-0 p-0 border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 hover:scale-[1.03] transition-all duration-200"
                              onPress={() => {
                                setEditingEvent({ ...ev });
                                setIsModalOpen(true);
                              }}
                            >
                              <FaEdit size={12} />
                            </Button>
                            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-0 transition-all duration-150 rounded-lg bg-slate-950 border border-white/10 px-2 py-1 text-[10px] text-white group-hover:scale-100 font-semibold z-30 whitespace-nowrap shadow-xl">
                              Edit Event
                            </span>
                          </div>
                          <div className="group relative flex items-center justify-center w-fit">
                            <Button
                              isIconOnly
                              size="sm"
                              radius="full"
                              className="h-8 w-8 min-w-0 p-0 border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:scale-[1.03] transition-all duration-200"
                              onPress={() => {
                                setDeletedId(ev._id);
                                setIsDeleteOpen(true);
                              }}
                            >
                              <FaTrash size={12} />
                            </Button>
                            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-0 transition-all duration-150 rounded-lg bg-slate-950 border border-white/10 px-2 py-1 text-[10px] text-white group-hover:scale-100 font-semibold z-30 whitespace-nowrap shadow-xl">
                              Delete Event
                            </span>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

                {/* ********** */}
              </TableContent>
            </Table>
          )}
        </div>
      </Card>
      {/* edit modal */}
      <EditEventModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editingEvent={editingEvent}
      />

      {/* delete modal */}
      <DeleteEventModal
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
        id={deletedId}
      />
    </div>
  );
};

export default manageEvent;

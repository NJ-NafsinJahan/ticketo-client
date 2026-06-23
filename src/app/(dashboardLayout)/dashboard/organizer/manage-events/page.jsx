import DashboardHeading from "@/components/DashboardHeading";
import ManageEventClient from "./ManageEventClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { myEvents } from "@/lib/api/events/data";
import { Suspense } from "react";
import { Spinner } from "@heroui/react";
// import { useSession } from "@/lib/auth-client";
// import { myEvents } from "@/lib/api/events/data";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import EditEventModal from "@/components/EditEventModal";
// import DeleteEventModal from "@/components/DeleteEventModal";
// import DeleteEventModal from "@/components/DeleteEventModal";

const manageEvent = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const events = await myEvents(session?.user?.email);

  //   const { data: session } = useSession();
  //   const [events, setEvents] = useState([]);
  //   const [loadingEvents, setLoadingEvents] = useState(false);

  //   const [editingEvent, setEditingEvent] = useState(null);
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  //   const [deletedId, setDeletedId] = useState(null);
  //   const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  //   useEffect(() => {
  //     const loadEvent = async () => {
  //       if (!session?.user?.email) return;
  //       setLoadingEvents(true);
  // ;
  //       try {
  //         const eventData = await myEvents(session.user.email);

  //         if (Array.isArray(eventData)) {
  //           setEvents(eventData);
  //         } else if (eventData && typeof eventData === "object") {
  //           setEvents([eventData]);
  //         } else {
  //           setEvents([]);
  //         }
  //       } catch (error) {
  //         console.error("Error loading events:", error);
  //         setEvents([]);
  //       } finally {
  //         setLoadingEvents(false);
  //       }
  //     };
  //     loadEvent();
  //   }, [session]);
  //   console.log(events, "events");

  return (
    <div className="mt-6">
      {/* heading */}
      <DashboardHeading
        title="Manage Event"
        description="Manage your all events"
      />

      {/* Body */}

      <Suspense fallback={<Spinner></Spinner>}>
        <ManageEventClient events={events}></ManageEventClient>
      </Suspense>
    </div>
  );
};

export default manageEvent;

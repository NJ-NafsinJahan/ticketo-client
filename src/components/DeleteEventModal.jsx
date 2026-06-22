import { deleteEvent } from "@/lib/api/events/actions";
import { Button, Modal } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DeleteEventModal = ({ isDeleteOpen, setIsDeleteOpen, id }) => {
  const router = useRouter();
  const handleDeleteEvent = async () => {
    const res = await deleteEvent(id);
    if (res?.deletedCount > 0) {
      router.refresh();
      toast.success("Event deleted successfully");
      setIsDeleteOpen(false);
    }
  };
  return (
    <Modal isOpen={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="dark text-white bg-slate-950 border border-white/10 p-6 rounded-2xl w-full max-w-md mx-auto">
            <Modal.Header className="text-white font-bold text-lg">
              Delete Hosted Event
            </Modal.Header>
            <Modal.Body className="py-2">
              <p className="text-slate-300 text-sm">
                Are you sure you want to delete this event? This will
                permanently remove the listing and cannot be undone.
              </p>
            </Modal.Body>
            <Modal.Footer className="flex justify-end gap-3 pt-4">
              <Button
                variant="light"
                className="text-slate-400"
                onPress={() => setIsDeleteOpen(false)}
              >
                Cancel
              </Button>
              <Button
                color="danger"
                className="font-bold"
                onPress={handleDeleteEvent}
              >
                Delete Event
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default DeleteEventModal;

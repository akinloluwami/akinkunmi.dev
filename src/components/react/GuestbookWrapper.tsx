import { ConvexClientProvider } from "./ConvexProvider";
import Guestbook from "./Guestbook";

export default function GuestbookWrapper() {
  return (
    <ConvexClientProvider>
      <Guestbook />
    </ConvexClientProvider>
  );
}

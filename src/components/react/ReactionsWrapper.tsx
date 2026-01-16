import { ConvexClientProvider } from "./ConvexProvider";
import Reactions from "./Reactions";

interface ReactionsWrapperProps {
  slug: string;
}

export default function ReactionsWrapper({ slug }: ReactionsWrapperProps) {
  return (
    <ConvexClientProvider>
      <Reactions slug={slug} />
    </ConvexClientProvider>
  );
}

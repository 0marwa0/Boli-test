import Create from "../../../features/Blogs/Create";
import ReduxProvider from "../../../store/Provider";

export default function Page() {
  return (
    <ReduxProvider>
      <Create />
    </ReduxProvider>
  );
}

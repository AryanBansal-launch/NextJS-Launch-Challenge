// page.js
import { setLivePreviewQueryParams } from "../utils";
import LivePreviewInitComponent from "./components/LivePreviewInitComponent";
import { getContentRes } from "../utils";
import { useRouter } from "next/router";

export default async function Page() {
  const router = useRouter();
  const { live_preview } = router.query;
  if (live_preview !== undefined) {
    if (typeof live_preview === 'string') {
      setLivePreviewQueryParams({ live_preview });
    }
  }
  const ContentData = await getContentRes();
  console.log("Content Data:", ContentData);
  return (
    <>
      <h1>Content Type Title: {" " + ContentData?.title}</h1>
      <LivePreviewInitComponent />
    </>
  );
}

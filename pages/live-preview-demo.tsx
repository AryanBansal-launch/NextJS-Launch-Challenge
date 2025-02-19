 // page.js
 import { headers } from "next/headers";
import { setLivePreviewQueryParams } from "../utils";
 import LivePreviewInitComponent from "./components/LivePreviewInitComponent"
import { GetServerSideProps } from 'next';
import { getContentRes } from "../utils";
import { get } from "http";
import { useRouter } from "next/router";

export default async function Page() {
  const router = useRouter();
  const { live_preview } = router.query;
   setLivePreviewQueryParams(live_preview as any);
   const ContentData = await getContentRes();
   console.log("Content Data:", ContentData);
   return (
     <>
       <h1>
         Content Type Title: {" " + ContentData?.title }
       </h1>
       <LivePreviewInitComponent />
      </>
   );
 }
 
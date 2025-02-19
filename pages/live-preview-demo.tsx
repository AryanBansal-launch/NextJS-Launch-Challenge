// // page.js
// import { setLivePreviewQueryParams } from "../utils";
// import LivePreviewInitComponent from "./components/LivePreviewInitComponent";
// import { getContentRes } from "../utils";
// import { useRouter } from "next/router";

// export default async function Page() {
//   const router = useRouter();
//   const { live_preview } = router.query;
//   if (live_preview !== undefined) {
//     if (typeof live_preview === 'string') {
//       setLivePreviewQueryParams({ live_preview });
//     }
//   }
//   const ContentData = await getContentRes();
//   console.log("Content Data:", ContentData);
//   return (
//     <>
//       <h1>Content Type Title: {" " + ContentData?.title}</h1>
//       <LivePreviewInitComponent />
//     </>
//   );
// }
import { useEffect } from "react";
import { useRouter } from "next/router";
import { setLivePreviewQueryParams, getContentRes } from "../utils";
import LivePreviewInitComponent from "./components/LivePreviewInitComponent";

interface ContentData {
  title: string;
}

export default function Page({ contentData }: { contentData: ContentData }) {
  const router = useRouter();
  const { live_preview } = router.query;

  useEffect(() => {
    if (live_preview !== undefined) {
      if (typeof live_preview === "string") {
        setLivePreviewQueryParams({ live_preview });
      }
    }
  }, [live_preview]);

  return (
    <>
      <h1>Content Type Title: {" " + contentData?.title}</h1>
      <LivePreviewInitComponent />
    </>
  );
}

// Fetch data on the server
export async function getServerSideProps() {
  const contentData = await getContentRes();
  // console.log("Content Data:", contentData);
  return {
    props: { contentData },
  };
}

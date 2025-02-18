import { setLivePreviewQueryParams } from "../../utils";
import LivePreviewInitComponent from "../components/LivePreviewInitComponent";

export default async function Page({ searchParams }: { searchParams: Record<string, string> }) {
  setLivePreviewQueryParams(searchParams); 

  const entryData = await fetchEntryData(searchParams);

  return (
    <div>
      <h1>Hello, World! {" " + (entryData?.title || "Loading...")}</h1>
      <LivePreviewInitComponent />
    </div>
  );
}

// 🔹 Function to fetch Contentstack Live Preview Entry
async function fetchEntryData(queryParams: Record<string, string>) {
  const { entry_uid, content_type_uid, locale } = queryParams;

  if (!entry_uid || !content_type_uid) {
    console.warn("Missing Live Preview parameters");
    return null; // Handle missing parameters gracefully
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/preview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        entry_uid,
        content_type_uid,
        locale: locale || "en-us",
      }),
    });

    if (!res.ok) throw new Error("Failed to fetch preview data");
    return await res.json();
  } catch (error) {
    console.error("Error fetching preview data:", error);
    return null;
  }
}

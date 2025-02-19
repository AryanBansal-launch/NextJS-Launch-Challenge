// utils.ts
import Contentstack, { LivePreviewQuery } from "contentstack";

const Stack = Contentstack.Stack({
  api_key: process.env.API_KEY || "",
  delivery_token: process.env.DELIVERY_TOKEN || "",
  environment: process.env.ENVIRONMENT || "development",
  live_preview: {
    preview_token: process.env.PREVIEW_TOKEN || "",
    enable: true,
    host: "rest-preview.contentstack.com",
  },
});

export const setLivePreviewQueryParams = (queryParams: Partial<LivePreviewQuery>) => {
    if(queryParams?.live_preview) {
        if (queryParams.live_preview) {
            Stack.livePreviewQuery({
                ...queryParams,
                live_preview: queryParams.live_preview || ""
            } as LivePreviewQuery);
        }
      }
};

export const getContentRes = async (): Promise<any> => {
    const response = await fetch(
      `https://cdn.contentstack.io/v3/content_types/character`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "api_key": process.env.API_KEY as string,
          "access_token": process.env.DELIVERY_TOKEN as string,
        }, 
      }
    );
    console.log("Response from backend:", response);
    if (!response.ok) {
      throw new Error(`Failed to fetch Content data: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data.content_type;
  };
  
export default Stack;


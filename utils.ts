// utils.ts
import Contentstack, { LivePreviewQuery } from "contentstack";

const Stack = Contentstack.Stack({
  api_key: process.env.API_KEY || "",
  delivery_token: process.env.DELIVERY_TOKEN || "",
  environment: process.env.ENVIRONMENT || "development",
  live_preview: {
    preview_token: process.env.PREVIEW_TOKEN || "",
    enable: true,
    host: "api.contentstack.io",
  },
});

export const setLivePreviewQueryParams = (queryParams: Partial<LivePreviewQuery>) => {
  if (queryParams?.live_preview === "true") {
    Stack.livePreviewQuery({
      live_preview: queryParams.live_preview,
      content_type_uid: queryParams.content_type_uid || "",
      preview_timestamp: queryParams.preview_timestamp || "",
      release_id: queryParams.release_id || "",
    });
  }
};

export default Stack;

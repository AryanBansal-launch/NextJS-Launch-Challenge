import { setLivePreviewQueryParams, getContentRes } from "../utils";
import LivePreviewInitComponent from "./components/LivePreviewInitComponent";

interface Pageprop{
    title:string;
}
export default function Page(entryData: Pageprop) {
  return (
    <>
    {/* {console.log("entryData in the compoent:",entryData)} */}
      <h1>Hello, World! {" " + entryData.title}</h1>
      <LivePreviewInitComponent />
    </>
  );
}

import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  setLivePreviewQueryParams(query);
  const entryData = await getContentRes();
//   console.log("entryData:",entryData);
  return { props: entryData  };
}

import type { NextApiRequest, NextApiResponse } from "next";

type RedirectRule = {
  source: string;
  destination: string;
  permanent: boolean;
};

const redirects: RedirectRule[] = [
  {
    source: "/resources/case-study/axelos-reimagines-content-marketing-and-portal-experience-with-contentstack",
    destination: "/resources/case-study/global-certification-provider-transforms-content-with-contentstack",
    permanent: true,
  },
  {
    source: "/academy-old",
    destination: "/academy",
    permanent: false,
  },
  {
    source: "/resources/case-study/ritchie-bros-enables-marketers-and-frees-up-developers-with-api-first-cms",
    destination: "/resources/case-study/equipment-auction-leader-enables-marketers-and-frees-up-developers-with-api-first-cms",
    permanent: true,
  },
  {
    source: "/resources/case-study/taxfix-streamlines-content-development-and-improves-customer-experience-with-contentstack",
    destination: "/resources/case-study/digital-tax-platform-streamlines-content-development-and-improves-customer-experience-with-contentstack",
    permanent: true,
  },
  {
    source: "/explorerindia",
    destination: "/explorer",
    permanent: false,
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; redirects?: RedirectRule[] }>
) {

  res.status(200).json({
    redirects,
  });
}

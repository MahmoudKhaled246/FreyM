import { SiteLayout, siteMetadata } from "@/components/site-layout";

export const metadata = siteMetadata;

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteLayout language="en">{children}</SiteLayout>;
}

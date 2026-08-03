import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { AnimatePresence, motion } from "motion/react";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/structuredData";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="display-xl text-foreground">404</h1>
        <p className="mt-4 label-mono text-muted-foreground">
          This page doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8">
          <Link to="/" className="bg-primary px-6 py-4 label-mono text-primary-foreground">
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="display-md">This page didn&apos;t load</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Something went wrong on our end. Try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="bg-primary px-5 py-3 label-mono text-primary-foreground"
          >
            Try again
          </button>
          <a href="/" className="border border-border-strong px-5 py-3 label-mono">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Deez Prints — Premium Streetwear & Custom Printing in Pakistan" },
      {
        name: "description",
        content:
          "Oversized drop-shoulder tees, acid wash, hoodies, jerseys and wall art. Upload your own artwork for custom printing. Delivered across Pakistan in 3–5 days.",
      },
      { name: "author", content: "Deez Prints" },
      {
        property: "og:title",
        content: "Deez Prints — Premium Streetwear & Custom Printing in Pakistan",
      },
      {
        property: "og:description",
        content:
          "Oversized drop-shoulder tees, acid wash, hoodies, jerseys and wall art. Upload your own artwork for custom printing. Delivered across Pakistan in 3–5 days.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Deez Prints — Premium Streetwear & Custom Printing in Pakistan",
      },
      {
        name: "twitter:description",
        content:
          "Oversized drop-shoulder tees, acid wash, hoodies, jerseys and wall art. Upload your own artwork for custom printing. Delivered across Pakistan in 3–5 days.",
      },
      {
        property: "og:image",
        content: "https://deezus.vercel.app/assets/hero/hero-typography.svg",
      },
      {
        name: "twitter:image",
        content: "https://deezus.vercel.app/assets/hero/hero-typography.svg",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://res.cloudinary.com" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:label-mono"
        >
          Skip to content
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isAdmin = location.pathname.startsWith("/admin");
  const prevPath = useRef(location.pathname);

  // Instant scroll-to-top on every route change (no delay, no restore)
  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      window.scrollTo(0, 0);
      prevPath.current = location.pathname;
    }
  }, [location.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        {!isAdmin && <JsonLd data={organizationSchema()} />}
        {!isAdmin && <JsonLd data={websiteSchema()} />}
        {!isHome && !isAdmin && <Header />}
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <main id="main-content" className={isAdmin ? "" : "min-h-screen overflow-x-hidden"}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </main>
        {!isAdmin && <Footer />}
        {!isAdmin && <CartDrawer />}
      </CartProvider>
    </QueryClientProvider>
  );
}

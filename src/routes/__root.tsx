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
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
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
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="display-md">This page didn&apos;t load</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Something went wrong on our end. Try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
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
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e6391cad-0f83-40a2-9bf1-e742443e4c04/id-preview-72f7efc0--9438aa97-af7d-4866-8fb2-d6bd3f283278.lovable.app-1785076347424.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e6391cad-0f83-40a2-9bf1-e742443e4c04/id-preview-72f7efc0--9438aa97-af7d-4866-8fb2-d6bd3f283278.lovable.app-1785076347424.png",
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

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        {!isHome && <Header />}
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <main id="main-content" className="min-h-screen overflow-x-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
        <CartDrawer />
      </CartProvider>
    </QueryClientProvider>
  );
}
